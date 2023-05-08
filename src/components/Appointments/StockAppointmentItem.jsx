import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import {EditAppointmentModal} from "./EditAppointmentModal";

function StockAppointmentItem(props) {
    const { appointment, deleteAction } = props;
    const [title, setTitle] = useState(appointment.title);
    const [note, setNote] = useState(appointment.note);
    const [dateAppointment, setDateAppointment] = useState(new Date(moment.unix(appointment.appointmentDate.seconds)))
    const isFocused = useIsFocused();
    const [isShowEditModal, setIsShowEditModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    return (
        <>
            <TouchableOpacity style={[styles.container, appointment.isConfirmed ? {backgroundColor: colors.primary} : {backgroundColor: colors.lightBlue}]}
                              onPress={() => setIsShowEditModal(!isShowEditModal)}
            >
                <View style={styles.item}>
                    <View style={styles.timeWrapper}>
                        <Text
                            style={[styles.txtPillTitle,  { textAlign: 'center', fontSize: 13}, appointment.isConfirmed ? {color: colors.white} : {color: colors.black}]}
                        >
                            {moment(dateAppointment).format('HH:mm')}
                        </Text>
                        <Text
                            style={[styles.txtPillTitle, { textAlign: 'center', paddingTop: 4, fontSize: 13}, appointment.isConfirmed ? {color: colors.white} : {color: colors.black}]}
                        >
                            {moment(dateAppointment).format('DD.MM.YY')}
                        </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={styles.pillInfoWrapper}>
                        <Text style={[styles.txtPillTitle, appointment.isConfirmed ? {color: colors.white} : {color: colors.black}]}>
                            {title}
                        </Text>
                        {
                            appointment.note !== null &&
                            <Text style={[styles.txtPillInfo, appointment.isConfirmed ? {color: colors.white} : {color: colors.black}]}
                            >{note}</Text>
                        }

                    </View>
                    <TouchableOpacity onPress={deleteAction}>
                        <Icon name="trash" size={23} color={appointment.isConfirmed ? colors.white : colors.primary}  style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <EditAppointmentModal isShowEditModal={isShowEditModal} setIsShowEditModal={setIsShowEditModal} appointment={appointment} title={title} note={note} dateAppointment={dateAppointment} setTitle={setTitle} setNote={setNote} setDateAppointment={setDateAppointment} />
            </TouchableOpacity>
        </>
    );
}

export default StockAppointmentItem;

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
    icon: {
        paddingLeft: 5,
        marginRight: 10,
        width: 30,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
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
