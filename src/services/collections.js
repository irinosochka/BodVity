import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import {db} from '../../firebase';

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

export const UpdateMedicationReminderForUser = async (userID, medicationID, reminderID, updateData) => {
    const docRef = doc(db, 'users', userID, 'medications', medicationID, 'reminders', reminderID);
    await updateDoc(docRef, updateData);
};

export const DeletePillForUser = async (userID, docID) => {
    const docRef = doc(db, 'users', userID, 'pills', docID);
    await deleteDoc(docRef);
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
