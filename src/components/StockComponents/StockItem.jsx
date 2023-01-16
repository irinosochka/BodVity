import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from "../../styles/Styles";
import {StockItemModal} from "./StockItemModal";
import Icon from "react-native-vector-icons/Feather";
import {AddToStockModal} from "./AddToStockModal";
import {UpdateMedicationForUser} from "../../services/collections";
import {auth} from "../../../firebase";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightBlue,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    quantityTxt: {
        paddingRight: 10,
        color: colors.gray2
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        paddingLeft: 5,
        marginRight: 10,
        width: 30,
    }
});

function StockItem({medication}) {
    const [isShowMedInfo, setIsShowMedInfo ] = useState(false);
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [medInStock, setMedInStock] = useState(parseInt(medication.pillsInStock))
    const [quantityToAdd, setQuantityToAdd] = useState();

    const handleSave = async() => {
        let number = parseInt(quantityToAdd);
        const docID = medication.id;
        setMedInStock(medInStock + number);
        UpdateMedicationForUser(auth.currentUser.uid, docID, {
            pillsInStock: medication.pillsInStock+=number,
        }).catch(console.error);
    }

    return (
        <>
            <TouchableOpacity style={styles.container}>
                <Text>{medication.title}</Text>
                <View style={styles.quantityContainer}>
                    {
                        medication.pillsInStock > 1 ? <Text style={styles.quantityTxt}>{medInStock} meds </Text>
                            :
                            <Text style={styles.quantityTxt}>{medInStock} med</Text>
                    }
                    <TouchableOpacity onPress={() => setIsShowAddModal(!isShowAddModal)}>
                        <Icon name="plus" size={30} color= {colors.primary} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <StockItemModal isShowMedInfo={isShowMedInfo} setIsShowMedInfo={setIsShowMedInfo} medication={medication}/>
            <AddToStockModal setIsShowAddModal={setIsShowAddModal} isShowAddModal={isShowAddModal} quantityToAdd={quantityToAdd} setQuantityToAdd={setQuantityToAdd} handleSave={handleSave} />
        </>
    );
}

export default StockItem;
