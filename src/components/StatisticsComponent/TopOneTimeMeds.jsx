import {
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import OneTimeMedItem from "./OneTimeMedItem";
import {getMedicationIdsWithMostOneTimePlans} from "../../services/collections";

// function TopOneTimeMeds({remindersInRange}) {
//     const [sortedMedicationIds, setSortedMedicationIds] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const sortedMedication = await getMedicationIdsWithMostOneTimePlans(remindersInRange);
//             setSortedMedicationIds(sortedMedication);
//         }
//         fetchData().catch(console.error)
//     },[remindersInRange])
//
//     const getMedicationIdsWithMostOneTimePlans = async (medications) => {
//         const medicationsWithOneTimePlans = medications.reduce((accumulator, medication) => {
//             if (medication.plan === 'one-time') {
//                 if (accumulator[medication.id]) {
//                     accumulator[medication.id].count += 1;
//                 } else {
//                     accumulator[medication.id] = {
//                         count: 1,
//                         reminders: []
//                     };
//                 }
//             }
//             return accumulator;
//         }, {});
//
//         remindersInRange.forEach((reminder) => {
//             if (medicationsWithOneTimePlans[reminder.medicationId]) {
//                 if (reminder.plan === 'one-time') {
//                     medicationsWithOneTimePlans[reminder.medicationId].reminders.push(reminder);
//                 }
//             }
//         });
//
//         const sortedMedicationIds = Object.keys(medicationsWithOneTimePlans).sort((a, b) => {
//             return medicationsWithOneTimePlans[b].count - medicationsWithOneTimePlans[a].count;
//         });
//
//         return sortedMedicationIds.map((medicationId) => {
//             return {
//                 id: medicationId,
//                 count: medicationsWithOneTimePlans[medicationId].count,
//                 reminders: medicationsWithOneTimePlans[medicationId].reminders
//             };
//         });
//     };
//
//
//     return (
//         <View style={styles.shadowForContainer}>
//             <View style={styles.statsContainer}>
//                 <Text style={styles.headerTitle}>Top of the most irregular medications:</Text>
//                 {sortedMedicationIds.map(medItem => (
//                     <OneTimeMedItem medID={medItem.id} reminders={medItem.reminders} idx={} />
//                 )) }
//             </View>
//         </View>
//     );
// }

function TopOneTimeMeds({remindersInRange}) {
    const [sortedMedicationIds, setSortedMedicationIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sortedMedication = await getMedicationIdsWithMostOneTimePlans(remindersInRange);
            setSortedMedicationIds(sortedMedication);
        }
        fetchData().catch(console.error)
    },[remindersInRange])

    const OneTimeMedItems = sortedMedicationIds.map((medItem, idx) => (
        <OneTimeMedItem medID={medItem.id} reminders={medItem.reminders} key={idx} idx={idx} count={medItem.count} />
    ));

    return (
        <View style={styles.shadowForContainer}>
            <View style={styles.statsContainer}>
                <Text style={styles.headerTitle}>Top of the most irregular medications:</Text>
                <ScrollView>
                    {sortedMedicationIds.length > 0 ? OneTimeMedItems : <Text style={{color: colors.black}}>No medication found.</Text>}
                </ScrollView>
            </View>
        </View>
    );
}


export default TopOneTimeMeds;


const styles = StyleSheet.create({
    shadowForContainer:{
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    statsContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
        color: colors.black,
    },
});
