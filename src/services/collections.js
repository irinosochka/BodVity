import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc,} from 'firebase/firestore';
import {db} from '../../firebase';

// Common
// export const autoAddDoc = async (userID) => {
//     try {
//         const pillDoc = await addDoc(collection(db, 'users', userID, 'pills'), pillInitData);
//         const notesDoc = await addDoc(collection(db, 'users', userID, 'notes'), notesInitData);
//         console.log('Document written with ID: ', pillDoc.id, notesDoc.id);
//     } catch (e) {
//         console.error('Error adding document: ', e);
//     }
// };

/// Pills
export const retrievePillsForUser = async (userID) => {
    const collectionRef = collection(db, 'users', userID, 'pills');
    const allPillsSnapshot = await getDocs(collectionRef);
    const data = allPillsSnapshot.docs.map((pillDoc) => {
        const dataItem = pillDoc.data();
        dataItem.id = pillDoc.id;
        return dataItem;
    });
    return data;
};

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

export const UpdatePillForUser = async (userID, docID, updateData) => {
    const docRef = doc(db, 'users', userID, 'pills', docID);
    await updateDoc(docRef, updateData);
};

export const UpdateMedicationReminderForUser = async (userID, medicationId, reminderID, updateData) => {
    const docRef = doc(db, 'users', userID, 'pills', medicationId, 'reminders', reminderID);
    await updateDoc(docRef, updateData);
};


export const DeletePillForUser = async (userID, docID) => {
    const docRef = doc(db, 'users', userID, 'pills', docID);
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

