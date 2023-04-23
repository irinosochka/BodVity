import React, {useEffect, useState} from "react";
import {BackHandler, Keyboard, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {retrieveMedicationsForUser} from "../../../services/collections";
import {auth} from "../../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import Title from "./Title";
import Quantity from "./Quantity";
import HowLong from "./HowLong";
import AlternativeDays from "./AlternativeDays";
import DoseAndTime from "./DoseAndTime";
import Icon from "react-native-vector-icons/Feather";
import {colors, FormStyles} from "../../../styles/Styles";
import {ButtonCustom} from "../../../common/Button";
import {CreateStyles} from "./createStyles";
import Alarm from "./Alarm";
import {createMed, createMedicationPlan, createMedicationReminders} from "./functionsForCreateMeds";
import {Scheduling} from "../../PushNotifications";

const CreateMedScreen = ({navigation, route}) => {
    const { frequency } = route.params;

    const [selectedMedication, setSelectedMedication] = useState(null);
    const [medicationItems, setMedicationItems] = useState([]);
    const [title, setTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const [pillsInStock, setPillsInStock] = useState('');
    const [errorStock, setErrorStock] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isAlternative, setAlternative] = useState(false);
    const [reminders, setReminders] = useState([
        {
            hour: 9,
            minute: 0,
            quantity: 1,
        }
    ])

    const[selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([1, 1, 1, 1, 1, 1, 1]) //sun, mon, tue, wed, thu, fri, sat,

    const [isAlarm, setIsAlarm] = useState(true);

    const isFocused = useIsFocused();

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newMedications = await retrieveMedicationsForUser(auth.currentUser.uid);
                setMedicationItems(newMedications);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);


    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication);
    };

    const checkError = () => {
        setErrorTitle(title.length === 0)
        selectedMedication ? setErrorStock(false) : setErrorStock(pillsInStock.length === 0)
    }

    const reset = () => {
        Keyboard.dismiss();
        setTitle('');
        setPillsInStock('');
        setStartDate(new Date());
        setSelectedDaysOfWeek([1, 1, 1, 1, 1, 1, 1]);
        setAlternative(false);
        setReminders([
            {
                hour: 9,
                minute: 0,
                quantity: 1,
            }
        ]);

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', key: Date.now() }],
        });
    }

    const handleAddMedication = () => {
        checkError()

        if(selectedMedication){
            createMedicationReminders(frequency, reminders, startDate, endDate, title, isAlarm, selectedDaysOfWeek, selectedMedication.id);
            reset();
        } else if(title.length !== 0 && pillsInStock.length !== 0){
            frequency === 'withoutReminders'
                ?
                createMed(title, pillsInStock, startDate, endDate)
                :
                createMedicationPlan(frequency, title, pillsInStock, startDate, endDate, reminders, isAlarm, selectedDaysOfWeek);
            reset();
        }else {
            console.log('empty error')
        }
    }

    Scheduling();

    return (
        <View style={CreateStyles.container}>
            <View style={CreateStyles.header}>
                <Text style={FormStyles.title}>Create a new plan</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={27} color= {colors.black}/>
                </TouchableOpacity>
            </View>
            {/*<View style={CreateStyles.dividerStyle} />*/}
            <View style={CreateStyles.shadowForContainer}>
                <View style={CreateStyles.createContainer}>
                    <Text style={CreateStyles.title}>Medicine name</Text>
                    <View style={CreateStyles.zIndex}>
                        <Title medicationItems={medicationItems} onSelectItem={handleMedicationSelect} title={title} setTitle={setTitle} errorTitle={errorTitle} setErrorTitle={setErrorTitle} setErrorStock={setErrorStock} frequency={frequency}/>
                    </View>
                    <Text style={{...CreateStyles.title, marginBottom: 5}}>Quantity in stock</Text>
                    {selectedMedication?.title === title
                        ?
                        <Quantity medication={selectedMedication} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock} errorStock={errorStock} setErrorStock={setErrorStock} />
                        :
                        <Quantity medication={false} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock} errorStock={errorStock} setErrorStock={setErrorStock}/>
                    }
                </View>
                {
                    frequency !== 'withoutReminders' &&
                    <View style={{...CreateStyles.createContainer, marginTop: 10}}>
                        <HowLong frequency={frequency} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                        {
                            frequency === 'regular' &&  <AlternativeDays isAlternative={isAlternative} setAlternative={setAlternative} selectedDaysOfWeek={selectedDaysOfWeek} setSelectedDaysOfWeek={setSelectedDaysOfWeek}/>
                        }
                        <View style={{...CreateStyles.doseAndTimeContainer, marginBottom: 5}}>
                            <Text style={CreateStyles.title}>Dosage & Time</Text>
                            <TouchableOpacity >
                                <Icon style={CreateStyles.icon} name="plus" size={22} color={colors.gray3} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={CreateStyles.scrollContainer}>
                            { reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} idx={idx} />)}
                            {/*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*/}
                            {/*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*/}
                        </ScrollView>
                        <Alarm setIsAlarm={setIsAlarm} isAlarm={isAlarm} />
                    </View>
                }
                {/*<View style={{...CreateStyles.createContainer, marginTop: 10}}>*/}
                {/*    <HowLong frequency={frequency} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />*/}
                {/*    {*/}
                {/*        frequency === 'regular' &&  <AlternativeDays isAlternative={isAlternative} setAlternative={setAlternative} selectedDaysOfWeek={selectedDaysOfWeek} setSelectedDaysOfWeek={setSelectedDaysOfWeek}/>*/}
                {/*    }*/}
                {/*    <View style={{...CreateStyles.doseAndTimeContainer, marginBottom: 5}}>*/}
                {/*        <Text style={CreateStyles.title}>Dosage & Time</Text>*/}
                {/*        <TouchableOpacity >*/}
                {/*            <Icon style={CreateStyles.icon} name="plus" size={22} color={colors.gray3} />*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*    <ScrollView style={CreateStyles.scrollContainer}>*/}
                {/*        { reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} idx={idx} />)}*/}
                {/*        /!*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*!/*/}
                {/*        /!*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*!/*/}
                {/*    </ScrollView>*/}
                {/*    <Alarm setIsAlarm={setIsAlarm} isAlarm={isAlarm} />*/}
                {/*</View>*/}
            </View>
            <View style={CreateStyles.buttonContainer}>
                <ButtonCustom buttonText={'Done'} onPress={handleAddMedication} />
            </View>
        </View>
    );
};

export default CreateMedScreen;
