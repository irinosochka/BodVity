import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CreateStyles} from "../../components/MedsComponents/createPill/createStyles";
import {colors, FormStyles} from "../../styles/Styles";
import {auth, db} from "../../../firebase";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import MainStatistics from "../../components/StatisticsComponent/MainStatistics";

function StatisticsScreen() {
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
                await getRemind(auth.currentUser);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const reminders = getRemindersInRange(medications, startDate, endDate);
        setRemindersInRange(reminders);
    }, [medications, startDate, endDate]);


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

    const handleSelectRange = async(range) => {
        if(range === 'week'){
            setSelectedRange('week');
            const weekAgo = moment().subtract(1, 'week').startOf('day');
            setStartDate(weekAgo);
        } else if(range === 'month'){
            setSelectedRange('month');
            const monthAgo = moment().subtract(1, 'month').startOf('day');
            setStartDate(monthAgo);
        } else if(range === 'year'){
            setSelectedRange('year');
            const yearAgo = moment().subtract(1, 'year').startOf('day');
            setStartDate(yearAgo);
        }
    }

    return (
        <View style={styles.container}>
            { showContent &&
                <View style={styles.statsWrapper}>
                    <View style={CreateStyles.header}>
                        <Text style={FormStyles.title}>Progress</Text>
                    </View>
                    <View style={styles.chooseTimeRange}>
                        <TouchableOpacity style={[styles.buttonTimeRange,  selectedRange === "week" ? styles.activeButton : styles.notActiveButton,]}
                            onPress={() => handleSelectRange("week")}>
                            <Text style={[selectedRange === "week" && styles.activeText]}>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonTimeRange, selectedRange === "month" ? styles.activeButton : styles.notActiveButton,]}
                            onPress={() => handleSelectRange("month")}>
                            <Text style={[selectedRange === "month" && styles.activeText]}>Months</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonTimeRange, selectedRange === "year" ? styles.activeButton : styles.notActiveButton,]}
                            onPress={() => handleSelectRange("year")}>
                            <Text style={[selectedRange === "year" && styles.activeText]}>Year</Text>
                        </TouchableOpacity>
                    </View>
                    <MainStatistics remindersInRange={remindersInRange}/>
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
    activeText:{
        fontWeight: '600'
    },
    notActiveText:{

    },
});
