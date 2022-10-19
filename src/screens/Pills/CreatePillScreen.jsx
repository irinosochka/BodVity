import {
    StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import {AddPillForUser, UpdatePillForUser} from '../../services/collections';
import { auth } from '../../../firebase';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30

    },
    title:{
        marginTop: 32,
        fontSize: 28,
        marginBottom: 31,
        alignSelf:'flex-start',
        paddingLeft: 15

    },
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 319,
        height: 48,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10
    },
    txtTitle:{
        fontSize: 15,
        width: 190,
        height: 38

    },
    quantityInput:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 152,
        height: 48,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10
    },
    quantity:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        paddingLeft: 40
    },

    btnDone:{
        width: 319,
        height: 56,
        backgroundColor: '#c8e2ae',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginTop: 138
    },
    txtBtnDone:{
        fontSize: 17,
        color:'#FFF'
    },
    btnBack:{
        width: 56,
        height: 56,
        alignSelf:'flex-start',
        backgroundColor: '#F8F8F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    }
});

function CreatePillScreen({ navigation }) {
    const[title, setTitle]=useState(null)
    const[notification, setNotification]=useState(new Date(Date.now()))
    const[quantity, setQuantity]=useState(null)
    const[days, setDays]=useState(null)

    const handleAddPill = async () => {
        const newPillItem = {
            title: title,
            time: notification,
            quantity: quantity,
            days: days,
            completed: false,
        };
        AddPillForUser(auth.currentUser.uid, newPillItem).catch(console.error);
        Keyboard.dismiss();
    };

    const createPill = () => {
        handleAddPill();
        setTitle('');
        setQuantity('');
        setNotification('');
        setDays('');
        navigation.navigate('allPills');
    };

    const onReminderTimeChange = async (_event, selectedDate) => {

        if (_event?.type === 'dismissed') {
            setNotification(notification);
            return;
        }
        setNotification(selectedDate);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <TouchableOpacity onPress={()=> navigation.navigate('allPills')} style={styles.btnBack}>
                <Icon name="arrow-left" size={24} color="black" style={styles.arrowBack}/>
            </TouchableOpacity>

            <Text style={styles.title}>Add Pill</Text>


            <View >
                <Text style={styles.txtTitle}>
                   Pill name
                </Text>
                <TextInput style={styles.input}
                           placeholder='Ex: Ibuprofen'
                           onChangeText={setTitle}
                           value={title}
                />
            </View>

            <View style={styles.quantity}>
                <View>
                    <Text style={styles.txtTitle}>
                       Quantity
                    </Text>
                    <TextInput style={styles.quantityInput}
                               placeholder='Ex: 1 pill'
                               onChangeText={setQuantity}
                               value={quantity}
                    />
                </View>
                <View >
                    <Text style={styles.txtTitle}>
                        How long?
                    </Text>
                    <TextInput style={styles.quantityInput}
                               placeholder='Ex: 10 days'
                               onChangeText={setDays}
                               value={days}
                    />
                </View>
            </View>

            <View >
                <Text style={styles.txtTitle}>
                    Notification
                </Text>
                <View style={styles.input}>
                    <DateTimePicker
                        value={notification}
                        mode="time"
                        is24Hour
                        style={{width: 90, height: 30}}
                        onChange={onReminderTimeChange}
                    />
                </View>
                {/*<TextInput style={styles.input}*/}
                {/*           placeholder='Ex: 10:00'*/}
                {/*           onChangeText={setNotification}*/}
                {/*           value={notification}*/}
                {/*/>*/}
            </View>



            <TouchableOpacity style={styles.btnDone} onPress={createPill}>
                <Text style={styles.txtBtnDone}>
                    Done
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CreatePillScreen;
