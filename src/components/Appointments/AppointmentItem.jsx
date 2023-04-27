import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import moment from "moment";
import {colors} from "../../styles/Styles";
import {UpdateAppointmentForUser} from "../../services/collections";
import {auth} from "../../../firebase";

function AppointmentItem(props) {
    const { appointment, navigation, deleteAction } = props;
    const [appointmentCompleted, setAppointmentCompleted] = useState(appointment.isConfirmed);


    const handleComplete = async () => {
        return appointmentCompleted ? appointIncomplete() : appointComplete()
    }

    const appointComplete = async () => {
        await UpdateAppointmentForUser(auth.currentUser.uid, appointment.id, {
            isConfirmed: true,
        })
        setAppointmentCompleted(true);
    }

    const appointIncomplete = async () => {
        await UpdateAppointmentForUser(auth.currentUser.uid, appointment.id, {
            isConfirmed: false,
        })
        setAppointmentCompleted(false);
    }

    // const handleDeleteOneReminder = async () => {
    //     await deleteOneReminder(auth.currentUser.uid, reminder.medicationId, reminder.id, reminder.notificationId);
    //     setShowDeleteModal(false);
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'Home', key: Date.now() }],
    //     });
    //     deleteAction();
    // }

    return (
        <>
            <TouchableOpacity style={[styles.container, appointmentCompleted ? {backgroundColor: colors.primary} : {backgroundColor: colors.lightBlue}]} >
                <View style={styles.item}>
                    <View style={styles.timeWrapper}>
                        <Text
                            style={[styles.txtPillTitle, appointmentCompleted ? {color: colors.white} : {color: colors.black}]}
                        >
                            {moment.unix(appointment.appointmentDate).format('HH:mm')}
                        </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={styles.pillInfoWrapper}>
                        <Text style={[styles.txtPillTitle, appointmentCompleted ? {color: colors.white} : {color: colors.black}]}>
                            {appointment.title}
                        </Text>
                        {
                            appointment.note !== null &&
                            <Text style={[styles.txtPillInfo, appointmentCompleted ? {color: colors.white} : {color: colors.black}]}
                            >{appointment.note}</Text>
                        }

                    </View>
                    <TouchableOpacity
                        style={appointmentCompleted ? styles.squareComplete : styles.square}
                        onPress={handleComplete}
                    >
                        <View>
                            {appointmentCompleted ? <Icon name="check" size={23} color="white" /> : null}
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default AppointmentItem;


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
