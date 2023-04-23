import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBxnu8mEY-ERdYHepFaRjtQP_ZYNxFD9CA",
    authDomain: "bodvity-9e8a1.firebaseapp.com",
    projectId: "bodvity-9e8a1",
    storageBucket: "bodvity-9e8a1.appspot.com",
    messagingSenderId: "118765072918",
    appId: "1:118765072918:web:e9ac2587545f22f75dfb37"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore();

export { auth, db };
// export const auth = getAuth(firebaseApp);
// export const db = getFirestore(firebaseApp);
