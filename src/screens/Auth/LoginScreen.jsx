import React, {useEffect, useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../../firebase';
import { setDoc, doc, getDoc} from 'firebase/firestore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7eac4',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,

    },
});

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigation.navigate('Home');
    //         }
    //     });
    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            return onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate('AppTab');
                }
            });
        }
        fetchData()
            .catch(console.error)
    }, []);

    const handleSignUp = async() => {
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const { user } = userCredential;
        //         console.log('Registered with:', user.email);
        //         autoAddDoc(user.uid);
        //     })
        //     .catch((error) => alert(error.message));
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                // fullName,
            };
            const usersRef = doc(db, 'users', uid);
            await setDoc(usersRef, data);
            console.log('Registered with:', email);
        } catch(error) {
            alert(error.message)
        }
    };

    const handleSignIn = async() => {
        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const { user } = userCredential;
        //         console.log('Logged in with:', user.uid);
        //     })
        //     .catch((error) => alert(error.message));
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
            const usersRef = doc(db, 'users', uid)
            const firestoreDocument = await getDoc(usersRef)
            if (!firestoreDocument.exists) {
                alert("User does not exist anymore.")
                return;
            }
            console.log('Logged in with:', uid);
        } catch(error) {
            alert(error.message)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        clearButtonMode="while-editing"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        clearButtonMode="while-editing"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={styles.button}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default LoginScreen;
