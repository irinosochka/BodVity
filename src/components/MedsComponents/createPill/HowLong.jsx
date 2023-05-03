import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import {CreateStyles} from "./createStyles";
import {useTranslation} from "react-i18next";

const HowLong = ({frequency, startDate, setStartDate, endDate, setEndDate}) => {
    const { t } = useTranslation();

    const [startDateString, setStartDateString] = useState(t('today'));
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
            setStartDateString(t('today'));
        } else if (day.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
            setStartDateString(t('yesterday'));
        } else if (day.toDateString() === new Date(today.getTime() + 86400000).toDateString()) {
            setStartDateString(t('tomorrow'));
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
            <View style={CreateStyles.howLongContainer}>
            {
                frequency==='regular' &&
                <>
                    <View style={{width: '49%'}}>
                        <Text style={CreateStyles.title}>{t('from')}</Text>
                        <View style={CreateStyles.timeContainerRegular}>
                            <Text style={CreateStyles.timeContainerText}>{startDateString}</Text>
                            <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)}>
                                <Icon name="calendar" size={20} color= {colors.gray3}/>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={isStartDatePickerVisible}
                                mode={'date'}
                                onCancel={() => setStartDatePickerVisibility(false)}
                                onConfirm={handleConfirmStartDate}
                                date={startDate}
                            />
                        </View>
                    </View>
                    <View style={{width: '49%'}}>
                        <Text style={CreateStyles.title}>{t('howLong')}</Text>
                        <View style={CreateStyles.timeContainerRegular}>
                            <Text>{howLong + ' '}{howLong !== 1 ? t('dayPlural') : t('daySingle')}</Text>
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
                                date={endDate}
                            />
                        </View>
                    </View>
                </>
            }
            {
                frequency === 'one-time' &&
                <View style={{width: '100%'}}>
                    <Text style={CreateStyles.title}>{t('date')}</Text>
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
                            date={startDate}
                        />
                    </View>
                </View>
            }
            </View>

    );
};

export default HowLong;
