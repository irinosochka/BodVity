import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import {StockItemModal} from "./StockItemModal";
import Icon from "react-native-vector-icons/Feather";
import {AddToStockModal} from "./AddToStockModal";
import {useIsFocused} from "@react-navigation/native";

function StockItem(props) {
    const { medication, deleteAction } = props;
    const [isShowMedInfo, setIsShowMedInfo ] = useState(false);
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => setIsShowMedInfo(!isShowMedInfo)}>
                <Text style={{color: colors.black}}>{medication.title}</Text>
                <View style={styles.quantityContainer}>
                    {
                        medication.pillsInStock > 1 ? <Text style={styles.quantityTxt}>{medication.pillsInStock} meds </Text>
                            :
                            <Text style={styles.quantityTxt}>{medication.pillsInStock} med</Text>
                    }
                    <TouchableOpacity onPress={() => setIsShowAddModal(!isShowAddModal)}>
                        <Icon name="plus" size={30} color= {colors.primary} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteAction}>
                        <Icon name="trash" size={23} color= {colors.primary} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <StockItemModal isShowMedInfo={isShowMedInfo} setIsShowMedInfo={setIsShowMedInfo} medication={medication}/>
            <AddToStockModal setIsShowAddModal={setIsShowAddModal} isShowAddModal={isShowAddModal} medication={medication}/>
        </>
    );
}

export default StockItem;

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
