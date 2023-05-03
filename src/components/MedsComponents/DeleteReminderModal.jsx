import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React from "react";
import Icon from 'react-native-vector-icons/Feather';
import {useTranslation} from "react-i18next";

export function DeleteReminderModal({isShowDeleteModal, setShowDeleteModal, handleDeleteOneReminder, handleDeleteAllReminders}) {
    const { t } = useTranslation();

    return (
        <Modal transparent={true} visible={isShowDeleteModal} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowDeleteModal(!isShowDeleteModal)}>
                            <Icon name="x" size={40} color= {colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalMedInfo}>
                        <Text style={styles.questionText}>{t('deleteQuestion')}</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={handleDeleteAllReminders}>
                            <Text style={styles.btnText}>{t('deleteAllBtn')}</Text>
                        </TouchableOpacity>
                        <View style={styles.verticalLine}></View>
                        <TouchableOpacity style={styles.btn} onPress={handleDeleteOneReminder}>
                            <Text style={styles.btnText}>{t('deleteOneBtn')}</Text>
                        </TouchableOpacity>
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
        height: '22%',
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
        justifyContent: 'center',
        alignItems: 'center',
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
    btnText: {
        color: colors.white,
        fontWeight: '500',
        fontSize: 17
    },
    btn: {
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
    },
    btnContainer: {
        height: 70,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        backgroundColor: colors.primary,
        alignItems: 'center',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    verticalLine: {
        height: '80%',
        width: 1,
        backgroundColor: colors.white,
    },
    questionText: {
        fontSize: 17,
    },
})
