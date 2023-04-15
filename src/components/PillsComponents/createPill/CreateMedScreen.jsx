import React, {useEffect, useState} from "react";
import {BackHandler, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import {createMedication} from "./functionsForCreateMeds";
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
    const [endDate, setEndDate] = useState(null);
    const [isAlternative, setAlternative] = useState(false);
    const [reminders, setReminders] = useState([
        {
            hour: 9,
            minute: 0,
            quantity: 1,
        }
    ])
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

    const handleAddMedication = (event:React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if(title.length !== 0 && pillsInStock.length !== 0  ){
            createMedication('one-time', title, pillsInStock, startDate, startDate, reminders);
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

    Scheduling();

    return (
        <View style={CreateStyles.container}>
            <View style={CreateStyles.header}>
                <Text style={FormStyles.title}>Add new plan</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="x" size={27} color= {colors.black}/>
                </TouchableOpacity>
            </View>
            {/*<View style={CreateStyles.dividerStyle} />*/}
            <View style={CreateStyles.shadowForContainer}>
                <View style={CreateStyles.createContainer}>
                    <Text style={CreateStyles.title}>Medicine name</Text>
                    <View style={CreateStyles.zIndex}>
                        <Title medicationItems={medicationItems} onSelectItem={handleMedicationSelect} title={title} setTitle={setTitle}/>
                    </View>
                    <Text style={{...CreateStyles.title, marginBottom: 5}}>Quantity in stock</Text>
                    {selectedMedication?.title === title
                        ?
                        <Quantity medication={selectedMedication} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock} />
                        :
                        <Quantity medication={false} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock}/>
                    }
                </View>
                <View style={{...CreateStyles.createContainer, marginTop: 10}}>
                    <HowLong frequency={frequency} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                    {/*<CreateHowLong frequency={'one-time'} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />*/}
                    {
                        frequency === 'regular' &&  <AlternativeDays isAlternative={isAlternative} setAlternative={setAlternative} />
                    }
                    <View style={{...CreateStyles.doseAndTimeContainer, marginBottom: 5}}>
                        <Text style={CreateStyles.title}>Dosage & Time</Text>
                        <TouchableOpacity >
                            <Icon style={CreateStyles.icon} name="plus" size={22} color={colors.gray3} />
                        </TouchableOpacity>
                    </View>
                <ScrollView style={CreateStyles.scrollContainer}>
                    { reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}
                    {/*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*/}
                    {/*{ reminders.map( (reminder, idx) => <DoseAndTime key={idx} reminders={reminders} setReminders={setReminders} reminder={reminder} />)}*/}
                </ScrollView>
                    <Alarm setIsAlarm={setIsAlarm} isAlarm={isAlarm} />
                </View>
            </View>
            <View style={CreateStyles.buttonContainer}>
                <View style={CreateStyles.button}>
                    <ButtonCustom buttonText={'Done'}  />
                </View>
            </View>
        </View>
    );
};

export default CreateMedScreen;
//
// const CreateStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         paddingTop: 60,
//         paddingHorizontal: 20,
//     },
//     header:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     zIndex:{
//         zIndex: 99
//     },
//     highTitle: {
//         fontWeight: '700',
//         fontSize: 18
//     },
//     title:{
//         fontSize: 15,
//         marginBottom: 5,
//     },
//     doseAndTimeContainer:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     icon:{
//         marginRight: 5
//     },
//     button:{
//         alignItems: 'center',
//         bottom: 40,
//         paddingVertical: 10,
//     },
//     alternativeContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     square: {
//         width: 25,
//         height: 25,
//         borderWidth: 1,
//         borderColor: colors.primary,
//         opacity: 0.8,
//         borderRadius: 7,
//         marginRight: 10,
//     },
//     squareComplete: {
//         width: 25,
//         height: 25,
//         backgroundColor: colors.primary,
//         opacity: 0.8,
//         borderRadius: 7,
//         marginRight: 10,
//         alignItems: 'center',
//     },
//     weekContainer: {
//         marginTop: 10,
//         flexDirection: 'row',
//         flexWrap: 'nowrap',
//         justifyContent: 'space-between',
//     },
//     dayOfWeekContainer: {
//         borderRadius: 7,
//         width: '12%',
//         height: 70,
//         backgroundColor: colors.lightBlue,
//         paddingHorizontal: 7,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     dayOfWeekContainerSelected: {
//         borderRadius: 7,
//         width: '12%',
//         height: 70,
//         backgroundColor: colors.primary,
//         paddingHorizontal: 7,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     dayOfWeekTitle: {
//         color: colors.black
//     },
//     dayOfWeekTitleSelected: {
//         color: colors.white
//     },
//     iconDayOfWeek: {
//         marginTop: 5,
//     },
// })
