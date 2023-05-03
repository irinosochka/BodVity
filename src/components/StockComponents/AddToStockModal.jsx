import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React, {useState} from "react";
import {UpdateMedicationForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import {useTranslation} from "react-i18next";

export function AddToStockModal({isShowAddModal, setIsShowAddModal, medication}) {
    const { t } = useTranslation();

    const [medInStock, setMedInStock] = useState(parseInt(medication.pillsInStock))
    const [quantityToAdd, setQuantityToAdd] = useState('');

    const handleSave = async() => {
        let number = parseInt(quantityToAdd);
        const docID = medication.id;
        setMedInStock(medInStock + number);
        UpdateMedicationForUser(auth.currentUser.uid, docID, {
            pillsInStock: medication.pillsInStock+=number,
        }).catch(console.error);
    }

    const handleSaveAndClose = async() => {
        if(!isNaN(Number(quantityToAdd)) && parseInt(quantityToAdd) !== 0 && quantityToAdd.length !== 0)
            await handleSave();
        setQuantityToAdd('');
        setIsShowAddModal(!isShowAddModal);
    }

    return (
        <Modal transparent={true} visible={isShowAddModal} animationType='fade'>
            <TouchableOpacity style={styles.modalBackground} onPress={() => setIsShowAddModal(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{t('howManyMedsToAdd')}</Text>
                        <View style={styles.inputWithButton}>
                            <TextInput style={styles.input}
                                       placeholder={t('exampleShort') + ': 10'}
                                       onChangeText={setQuantityToAdd}
                                       value={quantityToAdd}
                            />
                            <TouchableOpacity style={styles.btnSave} onPress={handleSaveAndClose}>
                                <Text style={{color: colors.white}}>{t('saveBtn')}</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        position: 'absolute',
        top: '40%',
        width: '90%',
        height: '15%',
        backgroundColor: 'white',
        borderRadius: 14,
        marginHorizontal: 15,
    },
    title: {
        fontSize: 17,
        marginBottom: 12,
        color: colors.black,
        fontWeight: '500',
    },
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 275,
        height: 48,
        backgroundColor: '#F8F8F6',
        borderBottomLeftRadius: 14,
        borderTopLeftRadius: 14,
        paddingLeft: 10,
    },
    inputWithButton: {
        flexDirection: 'row',
        alignItems: "center",
    },
    btnSave: {
        width: 65,
        height: 48,
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
})
