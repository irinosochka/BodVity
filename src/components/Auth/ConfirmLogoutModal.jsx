import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React from "react";
import {useTranslation} from "react-i18next";

export function ConfirmLogoutModal({isShowConfirmLogoutModal, setShowConfirmLogoutModal, handleSignOut}) {
    const { t } = useTranslation();

    const handleLogout = () => {
        handleSignOut();
        setShowConfirmLogoutModal(false);
    }

    return (
        <Modal transparent={true} visible={isShowConfirmLogoutModal} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalMedInfo}>
                        <Text style={styles.questionText}>{t('confirmLogout')}</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => setShowConfirmLogoutModal(false)}>
                            <Text style={styles.btnText}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <View style={styles.verticalLine}></View>
                        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                            <Text style={styles.btnText}>{t('logout')}</Text>
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
        top: '35%',
        width: '90%',
        height: '18%',
        backgroundColor: 'white',
        borderRadius: 14,
    },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: '500',
        color: colors.black
    },
})
