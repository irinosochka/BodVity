import {
    StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import {AddPillForUser} from '../../services/collections';
import { auth } from '../../../firebase';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {colors} from "../../styles/Styles";

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
    inputTime:{
        marginTop: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 15,
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
    quantityInputTime:{
        fontSize: 15,
        color: '#9B9B9B',
    },
    quantity:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        paddingLeft: 40
    },

    btnDone:{
        width: 319,
        height: 56,
        backgroundColor: colors.primary,
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
    const[title, setTitle]=useState('')
    const[notification, setNotification] = useState(new Date());
    const[quantity, setQuantity]=useState('')
    const[days, setDays]=useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const timeSetter = (time) => {
        setNotification(time);
        hideDatePicker();
    }

    const handleAddPill = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if(title.length !== 0 && quantity.length !== 0 && days.length !== 0 ){
            const newPillItem = { title: title, time: notification, quantity: quantity, days: days, completed: false};
            AddPillForUser(auth.currentUser.uid, newPillItem).catch(console.error);
            Keyboard.dismiss();
            setTitle('');
            setQuantity('');
            setNotification(new Date());
            setDays('');
            navigation.navigate('Pill');
        }else {
            console.log('empty error')
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <TouchableOpacity onPress={()=> navigation.navigate('Pill')} style={styles.btnBack}>
                <Icon name="arrow-left" size={24} color="black"/>
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
                    <View style={styles.inputTime}>
                        {/*<Text style={styles.quantityInputTime}>{moment(notification).format('HH:mm')}</Text>*/}
                        <Text style={styles.quantityInputTime}>{moment(notification).format('D MMMM HH:mm')}</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                            <Icon name="clock" size={23} color={'#9B9B9B'} />
                            <DateTimePickerModal
                                // mode='time'
                                mode='datetime'
                                isVisible={isDatePickerVisible}
                                value={notification}
                                onDateChange={setNotification}
                                onConfirm={timeSetter}
                                onCancel={hideDatePicker}
                                locale="en_GB"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <TouchableOpacity style={styles.btnDone} onPress={handleAddPill}>
                <Text style={styles.txtBtnDone}>
                    Done
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CreatePillScreen;
