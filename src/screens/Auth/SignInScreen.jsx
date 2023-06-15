import React, { useState } from 'react';
import { SafeAreaView, View} from 'react-native';
import {FormStyles} from "../../styles/Styles";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../firebase";
import {doc, getDoc} from "firebase/firestore";
import SignIn from "../../components/Auth/SignIn";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const reset = () => {
        setEmail('');
        setPassword('');
    }

    const handleSignIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
            const usersRef = doc(db, 'users', uid)
            const firestoreDocument = await getDoc(usersRef)
            if (!firestoreDocument.exists) {
                alert("User does not exist anymore.")
                return;
            }
            console.log('Logged in with:', uid, ' email: ', email);
            reset();
        } catch(error) {
            alert(error.message)
        }
    }

    return (
        <SafeAreaView style={{...FormStyles.AndroidSafeArea}}>
            <View style={{paddingHorizontal: 15}}>
                <SignIn navigation={navigation} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSignIn={handleSignIn}/>
            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;

