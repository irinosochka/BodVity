import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import moment from "moment";
import React, {useState} from "react";
import {CreateStyles} from "../MedsComponents/createPill/createStyles";
import {UpdateMedicationForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import {useTranslation} from "react-i18next";
import {serverTimestamp} from "firebase/firestore";

export function StockItemModal({isShowMedInfo, setIsShowMedInfo, medication}) {
    const { t } = useTranslation();
    const [title, setTitle] = useState(medication.title);
    const [errorTitle, setErrorTitle] = useState(false);

    const handleChangeAndClose = async() => {
        if(title.length === 0){
            setErrorTitle(true);
        }else{
            await UpdateMedicationForUser(auth.currentUser.uid, medication.id, {
                title: title,
                updatedAt: serverTimestamp(),
            })
            setIsShowMedInfo(!isShowMedInfo);
        }
    }

    return (
        <Modal transparent={true} visible={isShowMedInfo} animationType='fade'>
            <TouchableOpacity style={styles.modalBackground} onPress={() => setIsShowMedInfo(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{t('editMedication')}</Text>
                        <View style={styles.modalMedInfo}>
                            <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput, width: '90%'} : {...CreateStyles.inputContainer, width: '90%'}}>
                                <View style={styles.inputWithButton}>
                                    <TextInput style={styles.input}
                                               placeholder={t('exampleMed')}
                                               onChangeText={(text) => {
                                                   setTitle(text);
                                                   if (text.length > 0) {
                                                       setErrorTitle(false);
                                                   }
                                               }}
                                               value={title}
                                    />
                                    <TouchableOpacity style={styles.btnSave} onPress={handleChangeAndClose}>
                                        <Text style={{color: colors.white}}>{t('saveBtn')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.icon}>
                                        <Text style={styles.iconText}>{t('start')}:</Text>
                                    </View>
                                    <Text style={styles.modalText}>{moment.unix(medication.createdAt.seconds).format('DD.MM.YY')}</Text>
                                </View>
                                <View style={styles.itemContainer}>
                                    <View style={styles.icon}>
                                        <Text style={styles.iconText}>{t('update')}:</Text>
                                    </View>
                                    <Text style={styles.modalText}>{moment.unix(medication.updatedAt.seconds).format('DD.MM.YY')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'white',
        borderRadius: 14,
        paddingVertical: 20,
    },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        height: 30,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightBlue,
        borderRadius: 5,
    },
    iconText: {
        color: colors.gray2
    },
    modalText: {
        fontSize: 16,
        marginLeft: 7,
    },
    input:{
        fontSize: 15,
        color: colors.gray3,
        width: '80%',
        height: 45,
        backgroundColor: colors.lightBlue,
        borderBottomLeftRadius: 14,
        borderTopLeftRadius: 14,
        paddingLeft: 10,
    },
    inputWithButton: {
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
    },
    btnSave: {
        width: '35%',
        height: 49,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 14,
        borderTopRightRadius: 14,
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        marginBottom: 12,
        color: colors.black,
        textAlign: 'center',
        fontWeight: '500',
    },
})
