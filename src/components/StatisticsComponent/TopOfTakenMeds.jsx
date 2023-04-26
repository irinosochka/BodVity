import {
    ScrollView,
    StyleSheet, Text, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import TakenMedItem from "./TakenMedItem";
import {
    getTakenMedicationIdsWithReminders
} from "../../services/collections";


function TopOfTakenMeds({remindersInRange}) {
    const [sortedMedicationIds, setSortedMedicationIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sortedMedication = await getTakenMedicationIdsWithReminders(remindersInRange);
            setSortedMedicationIds(sortedMedication);
        }
        fetchData().catch(console.error)
    },[remindersInRange])

    const OneTimeMedItems = sortedMedicationIds.map((medItem, idx) => (
        <TakenMedItem medID={medItem.id} reminders={medItem.reminders} key={idx} idx={idx} count={medItem.count} />
    ));

    return (
        <View style={styles.shadowForContainer}>
            <View style={styles.statsContainer}>
                <Text style={styles.headerTitle}>Top of your taken medications:</Text>
                <ScrollView>
                    {sortedMedicationIds.length > 0 ? OneTimeMedItems : <Text style={{color: colors.black}}>No medication found.</Text>}
                </ScrollView>
            </View>
        </View>
    );
}


export default TopOfTakenMeds;


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
