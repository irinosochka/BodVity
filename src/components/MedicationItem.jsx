import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from "../styles/Styles";
import moment from "moment";
import {
    getMedicationByID,
    UpdateMedicationForUser,
    UpdateMedicationReminderForUser, deleteOneReminder, deleteReminders
} from "../services/collections";
import {auth} from "../../firebase";
import {ReminderInfoModal} from "./PillsComponents/ReminderInfoModal";
import {DeleteReminderModal} from "./PillsComponents/DeleteReminderModal";

function MedicationItem({navigation, reminder}) {

    const [medicationCompleted, setMedicationCompleted] = useState(reminder.isConfirmed);
    const [isShowReminderInfo, setShowReminderInfo ] = useState(false);
    const [isShowDeleteModal, setShowDeleteModal ] = useState(false);
    const [medication, setMedication] = useState(getMedicationByID(auth.currentUser.uid, reminder.medicationId));

    useEffect(() => {
        const fetchData = async () => {
            const newMedication = await getMedicationByID(auth.currentUser.uid, reminder.medicationId);
            setMedication(newMedication);
        }
        fetchData().catch(console.error)
    },[])

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

    const handleDeleteOneReminder = async () => {
        await deleteOneReminder(auth.currentUser.uid, reminder.medicationId, reminder.id, reminder.notificationId);
        setShowDeleteModal(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', key: Date.now() }],
        });
    }

    const handleDeleteAllReminders = async () => {
        await deleteReminders(auth.currentUser.uid, reminder.medicationId, reminder.createdAt);
        setShowDeleteModal(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', key: Date.now() }],
        });
    }

    return (
        <>
        <TouchableOpacity onPress={() => setShowReminderInfo(!isShowReminderInfo)} style={[styles.container, medicationCompleted ? {backgroundColor: colors.primary} : {backgroundColor: colors.lightBlue}]} >
            <View style={styles.item}>
                <View style={styles.timeWrapper}>
                    <Text
                        style={[styles.txtPillTitle, medicationCompleted ? {color: colors.white} : {color: colors.black}]}
                    >
                        {moment.unix(reminder.timestamp).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.pillInfoWrapper}>
                    <Text style={[styles.txtPillTitle, medicationCompleted ? {color: colors.white} : {color: colors.black}]}>
                        {medication.title}
                    </Text>
                    {
                        parseInt(reminder.quantity) > 1 ? <Text style={[styles.txtPillInfo, medicationCompleted ? {color: colors.white} : {color: colors.black}]}
                            >{reminder.quantity} pills </Text>
                            :
                            <Text style={[styles.txtPillInfo, medicationCompleted ? {color: colors.white} : {color: colors.black}]}
                            >{reminder.quantity} pill</Text>
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
            {
                isShowReminderInfo &&

                <ReminderInfoModal
                    isShowReminderInfo={isShowReminderInfo}
                    setIsShowReminderInfo={setShowReminderInfo}
                    medication={medication}
                    reminder={reminder}
                    handleComplete={handleComplete}
                    isCompleted={medicationCompleted}
                    setShowDeleteModal={setShowDeleteModal}
                />
            }
            {
                isShowDeleteModal &&

                <DeleteReminderModal
                    isShowDeleteModal={isShowDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    handleDeleteOneReminder={handleDeleteOneReminder}
                    handleDeleteAllReminders={handleDeleteAllReminders}
                />
            }
        </>
    );
}

export default MedicationItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        //backgroundColor: colors.lightBlue,
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
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: colors.primary,
        opacity: 0.8,
        borderRadius: 15,
        marginRight: 15,
    },
    squareComplete: {
        width: 30,
        height: 30,
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
        backgroundColor: colors.gray,
    }
});
