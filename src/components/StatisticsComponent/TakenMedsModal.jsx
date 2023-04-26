import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../styles/Styles";
import moment from "moment";
import React from "react";


export function TakenMedsModal({isShowTakenMedsModal, setIsShowTakenMedsModal, reminders, title}) {
    const sortedReminders = reminders.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

    return (
        <Modal transparent={true} visible={isShowTakenMedsModal} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsShowTakenMedsModal(!isShowTakenMedsModal)}>
                            <Icon name="x" size={40} color= {colors.gray} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.modalMedInfo}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerText}>Date</Text>
                            <Text style={styles.headerText}>Time</Text>
                            <Text style={styles.headerText}>Quantity</Text>
                        </View>
                        <ScrollView>
                        <View style={styles.table}>
                            {sortedReminders.map((reminder, index) => (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.rowText}>{moment(reminder.timestamp.seconds * 1000).format('DD.MM.YY')}</Text>
                                    <Text style={styles.rowText}>{moment(reminder.timestamp.seconds * 1000).format('HH:mm')}</Text>
                                    <Text style={styles.rowText}>{reminder.quantity}</Text>
                                </View>
                            ))}
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal : {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContainer : {
        position: 'absolute',
        top: '30%',
        width: '90%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 14,
    },
    modalHeader: {
        height: 43,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: -29,
        color: colors.black,
    },
    table: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 2,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: colors.lightBlue,
        marginTop: -5,
        paddingTop: 5,
        // height: 200,
    },
    headerRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
        backgroundColor: colors.lightBlue,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    headerText: {
        flex: 1,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        color: colors.black,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightBlue,
        paddingVertical: 5,
        height: 30,
        alignItems: 'center',
    },
    rowText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: colors.black,
    },
})

