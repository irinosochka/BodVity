import {
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import React from 'react';
import MedicationItem from "../MedicationItem";

const styles = StyleSheet.create({
    items: {
        marginTop: 10,
        height: '95%',
    }
});

function MedicationOfDay({navigation, medicationOfDay}) {

    // const [allMeds, setAllMeds] = useState(medicationOfDay.length);
    //const [howManyCompleted, setHowManyCompleted] = useState(medicationOfDay.map(medItem => medItem).flat(1).filter(medItem => medItem.isConfirmed).length);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsCompleted(allMeds === howManyCompleted);
    //         console.log(howManyCompleted);
    //     }
    //     fetchData()
    //             .catch(console.error)
    // }, []);

    // const handleDeleteOneReminder = async (reminderId, medicationId, index) => {
    //     const itemsCopy = [...medicationOfDay];
    //     await deleteOneReminder(auth.currentUser.uid, medicationId, reminderId);
    //     itemsCopy.splice(index, 1);
    //     setMedicationsOfDay(itemsCopy);
    // }

    // const deletePill = async (docID, index) => {
    //     const itemsCopy = [...pillItems];
    //     await DeletePillForUser(auth.currentUser.uid, docID);
    //     itemsCopy.splice(index, 1);
    //     setPillItems(itemsCopy);
    // };

    // const completedPill = medicationOfDay.map(medication => medication.reminders).flat(1).filter(medItem => medItem.isConfirmed).length

    // (medications.map(medication => medication.reminders)
    //     .flat(1).filter(medItem =>
    //         (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === today))
    //     .map(med => med.isConfirmed).filter(med => (med === true)).length)

    // const newArray = medicationOfDay.map(medItem => medItem).sort(medicationOfDay.map(medItem => medItem).map(med => med.timestamp.seconds))

    // const mapped = data.map((v, i) => {
    //     return { i, value: someSlowOperation(v) };
    // });

    // const notsorted = medicationOfDay.map(medItem => medItem);
    //
    // const sorted = new Map ([...medicationOfDay.entries()].sort())
    //
    // const rr = medicationOfDay.map(medItem => medItem).map(med => med.timestamp.seconds)
    // const kk = medicationOfDay.map(medItem => medItem).map(med => med.timestamp.seconds)

    const sortedMedicationOfDay = medicationOfDay.sort((a, b) => a.timestamp - b.timestamp);

    return (
        <ScrollView style={styles.items}>
            {
                sortedMedicationOfDay.map(medItem => (
                    <TouchableOpacity
                        key={medItem.id}
                    >
                        <MedicationItem navigation={navigation} reminder={medItem}/>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default MedicationOfDay;
