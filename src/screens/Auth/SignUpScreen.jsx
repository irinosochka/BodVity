import React, { useState } from 'react';
import {
    Text, TouchableOpacity, View,
    TextInput, ActivityIndicator,
    Keyboard, TouchableWithoutFeedback } from 'react-native';


import {colors, FormStyles, sizes} from '../../styles/Styles';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../firebase";
import {doc, setDoc} from "firebase/firestore";


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);


const SignUpScreen = ({ navigation }) => {
    // const dispatch = useAuthDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signUpLoading, setSignUpLoading] = useState(false);
    const [error, setError] = useState();


    const signUpUser = async() => {
        // setSignUpLoading(true);
        if(password === confirmPassword && name.length !== 0){
            try{
                const response = await createUserWithEmailAndPassword(auth, email, password)
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    name,
                };
                const usersRef = doc(db, 'users', uid);
                await setDoc(usersRef, data);
                console.log('Registered with:', email);
            } catch(error) {
                alert(error.message)
                setError(error.message);
            }
        }
        // setSignUpLoading(false);
    };

    // const signUpUser = () => {
    //     setSignUpLoading(true);
    //     signUp(email, password)
    //         .then((data) => {
    //             console.log(data);
    //             setSigned(true);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setError(err.message);
    //         })
    //         .finally(() => setSignUpLoading(false));
    // };


    return (
        <DismissKeyboard>
            <View style={FormStyles.container}>
                <View style={FormStyles.containerSub}>
                    <Text style={FormStyles.title}>Sign Up</Text>
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCompleteType="email"
                    />
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCompleteType="email"
                    />
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry
                        keyboardType="default"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCompleteType="password"
                    />
                    <TextInput
                        style={FormStyles.textInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        secureTextEntry
                        keyboardType="default"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCompleteType="password"
                    />
                    <TouchableOpacity style={FormStyles.btn} onPress={signUpUser}>
                        {signUpLoading ?
                            <ActivityIndicator size="small" color="white" /> :
                            <Text style={FormStyles.btnText}>Sign Up </Text>
                        }
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                        <TouchableOpacity
                            style={{ marginLeft: 4 }}
                            onPress={() => navigation.navigate('Welcome')}
                        >
                            <Text style={{ color: colors.gray2, fontSize: sizes.body }}>Join us before? Login</Text>
                        </TouchableOpacity>
                    </View>
                    {error && <Text style={FormStyles.error}>{error}</Text>}
                </View>
            </View>
        </DismissKeyboard>
    );
};

export default SignUpScreen;
