import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CreateStyles} from "../../components/MedsComponents/createPill/createStyles";
import {FormStyles} from "../../styles/Styles";
import {auth} from "../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import MainStatistics from "../../components/StatisticsComponent/MainStatistics";
import {getReminders} from "../../services/collections";
import TopOfTakenMeds from "../../components/StatisticsComponent/TopOfTakenMeds";
import {useTranslation} from "react-i18next";

function StatisticsScreen() {
    const { t } = useTranslation();
    const today = moment().startOf('day');
    const monthAgo = moment().subtract(1, 'month').startOf('day');
    const [startDate, setStartDate] = useState(monthAgo);
    const [endDate, setEndDate] = useState(today);
    const [medications, setMedications] = useState([]);
    const [remindersInRange, setRemindersInRange] = useState([]);
    const isFocused = useIsFocused();
    const [showContent, setShowContent] = useState(false);
    const [selectedRange, setSelectedRange] = useState('month');


    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 400);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const medications = await getReminders(auth.currentUser);
                setMedications(medications);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const reminders = getRemindersInRange(medications, startDate, endDate);
        setRemindersInRange(reminders);
    }, [medications, startDate, endDate]);

    const getRemindersInRange = (medications, startDate, endDate) => {
        const remindersInRange = [];
        medications.forEach(medication => {
            medication.reminders.forEach(reminder => {
                const reminderDate = moment.unix(reminder.timestamp.seconds);
                if (reminderDate.isBetween(startDate, endDate, null, '[]')) {
                    remindersInRange.push(reminder);
                }
            });
        });
        return remindersInRange;
    }

    const handleSelectRange = (range) => {
        let newStartDate;
        if (range === 'week') {
            setSelectedRange('week');
            newStartDate = moment().subtract(1, 'week').startOf('day');
        } else if (range === 'year') {
            setSelectedRange('year');
            newStartDate = moment().subtract(1, 'year').startOf('day');
        } else {
            setSelectedRange('month');
            newStartDate = moment().subtract(1, 'month').startOf('day');
        }
        setStartDate(newStartDate);
        setEndDate(moment().startOf('day'));
    };

    return (
        <View style={styles.container}>
            { showContent &&
                <View style={styles.statsWrapper}>
                    <View style={CreateStyles.header}>
                        <Text style={FormStyles.title}>{t('progress')}</Text>
                    </View>
                    <View style={CreateStyles.chooseTimeRange}>
                        <TouchableOpacity style={[CreateStyles.buttonTimeRange,  selectedRange === "week" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                            onPress={() => handleSelectRange("week")}>
                            <Text style={[CreateStyles.textBtn, selectedRange === "week" && CreateStyles.activeText]}>{t('weekBtn')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[CreateStyles.buttonTimeRange, selectedRange === "month" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                            onPress={() => handleSelectRange("month")}>
                            <Text style={[CreateStyles.textBtn, selectedRange === "month" && CreateStyles.activeText]}>{t('monthBtn')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[CreateStyles.buttonTimeRange, selectedRange === "year" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                            onPress={() => handleSelectRange("year")}>
                            <Text style={[CreateStyles.textBtn, selectedRange === "year" && CreateStyles.activeText]}>{t('yearBtn')}</Text>
                        </TouchableOpacity>
                    </View>
                    <MainStatistics remindersInRange={remindersInRange}/>
                    <View style={{marginBottom: 10}} />
                    <TopOfTakenMeds remindersInRange={remindersInRange}/>
                </View>
            }
        </View>
    );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    statsWrapper: {
        flex: 1,
        paddingTop: 42,
        paddingHorizontal: 15,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    // chooseTimeRange:{
    //     height: 55,
    //     width: '100%',
    //     backgroundColor: colors.lightBlue,
    //     marginBottom: 15,
    //     borderRadius: 15,
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    // },
    // buttonTimeRange: {
    //     height: 40,
    //     width: '30%',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 12,
    // },
    // activeButton:{
    //     backgroundColor: colors.white,
    // },
    // notActiveButton:{
    //     backgroundColor: colors.lightBlue,
    // },
    // activeText:{
    //     fontWeight: '600',
    // },
    // textBtn: {
    //     color: colors.black,
    // },
});
