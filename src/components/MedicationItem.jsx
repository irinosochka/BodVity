import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from "../styles/Styles";
import moment from "moment";
import {retrieveMedicationsForUser, UpdateMedicationReminderForUser} from "../services/collections";
import {auth} from "../../firebase";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightBlue,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    square: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
    },
    squareComplete: {
        width: 20,
        height: 20,
        backgroundColor: colors.primary,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
        alignItems: 'center',
    },
    txtPillTitle: {
        fontWeight: "500",
    },
    pillInfoWrapper: {
        width: "60%",
    },
    txtPillInfo: {
        color: colors.gray2,
        paddingTop: 4,
        fontSize: 12,
    },
    timeWrapper: {

    },
    verticalLine: {
        height: '100%',
        width: 1,
        backgroundColor: colors.gray3,
    }
});

function MedicationItem({reminder}) {

    const [medicationItems, setMedicationItems] = useState([]);

    const med = medicationItems.filter(medItem => medItem.id === reminder.medicationId).map(medication => medication.title).pop()

    const [medicationCompleted, setMedicationCompleted] = useState(reminder.isConfirmed);

    useEffect(() => {
        const fetchData = async () => {
            const newMedication = await retrieveMedicationsForUser(auth.currentUser.uid);
            setMedicationItems(newMedication);
        }
        fetchData()
            .catch(console.error)
    }, []);


    const handleComplete = async () => {
        await UpdateMedicationReminderForUser(auth.currentUser.uid, reminder.medicationId, reminder.id, {
            isConfirmed: !reminder.isConfirmed
        })
        setMedicationCompleted(!medicationCompleted);
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.timeWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {moment.unix(reminder.timestamp).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.pillInfoWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {med}
                    </Text>
                    <Text
                        style={styles.txtPillInfo}
                    >
                        {reminder.quantity} pills
                    </Text>
                </View>
                <TouchableOpacity
                    style={medicationCompleted ? styles.squareComplete : styles.square}
                    onPress={handleComplete}
                >
                    <View>
                        {medicationCompleted ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MedicationItem;
