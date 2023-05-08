import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import {CreateStyles} from "../createPill/createStyles";
import {useTranslation} from "react-i18next";

const DateAndTime = ({ dateAppointment, setDateAppointment }) => {
    const { t } = useTranslation();

    const setStringDate = (day) => {
        const formatter = new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'});
        const parts = formatter.formatToParts(day);
        return `${parts[0].value}.${parts[2].value}.${parts[4].value}`;
    };

    const [startDateString, setStartDateString] = useState(setStringDate(dateAppointment));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleConfirmDate = (day) => {
        const selected = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            dateAppointment.getHours(),
            dateAppointment.getMinutes()
        );
        setDateAppointment(selected);
        setDatePickerVisibility(false);
        let sel =  setStringDate(selected);
        setStartDateString(sel);
    };

    const handleConfirmTime = (selectedTime) => {
        const selected = new Date(
            dateAppointment.getFullYear(),
            dateAppointment.getMonth(),
            dateAppointment.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes()
        );
        setDateAppointment(selected);
        setTimePickerVisibility(false);
    };

    const getTime = (item) => {
        const h = item.getHours();
        const m = item.getMinutes();
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    return (
        <View style={CreateStyles.howLongContainer}>
            <View style={{ width: '49%' }}>
                <Text style={CreateStyles.title}>{t('date')}</Text>
                <View style={CreateStyles.timeContainerRegular}>
                    <Text style={CreateStyles.timeContainerText}>{startDateString}</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Icon name="calendar" size={20} color={colors.gray3} />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={dateAppointment}
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            </View>
            <View style={{ width: '49%' }}>
                <Text style={CreateStyles.title}>{t('time')}</Text>
                <View style={CreateStyles.timeContainerRegular}>
                    <Text style={CreateStyles.timeContainerText}>{getTime(dateAppointment)}</Text>
                    <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
                        <Icon name="clock" size={20} color={colors.gray3} />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isTimePickerVisible}
                        mode="time"
                        date={dateAppointment}
                        onConfirm={handleConfirmTime}
                        onCancel={() => setTimePickerVisibility(false)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DateAndTime;
