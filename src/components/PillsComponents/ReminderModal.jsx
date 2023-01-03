import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {useState} from "react";
import {colors} from "../../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';

export function ReminderModal({reminders, setReminders, reminder, idx}) {
    const [openReminderModal, setOpenReminderModal] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(reminder)
    const [note, setNote] = useState('')

    const getTime = (item) => {
        const h = item.hour
        const m = item.minute
        const str = (
            ((h % 12) < 10 ? '0' : '')
            + (h % 12).toString()
            + ':'
            + (m < 10 ?  '0' : '')
            + m.toString()
            + ' '
            + (h <= 12 ? 'AM' : 'PM')
        )
        return str
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (day) => {

        setTime( prevTime => ({
            ...prevTime,
            hour: day.getHours(),
            minute: day.getMinutes()
        }))

        hideDatePicker();
    };

    const handleClickDecrementDose = () => {
        setTime( prevTime => ({...prevTime, quantity: prevTime.quantity - 1}))
    }

    const handleClickIncrementDose = () => {
        setTime( prevTime => ({...prevTime, quantity: prevTime.quantity + 1}))
    }

    const handleClickWriteNote = (text) => {
        setNote(text)
        setTime( prevTime => ({...prevTime, note: note}))
    }

    const handleClickDone = () => {
        setReminders( reminders.map( (reminder, index) => (index === idx ? time : reminder)))
        setOpenReminderModal(!openReminderModal)
        console.log(reminders);
    }

    const position = (idx) => {
        const pos = ['1st', '2nd', '3rd']

        if (idx > 2) return (idx + 1).toString() + 'th';
        else return pos[idx]
    }

    return (
        <>
            <TouchableOpacity onPress={() => setOpenReminderModal(!openReminderModal)} style={styles.reminder}>
                <Text>{position(idx)}</Text>
                <Text>{getTime(time)}</Text>
                <Text>Take {reminder.quantity} pills</Text>
            </TouchableOpacity>

            <Modal transparent={true} visible={openReminderModal} animationType='fade'>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.btnText} onPress={() => setOpenReminderModal(!openReminderModal)}>Cancel</Text>
                            <Text style={styles.btnText} onPress={handleClickDone}>Done</Text>
                        </View>

                        <View style={{flex: 1, padding: 20}}>
                            <TouchableOpacity onPress={showDatePicker} style={styles.modalTime}>
                                <Text style={styles.modalText}>Time</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.modalText}>{getTime(time)}</Text>
                                </View>
                                <DateTimePicker
                                    isVisible={isDatePickerVisible}
                                    mode={'time'}
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </TouchableOpacity>

                            <View style={styles.modalDose}>
                                <Text style={styles.modalText}>Doses</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                    <TouchableOpacity
                                        disabled={time.quantity === 1 ? true : false}
                                        onPress={handleClickDecrementDose}
                                    >
                                        <Icon
                                            name="minus"
                                            size={35}
                                            color={time.quantity === 1 ? 'gray' : 'tomato'}
                                        />
                                    </TouchableOpacity>

                                    <Text style={{borderBottomWidth: 2, fontSize: 18}}>{time.quantity}</Text>

                                    <TouchableOpacity
                                        onPress={handleClickIncrementDose}
                                    >
                                        <Icon
                                            name="plus"
                                            size={35}
                                            color={colors.primary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalNote}>
                                <Text style={styles.modalText}>Note</Text>
                                <TextInput style={styles.input}
                                           placeholder='Ex: after meals'
                                           onChangeText={handleClickWriteNote}
                                           value={note}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}


const styles = StyleSheet.create({
    reminder : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 12,
        color: '#9B9B9B',
        width: 319,
        height: 48,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10,
        marginTop: -10,
    },
    modal : {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalHeader: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        // borderBottomWidth: 1,
        padding: 10,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    modalContainer : {
        position: 'absolute',
        top: '30%',
        width: '100%',
        height: '35%',
        backgroundColor: 'white',
        borderRadius: 14,
    },
    modalDose: {
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalTime : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    modalNote: {
        marginTop: 10
    },
    modalText: {
        fontSize: 18,
    },
    btnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 17
    },
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        height: 60,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10,
        padding: 10,
    },
})
