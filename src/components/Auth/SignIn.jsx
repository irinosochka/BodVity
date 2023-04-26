import React, { useState } from 'react';
import {
    Text, TouchableOpacity, View,
    TextInput, StyleSheet
} from 'react-native';


import {colors, FormStyles, sizes} from '../../styles/Styles';
import {ButtonCustom} from "../../common/Button";
import Icon from "react-native-vector-icons/Feather";


const SignIn = ({ navigation, email, password, setEmail, setPassword, handleSignIn}) => {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const checkError = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrorEmail(email.length === 0 || !emailRegex.test(email));
        setErrorPassword(password.length < 8);

        return email.length !== 0 && password.length !== 0 && emailRegex.test(email) && password.length >= 8;
    };

    const signInUser = async () => {
        const noError = checkError();
        if (noError) {
            handleSignIn();
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <Icon name="arrow-left" size={35} color={colors.gray} />
            </TouchableOpacity>
            <View style={{marginTop: '30%' }}>
                <Text style={FormStyles.title}>Sign In</Text>
                <Text style={{...styles.registrationInfo, marginTop: 8, marginBottom: 20}}>Please enter email and password for login</Text>
                <View style={styles.inputsContainer}>
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
                </View>
                <View style={styles.container3}>
                    <ButtonCustom buttonText={'Proceed'} onPress={signInUser} width={'100%'}/>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                        <TouchableOpacity
                            style={{ marginLeft: 4 }}
                            onPress={() => navigation.navigate('Welcome')}
                        >
                            <Text style={styles.btnLogin}>New to BodVity? Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

export default SignIn;

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
