import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React from "react";
import Icon from 'react-native-vector-icons/Feather';
import moment from "moment";

export function MissedMedsModal({isShowMissedMedsModal, setIsShowMissedMedsModal, reminders, title}) {
    const tableHead = ['Date', 'Time', 'Quantity'];
    const tableData = reminders.map(({ timestamp, quantity }) => [new Date(timestamp.seconds * 1000).toLocaleDateString(), new Date(timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}), quantity]);

    return (
        <Modal transparent={true} visible={isShowMissedMedsModal} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsShowMissedMedsModal(!isShowMissedMedsModal)}>
                            <Icon name="x" size={40} color= {colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalMedInfo}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <ScrollView>
                            {/*<Table>*/}
                            {/*    <Row*/}
                            {/*        data={tableHead}*/}
                            {/*        flexArr={[1, 2, 1]}*/}
                            {/*        style={styles.head}*/}
                            {/*        textStyle={styles.text}*/}
                            {/*    />*/}
                            {/*    <Rows*/}
                            {/*        data={tableData}*/}
                            {/*        flexArr={[1, 1, 1]}*/}
                            {/*        style={styles.row}*/}
                            {/*        textStyle={styles.text}*/}
                            {/*    />*/}
                            {/*</Table>*/}
                            <View style={styles.container}>
                                <View style={styles.headerRow}>
                                    <Text style={styles.headerText}>Date</Text>
                                    <Text style={styles.headerText}>Time</Text>
                                    <Text style={styles.headerText}>Quantity</Text>
                                </View>
                                {reminders.map((reminder) => (
                                    <View style={styles.row}>
                                        <Text style={styles.rowText}>{new Date(reminder.timestamp.seconds * 1000).toLocaleDateString()}</Text>
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
        height: '28%',
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
    // container: {
    //     flex: 1,
    //     padding: 15,
    //     backgroundColor: colors.white,
    // },
    // head: {
    //     height: 35,
    //     backgroundColor: colors.lightBlue,
    //     borderRadius: 15
    // },
    // title: {
    //     flex: 1,
    // },
    // row: {
    //     height: 28
    // },
    // text: {
    //     textAlign: 'center'
    // },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: -10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    rowText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
})

