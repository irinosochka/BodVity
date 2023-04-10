import {
    Text, View,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {auth, db} from '../../../firebase';
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../../styles/Styles";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import MedicationOfDay from "../../components/PillsComponents/MedicationOfDay";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pillsWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 20,
        height: '95%',
    },
    journalText: {
        paddingHorizontal: 20,
        fontWeight: '700',
        fontSize: 14
    }
});

function CalendarComponent() {
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState([])

    useEffect(() => {
        setSelectedDate(new Date());
        const fetchData = async () => {
            if (isFocused) {
                await getRemind(auth.currentUser)
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

    const medicationOfDay = medications.map(medication => medication.reminders)
        .flat(1).filter(medItem =>
            (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === moment(selectedDate).format('DD-MMM-YYYY')));


    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{type: 'sequence', duration: 20}}
                daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                style={{height: 90, display: 'flex'}}
                dateNumberStyle={{color: colors.black, fontSize: 18, fontWeight: '400' }}
                dateNameStyle={{color: colors.black, fontSize: 9}}
                highlightDateNumberStyle={{color: colors.primary, fontSize: 20, fontWeight: '600'}}
                highlightDateNameStyle={{color: colors.primary, fontSize: 9}}
                onDateSelected={(date)=>setSelectedDate(date)}
                scrollable
                calendarHeaderStyle={{color: colors.gray3, alignSelf: 'flex-end', paddingRight: 20, fontWeight: '400', fontSize: 14}}
                selectedDate={selectedDate}
            />

            <Text style={styles.journalText}>Upcoming Doses</Text>
            {
                medicationOfDay.length > 0 ?

                    <View style={styles.pillsWrapper}>
                        <MedicationOfDay medicationOfDay={medicationOfDay}/>
                    </View>

                    :

                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <Text>You have no medication!</Text>
                    </View>
            }
        </View>
    );
}

export default CalendarComponent;
