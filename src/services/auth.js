import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";

export const createUser = async (email, password, name, avatar) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const uid = response.user.uid
        const data = {
            id: uid,
            email,
            name,
            avatar: 9,
        };
        const usersRef = doc(db, 'users', uid);
        await setDoc(usersRef, data);
        console.log('Registered with:', email);
    } catch(error) {
        console.log('Error creating user:', error.message);
    }
}
