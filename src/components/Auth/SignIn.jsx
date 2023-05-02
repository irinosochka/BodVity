import React, { useState } from 'react';
import {
    Text, TouchableOpacity, View,
    TextInput, StyleSheet
} from 'react-native';


import {colors, FormStyles, sizes} from '../../styles/Styles';
import {ButtonCustom} from "../../common/Button";
import Icon from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";


const SignIn = ({ navigation, email, password, setEmail, setPassword, handleSignIn}) => {
    const { t } = useTranslation();
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
                <Text style={FormStyles.title}>{t('login')}</Text>
                <Text style={{...styles.registrationInfo, marginTop: 8, marginBottom: 20}}>{t('loginInfo')}</Text>
                <View style={styles.inputsContainer}>
                    <View style={errorEmail ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                        <TextInput
                            style={FormStyles.input}
                            placeholder={t('email')}
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
                            placeholder={t('password')}
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
                    <ButtonCustom buttonText={t('loginBtn')} onPress={signInUser} width={'100%'}/>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                        <TouchableOpacity
                            style={{ marginLeft: 4 }}
                            onPress={() => navigation.navigate('Welcome')}
                        >
                            <Text style={styles.btnLogin}>{t('newInApp')}</Text>
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
