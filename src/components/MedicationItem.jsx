import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from "../styles/Styles";
import moment from "moment";
import {
    getMedicationByID,
    retrieveMedicationsForUser,
    UpdateMedicationForUser,
    UpdateMedicationReminderForUser
} from "../services/collections";
import {auth} from "../../firebase";
import {ReminderInfoModal} from "./PillsComponents/ReminderInfoModal";


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
        width: 23,
        height: 23,
        borderWidth: 1,
        borderColor: colors.primary,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
    },
    squareComplete: {
        width: 23,
        height: 23,
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

    const medicationId = reminder.medicationId;
    const [medicationCompleted, setMedicationCompleted] = useState(reminder.isConfirmed);
    const [isShowReminderInfo, setIsShowReminderInfo ] = useState(false);
    const [medication, setMedication] = useState(getMedicationByID(auth.currentUser.uid, medicationId));

    useEffect(() => {
        const fetchData = async () => {
            const newMed = await getMedicationByID(auth.currentUser.uid, medicationId);
            setMedication(newMed)
        }
        fetchData()
            .catch(console.error)
    }, []);

    const [startDate, setStartDate] = useState(medication.startDate)

    const handleComplete = async () => {
        return medicationCompleted ? medIncomplete() : medComplete()
    }

    const medComplete = async () => {
        await UpdateMedicationReminderForUser(auth.currentUser.uid, reminder.medicationId, reminder.id, {
            isConfirmed: true,
            isMissed: false
        })
        await UpdateMedicationForUser(auth.currentUser.uid, reminder.medicationId, {
            pillsInStock: medication.pillsInStock-=reminder.quantity,
        })
        setMedicationCompleted(true);
    }

    const medIncomplete = async () => {
        await UpdateMedicationReminderForUser(auth.currentUser.uid, reminder.medicationId, reminder.id, {
            isConfirmed: false,
            isMissed: true
        })
        await UpdateMedicationForUser(auth.currentUser.uid, reminder.medicationId, {
            pillsInStock: medication.pillsInStock+=reminder.quantity
        })
        setMedicationCompleted(false);
    }

    return (
        <>
        <TouchableOpacity onPress={() => setIsShowReminderInfo(!isShowReminderInfo)} style={styles.container}>
            <View style={styles.item}>
                {/*{console.log(medication.startDate)}*/}
                <View style={styles.timeWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {moment.unix(reminder.timestamp).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.pillInfoWrapper}>
                    <Text style={styles.txtPillTitle}>
                        {medication.title}
                    </Text>
                    {
                        parseInt(reminder.quantity) > 1 ? <Text style={styles.txtPillInfo}>{reminder.quantity} pills </Text>
                            :
                            <Text style={styles.txtPillInfo}>{reminder.quantity} pill</Text>
                    }
                </View>
                <TouchableOpacity
                    style={medicationCompleted ? styles.squareComplete : styles.square}
                    onPress={handleComplete}
                >
                    <View>
                        {medicationCompleted ? <Icon name="check" size={23} color="white" /> : null}
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

            <ReminderInfoModal
                isShowReminderInfo={isShowReminderInfo}
                setIsShowReminderInfo={setIsShowReminderInfo}
                medication={medication} reminder={reminder}
                handleComplete={handleComplete}
                isCompleted={medicationCompleted}
                title={medication.title}
                startDate={startDate}
                endDate={medication.endDate}
            />
        </>
    );
}

export default MedicationItem;
