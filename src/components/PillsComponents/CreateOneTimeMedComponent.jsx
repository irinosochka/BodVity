import React, {useState} from "react";
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore";
import {auth, db} from "../../../firebase";
import {colors} from "../../styles/Styles";

import {
    confirmPushNotification,
    scheduleOneTimePushNotification,
    Scheduling
} from "../PushNotifications";
import {ButtonCustom} from "../../common/Button";
import {SetDoseAndTimeModal} from "./SetDoseAndTimeModal";


function CreateOneTimeMedComponent({ navigation }) {

    const [title, setTitle] = useState('')
    const [pillsInStock, setPillsInStock] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [reminders, setReminders] = useState([
        {
            hour: 9,
            minute: 0,
            quantity: 1,
            note: ''
        }
    ])

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleConfirmStartDate = (day) => {
        if (day < new Date()) {
            setStartDate(new Date())
        } else setStartDate(day)

        setStartDatePickerVisibility(false);
    };

    //add pill
    const handleAddMedication = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if(title.length !== 0 && pillsInStock.length !== 0){
            createMedication();
            Keyboard.dismiss();
            setTitle('');
            setPillsInStock('0');
            setStartDate(new Date());
            setReminders([
                {
                    hour: 9,
                    minute: 0,
                    quantity: 1,
                    note: ''
                }
            ])
            setTitle(1)
            navigation.navigate('Home');
        } else {
            console.log('empty error')
        }
    }


    const createMedication = async () => {
        const createMedicationPlan = async () => {
            const userMedicationsRef = collection(db, 'users', auth.currentUser.uid, 'medications')

            const medicationDocument = {
                createdAt: serverTimestamp(),
                title: title,
                pillsInStock: parseInt(pillsInStock),
                startDate: Timestamp.fromDate(startDate),
                endDate: Timestamp.fromDate(startDate),
                updatedAt: serverTimestamp()
            }

            try {
                await addDoc(userMedicationsRef, medicationDocument).then( medicationDoc => {

                    const userMedicationRemindersRef = collection(db, 'users', auth.currentUser.uid, 'medications', medicationDoc.id.toString(), 'reminders')

                    const createMedicationReminders = async () => {
                        const plans = setUpReminders(startDate)
                        let array = []

                        for(let plan of plans) {
                            const reminderDocument = {
                                ...plan,
                                timestamp: Timestamp.fromDate(plan.timestamp),
                                updatedAt: Timestamp.fromDate(plan.updatedAt),
                                medicationId: medicationDoc.id.toString(),
                            }
                            console.log('ReminderDocument:', reminderDocument);

                            await addDoc(userMedicationRemindersRef, reminderDocument).then(reminderDoc => {
                                array.push({...plan, timestamp: plan.timestamp, updatedAt: plan.updatedAt, id: reminderDoc.id})
                            }).catch(e => console.log('Error in adding reminders to a medication:', e.message))
                        }
                    }
                    createMedicationReminders()
                })

            } catch (error) {
                console.log('Error in inserting a new medication plan:', error.message);
            }
        }
        await createMedicationPlan()

        await confirmPushNotification()

        for(let reminder of reminders)
        {
            await scheduleOneTimePushNotification(parseInt(reminder.hour), parseInt(reminder.minute), title)
        }
    }

    const  setUpReminders = (startDate) => {
        let res = []
        let date = new Date(startDate)

        reminders.forEach( plan => {
            date.setHours(plan.hour, plan.minute, 0)
            res = [...res, {
                plan: 'one-time',
                timestamp: new Date(date),
                quantity: plan.quantity,
                isConfirmed: false,
                isMissed: true,
                note: plan.note,
                updatedAt: new Date(date)
            }]
        })
        return res
    }

    Scheduling();

    return (
        <>
            <SafeAreaView
                style={styles.container}
            >
                <View>
                    <Text style={styles.title}>Add Pill</Text>
                </View>

                <View>
                    <Text style={styles.txtTitle}>
                        Medication name
                    </Text>
                    <TextInput style={styles.input}
                               placeholder='Ex: Ibuprofen'
                               onChangeText={setTitle}
                               value={title}
                    />
                </View>

                <View>
                    <Text style={styles.txtTitle}>
                        Time and doses
                    </Text>
                    { reminders.map( (reminder, idx) => <SetDoseAndTimeModal key={idx} reminders={reminders} setReminders={setReminders} idx={idx} reminder={reminder} />)}
                </View>

                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.txtTitle}>
                            Date
                        </Text>
                        <Text onPress={showStartDatePicker} style={styles.dayText}>{startDate.toDateString()}</Text>
                        <DateTimePicker
                            isVisible={isStartDatePickerVisible}
                            mode={'date'}
                            onCancel={hideStartDatePicker}
                            onConfirm={handleConfirmStartDate}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.txtTitle}>
                        Quantity in stock
                    </Text>
                    <TextInput style={styles.input}
                               placeholder='Ex: 10'
                               onChangeText={setPillsInStock}
                               keyboardType='numeric'
                               value={pillsInStock}
                    />
                </View>

                <ButtonCustom buttonText={'Done'} onPress={handleAddMedication} />

            </SafeAreaView>
        </>
    )
}

export default CreateOneTimeMedComponent;



const styles = StyleSheet.create({
    button : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 60
    },
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
    buttonBox : {
        marginVertical: 10
    },
    boxHeaderText : {
        marginLeft: 10,
        marginBottom: 3,
        fontWeight: 'bold'
    },
    dayText : {
        fontWeight: 'bold',
        color: 'tomato'
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30,
        marginTop: -90,
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
        paddingLeft: 10,
        marginTop: -10,
    },
    txtTitle:{
        fontSize: 15,
        width: 190,
        height: 38
    },
    quantity:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        paddingLeft: 40
    },
})
