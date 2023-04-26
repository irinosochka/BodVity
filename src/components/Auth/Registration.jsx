import React, { useState } from 'react';
import {
    Text, TouchableOpacity, View,
    TextInput, StyleSheet
} from 'react-native';


import {colors, FormStyles, sizes} from '../../styles/Styles';
import {ButtonCustom} from "../../common/Button";
import Icon from "react-native-vector-icons/Feather";


const Registration = ({ navigation, name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, setPage}) => {
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const checkError = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setErrorName(name.length === 0);
        setErrorEmail(email.length === 0 || !emailRegex.test(email));
        setErrorPassword(password.length < 8);
        setErrorConfirmPassword(confirmPassword.length < 8 || password !== confirmPassword);

        return name.length !== 0 && email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && password === confirmPassword && emailRegex.test(email);
    };

    const signUpUser = async () => {
        const noError = checkError();
        if (noError) {
            setPage(2);
        }
    };

    return (
        <>
           <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
               <Icon name="arrow-left" size={35} color={colors.gray} />
           </TouchableOpacity>
           <View style={{marginTop: '30%' }}>
               <Text style={FormStyles.title}>Registration</Text>
               <Text style={{...styles.registrationInfo, marginTop: 8}}>Please enter your name and email for verification.</Text>
               <Text style={styles.registrationInfo}>Password must be at least 8 characters</Text>
               <View style={styles.inputsContainer}>
                   <View style={errorName ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                                <TextInput
                                    style={FormStyles.input}
                                    placeholder="Name"
                                    onChangeText={(value) => {
                                        setName(value);
                                        if (value.length > 0) {
                                            setErrorName(false);
                                        }
                                    }}
                                    value={name}
                                />
                            </View>
                   <View style={errorEmail ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                                <TextInput
                                    style={FormStyles.input}
                                    placeholder="Email"
                                    onChangeText={(value) => {
                                        setEmail(value);
                                        if (value.length > 0) {
                                            setErrorEmail(false);
                                        }
                                    }}
                                    value={email}
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                />
                            </View>
                   <View style={errorPassword ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                                <TextInput
                                    style={FormStyles.input}
                                    placeholder="Password"
                                    onChangeText={(value) => {
                                        setPassword(value);
                                        if (value.length > 0) {
                                            setErrorPassword(false);
                                        }
                                    }}
                                    value={password}
                                    secureTextEntry
                                    keyboardType="default"
                                    textContentType="password"
                                    autoCapitalize="none"
                                    autoCompleteType="password"
                                />
                            </View>
                   <View style={errorConfirmPassword ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                                <TextInput
                                    style={FormStyles.input}
                                    placeholder="Confirm Password"
                                    onChangeText={(value) => {
                                        setConfirmPassword(value);
                                        if (value.length > 0) {
                                            setErrorConfirmPassword(false);
                                        }
                                    }}
                                    value={confirmPassword}
                                    secureTextEntry
                                    keyboardType="default"
                                    textContentType="password"
                                    autoCapitalize="none"
                                    autoCompleteType="password"
                                />
                            </View>
               </View>
               <View style={styles.container3}>
                   <ButtonCustom buttonText={'Proceed'} onPress={signUpUser} width={'100%'}/>
                   <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                       <TouchableOpacity
                           style={{ marginLeft: 4 }}
                           onPress={() => navigation.navigate('Welcome')}
                       >
                           <Text style={styles.btnLogin}>Join us before? Login</Text>
                       </TouchableOpacity>
                   </View>
               </View>
           </View>
        </>
    );
};

export default Registration;

const styles = StyleSheet.create({
    registrationInfo: {
        color: colors.gray3,
        marginTop: 3,
    },
    inputsContainer:{
        marginTop: 20,
    },
    container3: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btnLogin: {
        marginTop: 15,
        color: colors.gray3,
        fontSize: sizes.body
    }
});
