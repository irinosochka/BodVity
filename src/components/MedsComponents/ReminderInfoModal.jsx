import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import moment from "moment";
import React from "react";
import {useTranslation} from "react-i18next";

export function ReminderInfoModal({isShowReminderInfo, setIsShowReminderInfo, reminder, handleComplete, isCompleted, medication, setShowDeleteModal}) {
    const { t } = useTranslation();

    const handleCompleteAndClose = async() => {
        handleComplete();
        setIsShowReminderInfo(!isShowReminderInfo);
    }

    const showDelete = () => {
        setIsShowReminderInfo(false);
        setShowDeleteModal(true);
    }

    return (
        <Modal transparent={true} visible={isShowReminderInfo} animationType='fade'>
            <TouchableOpacity style={styles.modalBackground} onPress={() => setIsShowReminderInfo(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.titleText}>{medication.title}</Text>
                        </View>
                        <View style={styles.modalMedInfo}>
                            <View style={styles.rowContainer}>
                                <View>
                                    <View style={styles.itemContainer}>
                                        <View style={styles.icon}>
                                            <Text style={styles.iconText}>{t('timeSmall')}:</Text>
                                        </View>
                                        <Text style={styles.modalText}>{moment.unix(reminder.timestamp).format('HH:mm')}</Text>
                                    </View>

                                    <View style={styles.itemContainer}>
                                        <View style={styles.icon}>
                                            <Text style={styles.iconText}>{t('start')}:</Text>
                                        </View>
                                        <Text style={styles.modalText}>{moment.unix(reminder.startDate.seconds).format('D MMM YY')}</Text>
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.itemContainer}>
                                        <View style={styles.icon}>
                                            <Text style={styles.iconText}>{t('dose')}:</Text>
                                        </View>
                                        {
                                            parseInt(reminder.quantity) > 1 ? <Text style={styles.modalText}>{reminder.quantity} {t('medicationShortPlural')}</Text>
                                                :
                                                <Text style={styles.modalText}>{reminder.quantity} {t('medicationShortSingle')}</Text>
                                        }
                                    </View>

                                    <View style={styles.itemContainer}>
                                        <View style={styles.icon}>
                                            <Text style={styles.iconText}>{t('end')}:</Text>
                                        </View>
                                        <Text style={styles.modalText}>{moment.unix(reminder.endDate.seconds).format('D MMM YY')}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={handleCompleteAndClose}>
                                {
                                    isCompleted ?  <Text style={styles.btnText}>{t('incompleteBtn')}</Text>
                                        :
                                        <Text style={styles.btnText}>{t('completeBtn')}</Text>
                                }
                            </TouchableOpacity>
                            <View style={styles.verticalLine}></View>
                            <TouchableOpacity style={styles.btn} onPress={showDelete}>
                                <Text style={styles.btnText}>{'  '} {t('deleteBtn')} {'  '}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'white',
        borderRadius: 14,
    },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        color: colors.black,
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
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBlue,
        borderRadius: 5,
    },
    iconText: {
        color: colors.gray2,
    },
    modalText: {
        fontSize: 17,
        marginLeft: 7,
        color: colors.black,
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
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalLine: {
        height: '80%',
        width: 1,
        backgroundColor: colors.white,
    }
})
