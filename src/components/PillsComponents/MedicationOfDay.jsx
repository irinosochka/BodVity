import {
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import React from 'react';
import {colors} from "../../styles/Styles";
import MedicationItem from "../MedicationItem";

const styles = StyleSheet.create({
    pillsWrapper: {
        flex: 1,
        paddingTop: 80,
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
});

function MedicationOfDay({ medicationOfDay, howManyCompleted, setHowManyCompleted }) {

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

    return (
        <ScrollView style={styles.items}>
            {
                medicationOfDay.map(medItem => (
                    <TouchableOpacity
                        key={medItem.id}
                    >
                        <MedicationItem reminder={medItem} setHowManyCompleted={setHowManyCompleted} howManyCompleted={howManyCompleted} />
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default MedicationOfDay;
