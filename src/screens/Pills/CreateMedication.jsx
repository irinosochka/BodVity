import React, {useState} from "react";
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    ScrollViewComponent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore";
import {auth, db} from "../../../firebase";
import {colors} from "../../styles/Styles";
import {ReminderModal} from "../../components/PillsComponents/ReminderModal";


function CreateMedicationScreen({ navigation }) {

    const [interval, setInterval] = useState(1);

    const dateInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const frequencyModes = [
        {
            label: 'Every Day',
            value: 'Daily'
        },
        // {
        //   label: 'Specific Days',
        //   value: 'Specific'
        // },
        {
            label: 'Days Interval',
            value: 'Interval'
        },
    ]

    const [frequency, setFrequency] = useState('Daily')

    const timeModes = [
        {
            label: 'Once a day',
            value: 1
        },
        {
            label: 'Twice a day',
            value: 2
        },
        {
            label: 'Three times a day',
            value: 3
        },
        {
            label: 'Four times a day',
            value: 4
        },
        {
            label: 'Five times a day',
            value: 5
        },
        {
            label: 'Six times a day',
            value: 6
        },
    ]

    const [times, setTimes] = useState(1)

    const [title, setTitle] = useState('')
    const [pillsInStock, setPillsInStock] = useState('0')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [reminders, setReminders] = useState([
        {
            hour: 9,
            minute: 0,
            quantity: 1,
            note: ''
        }
    ])

    //start and end data
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        // setStartDate(null)
        setStartDatePickerVisibility(false);
    };

    const handleConfirmStartDate = (day) => {
        //setErrorMessage()

        if (day < new Date()) {
            //setErrorMessage('Your medication should be scheduled from today.')
            setStartDate(new Date())
        } else setStartDate(day)

        setStartDatePickerVisibility(false);
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDate(null)
        setEndDatePickerVisibility(false);
    };

    const handleConfirmEndDate = (day) => {
        //setErrorMessage()

        if (day <= startDate) {
            //setErrorMessage('Your medication should be ended after the start day.')
        } else setEndDate(day)

        setEndDatePickerVisibility(false);

    };

    //pill in stock
    const handleCheckPillsInStock = (text) => {
        let minAmount = 0
        reminders.forEach( item => minAmount += item.quantity)

        if (text === '' ||  parseInt(text) < minAmount) {
            //setErrorMessage(`You should have at least ${minAmount} pills`)
        } else {
            setPillsInStock(prev => text)
        }
    }

    //add pill
    const handleAddMedication = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if(title.length !== 0){
            createMedication();
            Keyboard.dismiss();
            setTitle('');
            setPillsInStock('0');
            setStartDate(new Date());
            setEndDate(null);
            setReminders([
                {
                    hour: 9,
                    minute: 0,
                    quantity: 1,
                    note: ''
                }
            ])
            setFrequency('Daily');
            setTitle(1)
            navigation.navigate('Pill');
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
                endDate: endDate ? Timestamp.fromDate(endDate) : null,
                updatedAt: serverTimestamp()
            }

            try {
                await addDoc(userMedicationsRef, medicationDocument).then( medicationDoc => {

                    const userMedicationRemindersRef = collection(db, 'users', auth.currentUser.uid, 'medications', medicationDoc.id.toString(), 'reminders')

                    const createMedicationReminders = async () => {
                        const plans = setUpReminders(startDate, endDate)
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
        createMedicationPlan()
    }

    // const createMedication = async () => {
    //     const createMedicationPlan = async () => {
    //         const userMedicationsRef = collection(db, 'users', auth.currentUser.uid, 'medications')
    //
    //         const plans = setUpReminders(startDate, endDate)
    //         let array = []
    //
    //         for(let plan of plans) {
    //             const reminderDocument = {
    //                 ...plan,
    //                 timestamp: Timestamp.fromDate(plan.timestamp),
    //                 updatedAt: Timestamp.fromDate(plan.updatedAt),
    //             }
    //             console.log('ReminderDocument:', reminderDocument);
    //             array.push(reminderDocument);
    //         }
    //
    //         const medicationDocument = {
    //             createdAt: serverTimestamp(),
    //             title: title,
    //             pillsInStock: parseInt(pillsInStock),
    //             startDate: Timestamp.fromDate(startDate),
    //             endDate: endDate ? Timestamp.fromDate(endDate) : null,
    //             updatedAt: serverTimestamp(),
    //             reminders: array
    //         }
    //         try{
    //             await addDoc(userMedicationsRef, medicationDocument)
    //         }catch (error) {
    //             console.log('Error in inserting a new medication plan:', error.message);
    //         }
    //     }
    //     createMedicationPlan()
    // }

    const  setUpReminders = (startDate, endDate) => {
        let res = []

        if (endDate) {
            let date = new Date(startDate)

            while(date < endDate) {
                reminders.forEach( plan => {
                    date.setHours(plan.hour, plan.minute, 0)
                    res = [...res, {
                        timestamp: new Date(date),
                        quantity: plan.quantity,
                        isConfirmed: false,
                        isMissed: false,
                        note: plan.note,
                        updatedAt: new Date(date)
                    }]
                })

                date.setDate(date.getDate() + parseInt(interval))
            }
        } else {
            let date = new Date(startDate)
            let count = parseInt(pillsInStock)
            while (count > 0) {
                reminders.forEach( plan => {
                    if (count >= plan.quantity) {
                        date.setHours(plan.hour, plan.minute, 0)
                        res = [...res, {
                            timestamp: new Date(date),
                            quantity: plan.quantity,
                            isConfirmed: false,
                            isMissed: false,
                            note: plan.note,
                            updatedAt: new Date(date)
                        }]
                        count -= plan.quantity
                    } else count = 0
                })
                date.setDate(date.getDate() + parseInt(interval))
            }
        }
        return res
    }

    return (
        <>
            <SafeAreaView
                style={styles.container}
            >
                {/*<TouchableOpacity onPress={()=> navigation.navigate('Pill')} style={styles.btnBack}>*/}
                {/*    <Icon name="arrow-left" size={24} color="black"/>*/}
                {/*</TouchableOpacity>*/}

                <View>
                    <Text style={styles.title}>Add Pill</Text>
                </View>

                <View>
                    <Text style={styles.txtTitle}>
                        Pill name
                    </Text>
                    <TextInput style={styles.input}
                               placeholder='Ex: Ibuprofen'
                               onChangeText={setTitle}
                               value={title}
                    />
                </View>

                <>

                {/*<View style={styles.buttonBox}>*/}
                {/*    <Text style={styles.boxHeaderText}>FREQUENCY</Text>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.button}*/}
                {/*        onPress={openFrequencyRef}*/}
                {/*    >*/}
                {/*        <Text>{frequency}</Text>*/}
                {/*        <Picker*/}
                {/*            ref={frequencyRef}*/}
                {/*            onValueChange={(itemValue, itemIdx) => setFrequency(itemValue)}*/}
                {/*            selectedValue={frequency}*/}
                {/*        >*/}
                {/*            {frequencyModes.map( (mode, idx) => <Picker.Item key={idx} label={mode.label} value={mode.value}/>)}*/}
                {/*        </Picker>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                {/*{ frequency === 'Interval' ?*/}
                {/*    <View style={styles.buttonBox}>*/}
                {/*        <Text style={styles.boxHeaderText}>HOW OFTEN?</Text>*/}
                {/*        <View style={styles.button}>*/}
                {/*            <Text>Every</Text>*/}
                {/*            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>*/}
                {/*                <TextInput*/}
                {/*                    underlineColorAndroid='black'*/}
                {/*                    textAlign='center'*/}
                {/*                    style={{marginRight: 10, padding: 5}}*/}
                {/*                    onChangeText={text => setInterval(text)}*/}
                {/*                    placeholder='2'*/}
                {/*                    keyboardType='numeric'*/}
                {/*                />*/}
                {/*                <Text>days</Text>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*    :*/}
                {/*    <></>*/}
                {/*}*/}

                {/*<View style={styles.buttonBox}>*/}
                {/*    <Text style={styles.boxHeaderText}>HOW MANY TIMES A DAY?</Text>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.button}*/}
                {/*        onPress={openTimesRef}*/}
                {/*    >*/}
                {/*        <Text>{times}</Text>*/}
                {/*        <Picker*/}
                {/*            ref={timeRef}*/}
                {/*            onValueChange={(itemValue, itemIdx) => {*/}
                {/*                setTimes(() => itemValue)*/}
                {/*            }}*/}
                {/*            selectedValue={times}*/}
                {/*        >*/}
                {/*            {timeModes.map( (mode, idx) => <Picker.Item key={idx} label={mode.label} value={mode.value}/>)}*/}
                {/*        </Picker>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                </>

                <View>
                    <Text style={styles.txtTitle}>
                        Time and doses
                    </Text>
                    { reminders.map( (reminder, idx) => <ReminderModal key={idx} reminders={reminders} setReminders={setReminders} idx={idx} reminder={reminder} />)}
                </View>


                {/*{*/}
                {/*    frequency === 'Specific' ?*/}
                {/*        <View style={styles.buttonBox}>*/}
                {/*            <Text>Which days?</Text>*/}
                {/*            { dateInWeek.map( (day,idx) => <DayChecker key={idx} day={day}/>)}*/}
                {/*        </View>*/}
                {/*        :*/}
                {/*        <></>*/}
                {/*}*/}

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.txtTitle}>
                        Starts in
                    </Text>
                    <Text onPress={showStartDatePicker} style={styles.dayText}>{startDate.toDateString()}</Text>
                    <DateTimePicker
                        isVisible={isStartDatePickerVisible}
                        mode={'date'}
                        onCancel={hideStartDatePicker}
                        onConfirm={handleConfirmStartDate}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.txtTitle}>
                        Ends in
                    </Text>
                    <Text  onPress={showEndDatePicker} style={styles.dayText}>{endDate ? endDate.toDateString() : 'ending date'}</Text>
                    <DateTimePicker
                        isVisible={isEndDatePickerVisible}
                        mode={'date'}
                        onCancel={hideEndDatePicker}
                        onConfirm={handleConfirmEndDate}
                    />
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
                            // onChange={handleCheckPillsInStock}
                    />
                </View>

                <TouchableOpacity style={styles.btnDone} onPress={handleAddMedication}>
                    <Text style={styles.txtBtnDone}>
                        Done
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

export default CreateMedicationScreen;



const styles = StyleSheet.create({
    // container: {
    //     flex: 1
    // },
    headerBar: {
        // height: 50,
        padding: 10,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    button : {
        flexDirection: 'row',
        // flex: 1,
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
    modalHeader: {
        // height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        // borderBottomWidth: 1,
        padding: 10
    },
    modalContainer : {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: '50%',
        // justifyContent: '',
        // backgroundColor: 'gray'
        backgroundColor: 'white',
        // padding: 10
    },
    modalDose: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        // flex: 1
    },
    modalTime : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    modalNote: {
        marginTop: 20
    },
    buttonBox : {
        marginVertical: 10
    },
    boxHeaderText : {
        marginLeft: 10,
        marginBottom: 3,
        fontWeight: 'bold'
    },
    contentContainer : {
        padding: 15
    },
    checkBox : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 5,
        borderBottomWidth: 1
    },
    checkText : {

    },

    dayText : {
        fontWeight: 'bold',
        color: 'tomato'
    },
    boxContainer: {
        // borderRadius: 10
    },
    modalText: {
        fontSize: 18
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
    },
})
