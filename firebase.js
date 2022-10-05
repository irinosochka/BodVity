import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCcfkobLT6IG78gp_a4FRBx5kdDbepmujQ",
    authDomain: "bodvity-4e469.firebaseapp.com",
    projectId: "bodvity-4e469",
    storageBucket: "bodvity-4e469.appspot.com",
    messagingSenderId: "123385144198",
    appId: "1:123385144198:web:facd4d94bdc664b310c207"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
