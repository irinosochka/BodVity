import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc,} from 'firebase/firestore';
import {db} from '../../firebase';


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

export const AddPillForUser = async (userID, dataToAdd) => {
    const newDocRef = collection(db, 'users', userID, 'pills');
    const data = await addDoc(newDocRef, dataToAdd);
    return data.id;
};

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
