import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import moment from "moment";
import {deletePushNotification} from "./pushNotifications";

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

export const DeleteMedicationsForUser = async (userID, medicationID) => {
    const docRef = doc(db, 'users', userID, 'medications', medicationID);
    await deleteDoc(docRef);
};

/// Notes
export const retrieveNotesForUser = async (userID) => {
    const collectionRef = collection(db, 'users', userID, 'notes');
    const allNotesSnapshot = await getDocs(collectionRef);
    const data = allNotesSnapshot.docs.map((noteDoc) => {
        const dataItem = noteDoc.data();
        dataItem.id = noteDoc.id;
        return dataItem;
    });
    return data;
};

export const AddNoteForUser = async (userID, dataToAdd) => {
    const newDocRef = collection(db, 'users', userID, 'notes');
    const data = await addDoc(newDocRef, dataToAdd);
    return data.id;
};

export const UpdateNoteForUser = async (userID, docID, updateData) => {
    const docRef = doc(db, 'users', userID, 'notes', docID);
    await updateDoc(docRef, updateData);
};

export const DeleteNoteForUser = async (userID, docID) => {
    const docRef = doc(db, 'users', userID, 'notes', docID);
    await deleteDoc(docRef);
};

//Reminders

export const UpdateMedicationReminderForUser = async (userID, medicationID, reminderID, updateData) => {
    const docRef = doc(db, 'users', userID, 'medications', medicationID, 'reminders', reminderID);
    await updateDoc(docRef, updateData);
};

export const deleteOneReminder = async (userID, medicationID, reminderID, notificationID) => {
    const reminderDocRef = doc(db, 'users', auth.currentUser.uid, 'medications', medicationID.toString(), 'reminders', reminderID);
    await deletePushNotification(notificationID);
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
            await deletePushNotification(reminderData.notificationId);
            await deleteDoc(doc.ref);
        }
    }
}


