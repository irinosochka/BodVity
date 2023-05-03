import React, {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import {CreateStyles} from "./createStyles";
import {useTranslation} from "react-i18next";
import moment from "moment";

const DoseAndTime = ({reminders, setReminders, reminder, idx}) => {
    const { t } = useTranslation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(reminder);

    useEffect(() => {
        setReminders((prevReminders) => {
            const updatedReminders = [...prevReminders];
            updatedReminders[idx] = time;
            return updatedReminders;
        });
    }, [time]);


    const now = new Date();

    const getTime = (item) => {
        const time = moment({ hour: item.hour, minute: item.minute });
        return time.format('HH:mm');
    }

    const saveReminder = () => {
        setReminders( reminders.map( (reminder, index) => (index === idx ? time : reminder)))
    }

    const handleConfirm = (day) => {
        setTime( prevTime => ({
            ...prevTime,
            hour: day.getHours(),
            minute: day.getMinutes()
        }))
        saveReminder();
        setDatePickerVisibility(false);
    };

    const minusQuantity = () => {
        if(time.quantity !== 1){
            setTime( prevTime => ({...prevTime, quantity: prevTime.quantity - 1}))
        }
        else{
            //nothing
        }
    }

    const plusQuantity = () => {
        setTime( prevTime => ({...prevTime, quantity: prevTime.quantity + 1}))
    }

    return (
        <View>
            <View style={CreateStyles.doseAndTimeContainer}>
                <View style={[CreateStyles.timeContainerRegular, {width: '49%'}]}>
                    <TouchableOpacity onPress={() => minusQuantity()}>
                        <Icon name="minus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    {
                        parseInt(time.quantity) > 1 ? <Text>
                            {time.quantity} {t('medicationShortPlural')} </Text>
                            :
                            <Text style={CreateStyles.timeContainerText}>{time.quantity} {t('medicationShortSingle')}</Text>
                    }
                    <TouchableOpacity onPress={() => plusQuantity()}>
                        <Icon name="plus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                </View>
                <View style={[CreateStyles.timeContainerRegular, {width: '49%'}]}>
                    <Text style={CreateStyles.timeContainerText}>{getTime(time)}</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Icon name="clock" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode={'time'}
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                        date={new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.hour, time.minute, 0, 0)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoseAndTime;
