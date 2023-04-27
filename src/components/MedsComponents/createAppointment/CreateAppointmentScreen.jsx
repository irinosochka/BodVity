import React, {useEffect, useState} from "react";
import {BackHandler, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import {colors, FormStyles} from "../../../styles/Styles";
import {ButtonCustom} from "../../../common/Button";
import {Scheduling} from "../../../services/pushNotifications";
import {CreateStyles} from "../createPill/createStyles";
import DataAndTime from "./DataAndTime";
import Alarm from "../createPill/Alarm";
import {createAppointment} from "../../../services/collections";
import {auth} from "../../../../firebase";

const CreateAppointmentScreen = ({navigation}) => {
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

        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Home', key: Date.now() }],
        // });
    }

    const handleAddAppointment = async() => {
        checkError()
        if(title.length !== 0){
            await createAppointment(auth.currentUser.uid, title, note, dateAppointment, dateNotification);
            reset();
            navigation.navigate('Home');
        }else {
            console.log('empty error')
        }
    }

    Scheduling();

    return (
        <View style={CreateStyles.container}>
            <View style={CreateStyles.header}>
                <Text style={FormStyles.title}>Create a new appointment</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={35} color= {colors.gray}/>
                </TouchableOpacity>
            </View>

            <View style={CreateStyles.shadowForContainer}>
                <ScrollView>
                    <View style={CreateStyles.createContainer}>
                        <Text style={CreateStyles.title}>Appointment name</Text>
                        <View style={CreateStyles.zIndex}>
                            <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : CreateStyles.inputContainer}>
                                <TextInput
                                    style={CreateStyles.input}
                                    placeholder="Ex: Cardiologist visit"
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
                    <View style={{...CreateStyles.createContainer, marginTop: 10, paddingTop: 15,}}>
                        <Alarm setIsAlarm={setNotification} isAlarm={isNotification} text={'Different time for notification?'} />
                        {isNotification && <DataAndTime setDateAppointment={setDateNotification} dateAppointment={dateNotification}/>}
                        <Text style={CreateStyles.title}>Note for appointment</Text>
                        <View style={CreateStyles.zIndex}>
                            <View style={CreateStyles.inputContainer}>
                                <TextInput
                                    style={CreateStyles.input}
                                    placeholder="Ex: Get results from blood test"
                                    onChangeText={(text) => {
                                        setNote(text);
                                    }}
                                    value={note}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={CreateStyles.buttonContainer}>
                        <ButtonCustom buttonText={'Done'} onPress={handleAddAppointment} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default CreateAppointmentScreen;
