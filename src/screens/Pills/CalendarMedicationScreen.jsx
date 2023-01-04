import { Text, View,
    StyleSheet
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
    writeTodoWrapper: {
        position: 'absolute',
        padding: 10,
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 'auto',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 2.5,
    },
    newPill: {
        backgroundColor: colors.lightBlue,
        width: '50%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        marginBottom: 30,
        bottom: 0,
        marginLeft: 100,
    },
    calendar: {
        paddingTop: 25,
    }
});

function CalendarMedicationScreen() {
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
            <View style={styles.calendar}>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 20}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 110, paddingTop: 20}}
                    // calendarHeaderStyle={{color: colors.primary}}
                    dateNumberStyle={{color: colors.black, fontSize: 22}}
                    dateNameStyle={{color: colors.black}}
                    highlightDateNumberStyle={{color: colors.primary, fontSize: 20}}
                    highlightDateNameStyle={{color: colors.primary, fontSize: 9}}
                    onDateSelected={(date)=>setSelectedDate(date)}
                    scrollable
                    selectedDate={selectedDate}
                />
            </View>
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
            {/*<View style={styles.pillsWrapper}>*/}
            {/*    <MedicationOfDay medicationOfDay={medicationOfDay}/>*/}
            {/*</View>*/}
            {/*{ medications.length > 0 && isHavingRemindersToday() ?*/}
            {/*    <FlatList*/}
            {/*        showsVerticalScrollIndicator={true}*/}
            {/*        data={medications}*/}
            {/*        keyExtractor={(item) => item.id}*/}
            {/*        renderItem={({ item })  => {*/}
            {/*            return item.reminders*/}
            {/*                .filter(reminder => { return reminder.timestamp.toLocaleDateString() === selectedDate.toLocaleDateString()})*/}
            {/*                .map(reminder => <MedicationItem reminder={{*/}
            {/*                    ...reminder,*/}
            {/*                    // medicationId: item.id,*/}
            {/*                    title: item.title*/}
            {/*                }} key={reminder.id}/>)*/}
            {/*        }*/}
            {/*        }*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>*/}
            {/*        <Text>You have no medication today!</Text>*/}
            {/*    </View>*/}
            {/*}*/}
        </View>
    );
}

export default CalendarMedicationScreen;
