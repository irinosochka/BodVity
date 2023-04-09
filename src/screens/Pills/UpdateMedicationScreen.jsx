import React, {useEffect, useState} from "react";
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {serverTimestamp} from "firebase/firestore";
import {auth} from "../../../firebase";
import {colors} from "../../styles/Styles";
import {ButtonCustom} from "../../common/Button";
import {getMedicationByID} from "../../services/collections";


function UpdateMedicationScreen({ navigation, route }) {

    const { medicationId } = route.params;

    const [medication, setMedication] = useState(getMedicationByID(auth.currentUser.uid, medicationId));

    useEffect(() => {
        const fetchData = async () => {
            const newMedication = await getMedicationByID(auth.currentUser.uid, medicationId);
            setMedication(newMedication);
        }
        fetchData().catch(console.error)
    },[])

    const [title, setTitle] = useState(medication.title)
    const [pillsInStock, setPillsInStock] = useState(medication.pillsInStock)
    const [startDate, setStartDate] = useState(medication.startDate)
    const [endDate, setEndDate] = useState(medication.endDate)

    //start and end data
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDate(null)
        setEndDatePickerVisibility(false);
    };

    const handleConfirmEndDate = (day) => {
        if (day <= startDate) {
            //setErrorMessage('Your medication should be ended after the start day.')
        } else setEndDate(day)

        setEndDatePickerVisibility(false);
    };

    //add pill
    const handleUpdateMedication = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (title.length !== 0 && pillsInStock.length !== 0) {
            updateMedication();
            Keyboard.dismiss();
            setTitle('');
            setPillsInStock('0');
            setStartDate(new Date());
            setEndDate(null);
            navigation.navigate('Home');
        } else {
            console.log('empty error')
        }
    }

    const updateMedication = async () => {
        const docID = medicationId;
        medication.title = title;
        medication.pillsInStock = pillsInStock;
        medication.startDate = startDate;
        medication.endDate = endDate;
        UpdatePillForUser(auth.currentUser.uid, docID, {
            title: title,
            pillsInStock: pillsInStock,
            startDate: startDate,
            endDate: endDate,
            updatedAt: serverTimestamp()
        }).catch(console.error);
    }

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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                <ButtonCustom buttonText={'Done'} onPress={handleUpdateMedication} />

            </SafeAreaView>
        </>
    )
}

export default UpdateMedicationScreen;



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
})
