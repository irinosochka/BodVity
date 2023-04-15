import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import {CreateStyles} from "./createStyles";

const HowLong = ({frequency, startDate, setStartDate, endDate, setEndDate}) => {

    const [startDateString, setStartDateString] = useState('Today');
    const [howLong, setHowLong] = useState(0)
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [error, setError] = useState(false);
    const today = new Date();

    const handleConfirmStartDate = (day) => {
        setStartDate(day)
        setStartDatePickerVisibility(false);
        setStringStart(day);
    };

    // const hideEndDatePicker = () => {
    //     setEndDate(null)
    //     setEndDatePickerVisibility(false);
    // };

    const handleConfirmEndDate = (day) => {
        if(day < startDate){
            setEndDate(startDate)
            howLongDays(startDate);
            setError(true);
            console.log("not correct end date")
        }
        else {
            setError(false);
            setEndDate(day)
            howLongDays(day);
        }
        setEndDatePickerVisibility(false);
    };

    const handleConfirmDateForOneTimeMed = (day) => {
        setStartDate(day);
        setEndDate(day);
        setStartDatePickerVisibility(false);
        setStringStart(day);
    }

    const setStringStart = (day) => {
        if (day.toDateString() === today.toDateString()) {
            setStartDateString("Today");
        } else if (day.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
            setStartDateString("Yesterday");
        } else if (day.toDateString() === new Date(today.getTime() + 86400000).toDateString()) {
            setStartDateString("Tomorrow");
        } else {
            setStartDateString(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
    }

    const howLongDays = (day) => {
        const first = moment(startDate);
        const second = moment(day);
        const diffInDays = second.diff(first, 'days');
        setHowLong(diffInDays);
    }

    return (
        <>
            {
                frequency==='regular' &&
                <View style={CreateStyles.howLongContainer}>
                    <View>
                        <Text style={CreateStyles.title}>From</Text>
                        <View style={CreateStyles.timeContainerRegular}>
                            <Text>{startDateString}</Text>
                            <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
                                <Icon name="calendar" size={20} color= {colors.gray3}/>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={isStartDatePickerVisible}
                                mode={'date'}
                                onCancel={() => setStartDatePickerVisibility(false)}
                                onConfirm={handleConfirmStartDate}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={CreateStyles.title}>How long</Text>
                        <View style={CreateStyles.timeContainerRegular}>
                            <Text>{howLong}{howLong > 1 ? ' days' : ' day'}</Text>
                            <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)}>
                                {error ?
                                    <Icon name="calendar" size={20} color= {colors.accent}/>
                                    :
                                    <Icon name="calendar" size={20} color= {colors.gray3}/>
                                }
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={isEndDatePickerVisible}
                                mode={'date'}
                                onCancel={() => setEndDatePickerVisibility(false)}
                                onConfirm={handleConfirmEndDate}
                            />
                        </View>
                    </View>
                </View>

            }
            {
                frequency === 'one-time' &&
                <View>
                    <Text style={CreateStyles.title}>Date</Text>
                    <View style={CreateStyles.timeContainerOneTime}>
                        <Text>{startDateString}</Text>
                        <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
                            <Icon name="calendar" size={20} color= {colors.gray3}/>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={isStartDatePickerVisible}
                            mode={'date'}
                            onCancel={() => setStartDatePickerVisibility(false)}
                            onConfirm={handleConfirmDateForOneTimeMed}
                        />
                    </View>
                </View>
            }

        </>
    );
};

export default HowLong;
//
// const CreateStyles = StyleSheet.create({
//     howLongContainer:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     timeContainerRegular:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: 180,
//         height: 48,
//         marginBottom: 15,
//         backgroundColor: colors.lightBlue,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//     },
//     timeContainerOneTime:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         height: 48,
//         marginBottom: 15,
//         backgroundColor: colors.lightBlue,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//     },
//     title:{
//         fontSize: 15,
//         marginBottom: 5,
//     },
// })
