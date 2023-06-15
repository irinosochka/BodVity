import React, {useEffect, useState} from "react";
import {BackHandler, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import {colors, FormStyles} from "../../../styles/Styles";
import {ButtonCustom} from "../../../common/Button";
import {Scheduling} from "../../../services/pushNotifications";
import {CreateStyles} from "../createPill/createStyles";
import DataAndTime from "./DataAndTime";
import Alarm from "../createPill/Alarm";
import {createAppointment} from "../../../services/collections";
import {auth} from "../../../../firebase";
import {useTranslation} from "react-i18next";

const CreateAppointmentScreen = ({navigation}) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const [note, setNote] = useState('');
    const [dateAppointment, setDateAppointment] = useState(new Date());
    const [dateNotification, setDateNotification] = useState(new Date());
    const [isNotification, setNotification] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                navigation.goBack();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [navigation]);


    const checkError = () => {
        setErrorTitle(title.length === 0)
        if(isNotification === false)
            setDateNotification(dateAppointment);
    }

    const reset = () => {
        Keyboard.dismiss();
        setTitle('');
        setNote('');
        setDateAppointment(new Date());
        setDateNotification(new Date());
        setNotification(true);
    }

    const handleAddAppointment = async() => {
        let newNotifDate = dateNotification;
        if(!isNotification)
            newNotifDate = dateAppointment;
        checkError()
        if(title.length !== 0){
            await createAppointment(auth.currentUser.uid, title, note, dateAppointment, newNotifDate, t('textAppointment1'), t('textAppointment2'));
            reset();
            navigation.navigate('Home');
        }else {
            console.log('empty error')
        }
    }

    Scheduling();

    return (
        <SafeAreaView style={{...FormStyles.AndroidSafeArea,}}>
            <View style={{paddingHorizontal: 15}}>
                <View style={CreateStyles.header}>
                    <Text style={FormStyles.title}>{t('createNewAppointment')}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="x" size={35} color= {colors.gray}/>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={CreateStyles.shadowForContainer}>
                        <Text style={CreateStyles.title}>{t('appointmentName')}</Text>
                        <View style={CreateStyles.zIndex}>
                            <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : CreateStyles.inputContainer}>
                                <TextInput
                                    style={CreateStyles.input}
                                    placeholder={t('exampleAppointment')}
                                    onChangeText={(text) => {
                                        setTitle(text);
                                        if (text.length > 0) {
                                            setErrorTitle(false);
                                        }
                                    }}
                                    value={title}
                                />
                            </View>
                        </View>
                        <DataAndTime setDateAppointment={setDateAppointment} dateAppointment={dateAppointment}/>
                    </View>
                    <View style={{...CreateStyles.shadowForContainer, marginTop: 10, paddingTop: 15,}}>
                        <Alarm setIsAlarm={setNotification} isAlarm={isNotification} text={t('differentTimeQuestion')} />
                        {isNotification && <DataAndTime setDateAppointment={setDateNotification} dateAppointment={dateNotification}/>}
                        <Text style={CreateStyles.title}>{t('noteForAppointment')}</Text>
                        <View style={CreateStyles.zIndex}>
                            <View style={CreateStyles.inputContainer}>
                                <TextInput
                                    style={CreateStyles.input}
                                    placeholder={t('exampleNoteForAppointment')}
                                    onChangeText={(text) => {
                                        setNote(text);
                                    }}
                                    value={note}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={CreateStyles.buttonContainer}>
                        <ButtonCustom buttonText={t('createBtn')} onPress={handleAddAppointment} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CreateAppointmentScreen;
