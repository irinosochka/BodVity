import {
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import React from 'react';
import {DeleteMedicationForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import MedicationItem from "./MedicationItem";

const styles = StyleSheet.create({
    items: {
        marginTop: 10,
    }
});

function MedicationOfDay({navigation, medicationsOfDay, setMedicationsOfDay}) {


    const deleteReminder = async (docID, index) => {
        const itemsCopy = [...medicationsOfDay];
        await DeleteMedicationForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setMedicationsOfDay(itemsCopy);
    };

    const sortedMedicationsOfDay = medicationsOfDay.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <ScrollView style={styles.items}>
            {
                sortedMedicationsOfDay.map((medItem, index) => (
                    <TouchableOpacity
                        key={medItem.id}
                    >
                        <MedicationItem
                            navigation={navigation}
                            reminder={medItem}
                            deleteAction={() => deleteReminder(medItem.id, index)}
                        />
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default MedicationOfDay;
