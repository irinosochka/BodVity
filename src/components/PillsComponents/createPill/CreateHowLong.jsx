import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const CreateHowLong = ({startDate, setStartDate, endDate, setEndDate}) => {

    const [startDateString, setStartDateString] = useState('Today');
    const [howLong, setHowLong] = useState(0)
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const today = new Date();

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleConfirmStartDate = (day) => {
        setStartDate(day)
        setStartDatePickerVisibility(false);
        set(day);
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDate(null)
        setEndDatePickerVisibility(false);
    };

    const handleConfirmEndDate = (day) => {
        // if (day <= startDate) {
        //     //setErrorMessage('Your medication should be ended after the start day.')
        // } else setEndDate(day)

        setEndDate(day)
        howLongDays(day);
        setEndDatePickerVisibility(false);
    };

    const set = (day) => {
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
        <View style={styles.howLongContainer}>
            <View>
                <Text>From</Text>
                <View style={styles.timeContainer}>
                    <Text>{startDateString}</Text>
                    <TouchableOpacity onPress={showStartDatePicker}>
                        <Icon name="calendar" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isStartDatePickerVisible}
                        mode={'date'}
                        onCancel={hideStartDatePicker}
                        onConfirm={handleConfirmStartDate}
                    />
                </View>
            </View>
            <View>
                <Text>How long</Text>
                <View style={styles.timeContainer}>
                    <Text>{howLong}{howLong > 1 ? ' days' : ' day'}</Text>
                    <TouchableOpacity onPress={showEndDatePicker}>
                        <Icon name="calendar" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isEndDatePickerVisible}
                        mode={'date'}
                        onCancel={hideEndDatePicker}
                        onConfirm={handleConfirmEndDate}
                    />
                </View>
            </View>

        </View>
    );
};

export default CreateHowLong;

const styles = StyleSheet.create({
    howLongContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 180,
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 14,
        paddingHorizontal: 10,
    },
})
