import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React from "react";

export function AddToStockModal({isShowAddModal, setIsShowAddModal, quantityToAdd, setQuantityToAdd, handleSave}) {

    const handleSaveAndClose = async() => {
        if(!isNaN(Number(quantityToAdd)) && parseInt(quantityToAdd) !== 0 && quantityToAdd.length !== 0)
            handleSave();
        setQuantityToAdd('');
        setIsShowAddModal(!isShowAddModal);
    }

    return (
        <Modal transparent={true} visible={isShowAddModal} animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>How medications you want to add? </Text>
                    <View style={styles.inputWithButton}>
                        <TextInput style={styles.input}
                                   placeholder='Ex: 10'
                                   onChangeText={setQuantityToAdd}
                                   value={quantityToAdd}
                        />
                        <TouchableOpacity style={styles.btnSave} onPress={handleSaveAndClose}>
                            <Text>Save</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        position: 'absolute',
        top: '40%',
        width: '90%',
        height: '15%',
        backgroundColor: 'white',
        borderRadius: 14,
    },
    title: {
        fontSize: 17,
        marginBottom: 12,
    },
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 290,
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
    }
})
