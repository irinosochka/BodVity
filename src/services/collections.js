import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs, orderBy, query, serverTimestamp, Timestamp,
    updateDoc,
} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import moment from "moment";
import {
    deletePushNotification,
    schedulePushNotificationAppointment
} from "./pushNotifications";

class Medication {
    constructor (title, pillsInStock, createdAt, startDate, endDate, updatedAt) {
        this.title = title;
        this.pillsInStock = pillsInStock;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updatedAt = updatedAt;
    }
}

const medConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Medication(data.title, data.pillsInStock, data.createdAt, data.startDate, data.endDate, data.updatedAt);
    },
    toFirestore: (medication) => {
        return {
            title: medication.title,
            pillsInStock : medication.pillsInStock,
            createdAt: medication.createdAt,
            startDate: medication.startDate,
            endDate: medication.endDate,
            updatedAt: medication.updatedAt
        };
    },
};

/// Medications

export const retrieveMedicationsForUser = async (userID) => {
    const collectionRef = collection(db, 'users', userID, 'medications');
    const allMedicationsSnapshot = await getDocs(collectionRef);
    const data = allMedicationsSnapshot.docs.map((medicationDoc) => {
        const dataItem = medicationDoc.data();
        dataItem.id = medicationDoc.id;
        return dataItem;
    });
    return data;
};

export const getMedicationByID = async (userID, medicationID) => {
    const collectionRef = doc(db, 'users', userID, 'medications', medicationID).withConverter(medConverter);
    const docSnap = await getDoc(collectionRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return console.log("No such document!");
    }
}

export const UpdateMedicationForUser = async (userID, medicationID, updateData) => {
    const docRef = doc(db, 'users', userID, 'medications', medicationID);
    await updateDoc(docRef, updateData);
};


export const DeleteMedicationForUser = async (userID, medicationID) => {
    const remindersRef = collection(db, 'users', userID, 'medications', medicationID, 'reminders');
    const remindersSnapshot = await getDocs(remindersRef);

    remindersSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });

    const docRef = doc(db, 'users', userID, 'medications', medicationID);
    await deleteDoc(docRef);
};



//Reminders

export const UpdateMedicationReminderForUser = async (userID, medicationID, reminderID, updateData) => {
    const docRef = doc(db, 'users', userID, 'medications', medicationID, 'reminders', reminderID);
    await updateDoc(docRef, updateData);
};

export const deleteOneReminder = async (userID, medicationID, reminderID, notificationID) => {
    const reminderDocRef = doc(db, 'users', auth.currentUser.uid, 'medications', medicationID.toString(), 'reminders', reminderID);
    if(notificationID !== null){
        await deletePushNotification(notificationID);
    }
    await deleteDoc(reminderDocRef);
}

export const deleteReminders = async (userID, medicationID, date) => {
    const seconds = moment().unix();
    const nanoseconds = moment().millisecond() * 1000000;
    const now = { seconds, nanoseconds };

    const remindersRef = collection(db, 'users', userID, 'medications', medicationID, 'reminders');
    const querySnapshot = await getDocs(remindersRef);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
        const doc = querySnapshot.docs[i];
        const reminderData = doc.data();
        if (reminderData.createdAt.seconds === date.seconds && reminderData.timestamp.seconds > now.seconds) {
            if(reminderData.notificationId !== null){
                await deletePushNotification(reminderData.notificationId);
            }
            await deleteDoc(doc.ref);
        }
    }
}

export const getReminders = async (user) => {
    const medications = [];
    const medicationsRef = collection(db, 'users', user.uid, 'medications');
    const medicationsDocs = await getDocs(medicationsRef);

    await Promise.all(medicationsDocs.docs.map(async (medication) => {
        const remindersRef = query(collection(db, 'users', user.uid, 'medications', medication.id, 'reminders'), orderBy('timestamp'));
        const remindersDocs = await getDocs(remindersRef);

        const medicationData = {...medication.data(), id: medication.id, reminders: remindersDocs.docs.map(reminder => ({...reminder.data(), id: reminder.id, timestamp: reminder.data().timestamp}))};
        medications.push(medicationData);
    }));

    return medications;
};

