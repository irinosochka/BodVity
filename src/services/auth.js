import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import i18next from "i18next";

export const CreateUser = async (email, password, name, avatarNumber, gender, birthday, bloodGroup) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const uid = response.user.uid
        const data = {
            id: uid,
            email,
            name,
            avatar: avatarNumber,
            gender: gender,
            birthday: new Date(birthday),
            bloodGroup: bloodGroup,
            language : i18next.language,
        };
        const usersRef = doc(db, 'users', uid);
        await setDoc(usersRef, data);
        console.log('Registered with:', email);
    } catch(error) {
        alert(error.message)
    }
}

export const UpdateUser = async (userID, updateData) => {
    try{
        const docRef = doc(db, 'users', userID);
        await updateDoc(docRef, updateData);
    } catch(error) {
        alert(error.message)
    }
}

export const getAvatar = (avatarNumber) => {

    switch(avatarNumber) {
        case 0:
            return require('../../assets/avatars/avatar1.png');
        case 1:
            return require('../../assets/avatars/avatar2.png');
        case 2:
            return require('../../assets/avatars/avatar3.png');
        case 3:
            return require('../../assets/avatars/avatar4.png');
        case 4:
            return require('../../assets/avatars/avatar5.png');
        case 5:
            return require('../../assets/avatars/avatar6.png');
    }
}

export const genderIconFunc = (gender) => {
    if(gender === 'female' || gender === 'male')
        return gender;
    return 'transgender-outline';
}

