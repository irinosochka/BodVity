import {
    Text, View,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {auth} from '../../../firebase';
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../../styles/Styles";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import MedicationOfDay from "../../components/MedsComponents/MedicationOfDay";
import {getReminders} from "../../services/collections";

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
        fontWeight: '700',
        fontSize: 14
    }
});

function CalendarComponent({navigation}) {
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState([])

    useEffect(() => {
        setSelectedDate(new Date());
        const fetchData = async () => {
            if (isFocused) {
                const medications = await getReminders(auth.currentUser);
                setMedications(medications);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

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
            {
                medicationOfDay.length > 0 ?

                    <View style={styles.pillsWrapper}>
                        <Text style={styles.journalText}>Upcoming Doses</Text>
                        <MedicationOfDay medicationOfDay={medicationOfDay} navigation={navigation}/>
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
