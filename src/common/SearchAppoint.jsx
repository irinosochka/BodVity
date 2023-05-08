import React, {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {
    DeleteAppointmentForUser,
    retrieveAppointmentsForUser,
} from "../services/collections";
import {auth} from "../../firebase";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../styles/Styles";
import {useTranslation} from "react-i18next";
import StockAppointmentItem from "../components/Appointments/StockAppointmentItem";
import moment from "moment";

function SearchAppoint() {
    const { t } = useTranslation();

    const [title, setTitle] = useState('');

    const [appointmentItems, setAppointmentItems] = useState([]);
    const isFocused = useIsFocused();

    const deleteAppointment = async (docID, index) => {
        const itemsCopy = [...appointmentItems];
        await DeleteAppointmentForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setAppointmentItems(itemsCopy);
    };

    useEffect(() => {
        const fetchData = async () => {
            const newAppointments = await retrieveAppointmentsForUser(auth.currentUser);
            setAppointmentItems(newAppointments);
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);


    const pastAppointments = appointmentItems.filter(item => moment.unix(item.appointmentDate.seconds) < moment());
    const futureAppointments = appointmentItems.filter(item => moment.unix(item.appointmentDate.seconds) >= moment());

    const sortedPastAppointments = pastAppointments.sort((a, b) => b.appointmentDate - a.appointmentDate);
    const sortedFutureAppointments = futureAppointments.sort((a, b) => a.appointmentDate - b.appointmentDate);

    return (
        <>
            <TextInput style={styles.input}
                       placeholder={t('exampleAppointment')}
                       onChangeText={setTitle}
                       value={title}
            />
            {(sortedFutureAppointments.length > 0 || sortedPastAppointments.length > 0)
                ?
                <ScrollView>
                    {sortedFutureAppointments.length > 0 &&
                        <>
                            <Text style={styles.journalText}>{t('upcomingAppointments')}</Text>
                            {sortedFutureAppointments?.filter(unit => {
                                if(title === ''){
                                    return unit;
                                }
                                else if(unit?.title?.toLowerCase().includes(title.toLowerCase())){
                                    return unit;
                                }
                            }).map((unit, index) => {
                                return(
                                    <StockAppointmentItem
                                        appointment={unit}
                                        key={unit.id}
                                        deleteAction={() => deleteAppointment(unit.id, index)}
                                    />
                                )
                            })}
                        </>
                    }

                    {sortedPastAppointments.length > 0 &&
                        <>
                            <Text style={styles.journalText}>{t('pastAppointments')}</Text>
                            {sortedPastAppointments?.filter(unit => {
                                if(title === ''){
                                    return unit;
                                }
                                else if(unit?.title?.toLowerCase().includes(title.toLowerCase())){
                                    return unit;
                                }
                            }).map((unit, index) => {
                                return(
                                    <StockAppointmentItem
                                        appointment={unit}
                                        key={unit.id}
                                        title={t('pastAppointments')}
                                        deleteAction={() => deleteAppointment(unit.id, index)}
                                    />
                                )
                            })}
                        </>
                    }
                </ScrollView>

                :

                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>{t('noAppoint')}</Text>
                </View>
            }
        </>
    )
}

export default SearchAppoint;

const styles = StyleSheet.create({
    input:{
        fontSize: 15,
        color: colors.gray3,
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 14,
        paddingLeft: 10,
    },
    journalText: {
        fontWeight: '700',
        fontSize: 14,
        color: colors.black,
        marginBottom: 5,
    }
})
