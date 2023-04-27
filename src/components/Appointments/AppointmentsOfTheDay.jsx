import {
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import React from 'react';
import AppointmentItem from "./AppointmentItem";

function AppointmentsOfTheDay({navigation, appointmentsOfDay, setAppointmentsOfDay}) {

    // const deleteReminder = async (docID, index) => {
    //     const itemsCopy = [...medicationsOfDay];
    //     await DeleteMedicationsForUser(auth.currentUser.uid, docID);
    //     itemsCopy.splice(index, 1);
    //     setMedicationsOfDay(itemsCopy);
    // };

    const sortedAppointmentsOfDay = appointmentsOfDay.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <ScrollView style={styles.items} >
            {
                sortedAppointmentsOfDay.map((appointItem, index) => (
                    <TouchableOpacity
                        key={appointItem.id}
                    >
                        <AppointmentItem
                            navigation={navigation}
                            appointment={appointItem}
                            // deleteAction={() => deleteReminder(medItem.id, index)}
                        />
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default AppointmentsOfTheDay;

const styles = StyleSheet.create({
    items: {
        marginTop: 10,
    }
});
