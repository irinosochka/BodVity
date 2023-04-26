import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";

export const createUser = async (email, password, name, avatarNumber, gender, birthday, bloodGroup) => {
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
        };
        const usersRef = doc(db, 'users', uid);
        await setDoc(usersRef, data);
        console.log('Registered with:', email);
    } catch(error) {
        alert(error.message)
    }
}

export const getAvatar = (avatarNumber) => {

    switch(avatarNumber) {
        case 1:
            return require('../../assets/avatars/avatar1.png');
        case 2:
            return require('../../assets/avatars/avatar2.png');
        case 3:
            return require('../../assets/avatars/avatar3.png');
        case 4:
            return require('../../assets/avatars/avatar4.png');
        case 5:
            return require('../../assets/avatars/avatar5.png');
        case 6:
            return require('../../assets/avatars/avatar6.png');
    }
}
