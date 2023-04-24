import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CreateStyles} from "../../components/MedsComponents/createPill/createStyles";
import {colors, FormStyles} from "../../styles/Styles";
import {auth, db} from "../../../firebase";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import MainStatistics2 from "../../components/StatisticsComponent/MainStatistics2";

function StatisticsScreen2() {
    const today = moment().startOf('day');
    const monthAgo = moment().subtract(1, 'month').startOf('day');
    const [startDate, setStartDate] = useState(monthAgo);
    const [endDate, setEndDate] = useState(today);
    const [medications, setMedications] = useState([]);
    const isFocused = useIsFocused();
    const [showContent, setShowContent] = useState(false);
    const [reminders, setReminders] = useState([]);

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

    return (
        <View style={styles.container}>
            { showContent &&
                <View style={styles.statsWrapper}>
                    <View style={CreateStyles.header}>
                        <Text style={FormStyles.title}>Progress</Text>
                    </View>
                    {/*<View style={styles.chooseTimeRange}>*/}
                        {/*<TouchableOpacity style={[styles.buttonTimeRange, selectedWeek ? styles.activeButton : styles.notActiveButton]} onPress={handleSelectWeek}>*/}
                        {/*<TouchableOpacity style={[styles.buttonTimeRange]}>*/}
                        {/*    <Text>Week</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={[styles.buttonTimeRange]}>*/}
                        {/*    <Text>Week</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={[styles.buttonTimeRange]}>*/}
                        {/*    <Text>Week</Text>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    <MainStatistics2 medications={medications} startDate={startDate} endDate={endDate}/>
                </View>
            }
        </View>
    );
}

export default StatisticsScreen2;

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