export const getTakenMedicationIdsWithReminders = async (reminders) => {
    const medicationsWithOneTimePlans = reminders.reduce((accumulator, reminder) => {
        if (reminder.isConfirmed) {
            if (accumulator[reminder.medicationId]) {
                accumulator[reminder.medicationId].count += 1;
            } else {
                accumulator[reminder.medicationId] = {
                    count: 1,
                    reminders: [],
                };
            }
            accumulator[reminder.medicationId].reminders.push(reminder);
        }
        return accumulator;
    }, {});

    const sortedMedicationIds = Object.keys(medicationsWithOneTimePlans).sort(
        (a, b) => {
            return (
                medicationsWithOneTimePlans[b].count -
                medicationsWithOneTimePlans[a].count
            );
        }
    );

    return sortedMedicationIds.map((medicationId) => {
        return {
            id: medicationId,
            count: medicationsWithOneTimePlans[medicationId].count,
            reminders: medicationsWithOneTimePlans[medicationId].reminders,
        };
    });
};

export const getMedicationIdsWithMostOneTimePlans = async (reminders) => {
    const medicationsWithOneTimePlans = reminders.reduce((accumulator, reminder) => {
        if (reminder.plan === 'one-time') {
            if (accumulator[reminder.medicationId]) {
                accumulator[reminder.medicationId].count += 1;
            } else {
                accumulator[reminder.medicationId] = {
                    count: 1,
                    reminders: [],
                };
            }
        }
        return accumulator;
    }, {});

    reminders.forEach((reminder) => {
        if (medicationsWithOneTimePlans[reminder.medicationId]) {
            if (reminder.plan === 'one-time') {
                medicationsWithOneTimePlans[reminder.medicationId].reminders.push(reminder);
            }
        }
    });

    const sortedMedicationIds = Object.keys(medicationsWithOneTimePlans).sort(
        (a, b) => {
            return (
                medicationsWithOneTimePlans[b].count -
                medicationsWithOneTimePlans[a].count
            );
        }
    );

    return sortedMedicationIds.map((medicationId) => {
        return {
            id: medicationId,
            count: medicationsWithOneTimePlans[medicationId].count,
            reminders: medicationsWithOneTimePlans[medicationId].reminders,
        };
    });
};

//appointments

export const createAppointment = async (userID, title, note, dateAppointment, dateNotification, textAppointment1, textAppointment2) => {
    const userMedicationsRef = collection(db, 'users', userID, 'appointments')
    let notificationId = null;
    const scheduledDate = new Date(dateNotification)
    scheduledDate.setSeconds(0)
    if(scheduledDate > new Date()){
        notificationId = await schedulePushNotificationAppointment(dateNotification, title, textAppointment1, textAppointment2)
    }
    const medicationDocument = {
        createdAt: serverTimestamp(),
        title: title,
        note: note,
        appointmentDate: Timestamp.fromDate(dateAppointment),
        notificationDate: Timestamp.fromDate(dateNotification),
        notificationId: notificationId,
        isConfirmed: false,
    }
    return await addDoc(userMedicationsRef, medicationDocument);
}

export const retrieveAppointmentsForUser = async (user) => {
    const collectionRef = collection(db, 'users', user.uid, 'appointments');
    const allAppointmentsSnapshot = await getDocs(collectionRef);
    const data = allAppointmentsSnapshot.docs.map((appointmentDoc) => {
        const dataItem = appointmentDoc.data();
        dataItem.id = appointmentDoc.id;
        return dataItem;
    });
    return data;
};

export const UpdateAppointmentForUser = async (userID, appointmentID, updateData) => {
    const docRef = doc(db, 'users', userID, 'appointments', appointmentID);
    await updateDoc(docRef, updateData);
};

export const DeleteAppointmentForUser = async (userID, appointmentID) => {
    const docRef = doc(db, 'users', userID, 'appointments', appointmentID);
    await deleteDoc(docRef);
};
