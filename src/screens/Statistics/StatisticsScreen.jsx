import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainStatistics from "../../components/StatisticsComponent/MainStatistics";
import {CreateStyles} from "../../components/MedsComponents/createPill/createStyles";
import {colors, FormStyles} from "../../styles/Styles";
import {auth, db} from "../../../firebase";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";

function StatisticsScreen() {
    const today = moment().startOf('day');
    const monthAgo = moment().subtract(1, 'month').startOf('day');
    const [startDate, setStartDate] = useState(monthAgo);
    const [endDate, setEndDate] = useState(today);
    const [medications, setMedications] = useState([]);
    const isFocused = useIsFocused();
    const [showContent, setShowContent] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState(true);
    const [selectedYear, setSelectedYear] = useState(false);
    const [remindersInRange, setRemindersInRange] = useState([]);
    const [completedReminders, setCompletedReminders] = useState([]);
    const [missedReminders, setMissedReminders] = useState([]);
    const [percentCompleted, setPercentCompleted] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 400);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                await getRemind(auth.currentUser)
                await getRemindersInRange(medications, startDate, endDate);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);


    const getRemind = async (user) => {
        setMedications(prev => [])

        const medicationsRef = collection(db, 'users', user.uid, 'medications')
        const medicationsDocs = await getDocs(medicationsRef)

        medicationsDocs.docs.map( (medication) => {
            const getReminders = async () => {
                const remindersRef = query(collection(db, 'users', user.uid, 'medications', medication.id, 'reminders'), orderBy('timestamp'))
                const remindersDocs = await getDocs(remindersRef)

                return {...medication.data(), id: medication.id, reminders: remindersDocs.docs.map(reminder => ({...reminder.data(), id: reminder.id, timestamp: reminder.data().timestamp}))}
            }

            getReminders()
                .then( medication => {
                    setMedications(prev => [...prev, medication])
                }).catch(e => console.log(e))
        })
    }

    const getRemindersInRange = async (medications, startDate, endDate) => {
        const reminders = [];
        medications.forEach(medication => {
            medication.reminders.forEach(reminder => {
                const reminderDate = moment.unix(reminder.timestamp.seconds);
                if (reminderDate.isBetween(startDate, endDate, null, '[]')) {
                    reminders.push(reminder);
                }
            });
        });
        setRemindersInRange(reminders);
        const completed = reminders.filter(medItem => medItem.isConfirmed === true)
        setCompletedReminders(completed);
        const missed = reminders.filter(medItem => medItem.isConfirmed === false);
        setMissedReminders(missed);
        if (reminders.length > 0) {
            setPercentCompleted(completed.length / reminders.length * 100);
        }else {
            setPercentCompleted(0);
        }
    }

    const handleSelectWeek = async () => {
        setSelectedYear(false);
        setSelectedMonths(false);
        setSelectedWeek(true);
        const weekAgo = moment().subtract(1, 'week').startOf('day');
        setEndDate(weekAgo);
        await getRemindersInRange(medications, startDate, weekAgo);
        console.log(remindersInRange)
    }

    const handleSelectMonths = async () => {
        setSelectedYear(false);
        setSelectedMonths(true);
        setSelectedWeek(false);
        const monthAgo = moment().subtract(1, 'month').startOf('day');
        setEndDate(monthAgo);
        await getRemindersInRange(medications, startDate, monthAgo);
        console.log(remindersInRange)
    }

    const handleSelectYear = async () => {
        setSelectedYear(true);
        setSelectedMonths(false);
        setSelectedWeek(false);
        const yearAgo = moment().subtract(1, 'year').startOf('day');
        setEndDate(yearAgo);
        await getRemindersInRange(medications, startDate, yearAgo);
        console.log(remindersInRange)
    }

    return (
        <View style={styles.container}>
            { showContent &&
                <View style={styles.statsWrapper}>
                    <View style={CreateStyles.header}>
                        <Text style={FormStyles.title}>Progress</Text>
                    </View>
                    <View style={styles.chooseTimeRange}>
                        <TouchableOpacity style={[styles.buttonTimeRange, selectedWeek ? styles.activeButton : styles.notActiveButton]} onPress={handleSelectWeek}>
                            <Text>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonTimeRange, selectedMonths ? styles.activeButton : styles.notActiveButton]} onPress={handleSelectMonths}>
                            <Text>Months</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonTimeRange, selectedYear ? styles.activeButton : styles.notActiveButton]} onPress={handleSelectYear}>
                            <Text>Year</Text>
                        </TouchableOpacity>
                    </View>
                    <MainStatistics reminders={remindersInRange} completedReminders={completedReminders} missedReminders={missedReminders} percentCompleted={percentCompleted}/>
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
        // paddingHorizontal: 10,
        paddingHorizontal: 15,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    chooseTimeRange:{
        height: 55,
        width: '100%',
        backgroundColor: colors.lightBlue,
        marginBottom: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonTimeRange: {
        height: 40,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    activeButton:{
        backgroundColor: colors.white,
    },
    notActiveButton:{
        backgroundColor: colors.lightBlue,
    },
});
