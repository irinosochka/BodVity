import {
    Text, View,
    StyleSheet, ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {auth} from '../../../firebase';
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../../styles/Styles";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import MedicationOfDay from "../../components/MedsComponents/MedicationOfDay";
import {getReminders, retrieveAppointmentsForUser} from "../../services/collections";
import AppointmentsOfTheDay from "../Appointments/AppointmentsOfTheDay";
import {useTranslation} from "react-i18next";

function CalendarComponent({navigation}) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [medicationsOfDay, setMedicationsOfDay] = useState([]);
    const [appointmentsOfDay, setAppointmentsOfDay] = useState([]);

    const locale = {
        name: 'lang',
        config: {
            months: t('months').split('_'),
            monthsShort: t('monthsShort').split('_'),
            weekdays: t('weekdays').split('_'),
            weekdaysShort: t('weekdaysShort').split('_'),
            weekdaysMin: t('weekdaysMin').split('_'),
        }
    }

    useEffect(() => {
        setSelectedDate(new Date());
        const fetchData = async () => {
            if (isFocused) {
                const medications = await getReminders(auth.currentUser);
                setMedications(medications);
                const appointments = await retrieveAppointmentsForUser(auth.currentUser);
                setAppointments(appointments);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const appointments = await retrieveAppointmentsForUser(auth.currentUser);
                setAppointments(appointments);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const medicationsOfSelectedDay = medications.map(medication => medication.reminders)
            .flat(1).filter(medItem =>
                (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === moment(selectedDate).format('DD-MMM-YYYY')));
        setMedicationsOfDay(medicationsOfSelectedDay);


        const appointmentsOfSelectedDay = appointments
            .filter(appointItem =>
                (moment.unix(appointItem.appointmentDate.seconds).format('DD-MMM-YYYY') === moment(selectedDate).format('DD-MMM-YYYY')))
            .map(appointItem => appointItem);

        setAppointmentsOfDay(appointmentsOfSelectedDay);

    }, [medications, selectedDate]);

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
                locale={locale}
            />

            {(appointmentsOfDay.length > 0 || medicationsOfDay.length > 0)
                ?

                <ScrollView style={{flex: 1}}>
                    {medicationsOfDay.length > 0 &&
                        <View style={styles.pillsWrapper}>
                            <Text style={styles.journalText}>{t('upcomingDoses')}</Text>
                            <MedicationOfDay medicationsOfDay={medicationsOfDay} setMedicationsOfDay={setMedicationsOfDay} navigation={navigation}/>
                        </View>
                    }
                    {appointmentsOfDay.length > 0 &&
                        <View style={styles.pillsWrapper}>
                            <Text style={styles.journalText}>{t('upcomingAppointments')}</Text>
                            <AppointmentsOfTheDay navigation={navigation} appointmentsOfDay={appointmentsOfDay} setAppointmentsOfDay={setAppointmentsOfDay} />
                        </View>
                    }
                </ScrollView>

                :

                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>{t('noMedAndAppoint')}</Text>
                </View>
            }
        </View>
    );
}

export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pillsWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    journalText: {
        fontWeight: '700',
        fontSize: 14,
        color: colors.black,
    }
});
