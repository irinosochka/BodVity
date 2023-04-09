import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import moment from "moment";
import React from "react";
import Icon from 'react-native-vector-icons/Feather';

export function StockItemModal({isShowMedInfo, setIsShowMedInfo, medication}) {

    // const handleCompleteAndClose = async() => {
    //     // handleComplete();
    //     setIsShowMedInfo(!isShowMedInfo);
    // }

    return (
        <Modal transparent={true} visible={isShowMedInfo} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={{marginTop: 6, marginRight: 15}} onPress={() => setIsShowMedInfo(!isShowMedInfo)}>
                            <Icon name="edit-2" size={27} color= {colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsShowMedInfo(!isShowMedInfo)}>
                            <Icon name="x" size={40} color= {colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalMedInfo}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleText}>{medication.title}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <View>
                                <View style={styles.itemContainer}>
                                    <View style={styles.icon}>
                                        <Text style={styles.iconText}>update:</Text>
                                    </View>
                                    <Text style={styles.modalText}>{moment.unix(medication.updatedAt).format('HH:mm')}</Text>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.icon}>
                                        <Text style={styles.iconText}>start:</Text>
                                    </View>
                                    <Text style={styles.modalText}>{moment.unix(medication.startDate).format('HH:mm')}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContainer: {
        position: 'absolute',
        top: '30%',
        width: '90%',
        height: '30%',
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
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        height: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBlue,
        borderRadius: 5,
    },
    iconText: {
        color: colors.gray2
    },
    modalText: {
        fontSize: 17,
        marginLeft: 7,
    },
})
