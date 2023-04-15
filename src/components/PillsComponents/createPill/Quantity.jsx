import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";
import {AddToStockModal} from "../../StockComponents/AddToStockModal";
import {CreateStyles} from "./createStyles";

const Quantity = ({ medication, pillsInStock, setPillsInStock }) => {
    const [isShowAddModal, setIsShowAddModal] = useState(false);

    return (
        <View style={CreateStyles.inputContainer}>
            {medication ?
                <>
                    <Text style={CreateStyles.input}>{medication.pillsInStock}</Text>
                    <TouchableOpacity onPress={() => setIsShowAddModal(!isShowAddModal)}>
                        <Icon name="plus" size={25} color= {colors.gray3}/>
                    </TouchableOpacity>
                    <AddToStockModal setIsShowAddModal={setIsShowAddModal} isShowAddModal={isShowAddModal} medication={medication}/>
                </>
                :
                <TextInput style={CreateStyles.input}
                           placeholder='Ex: 10'
                           onChangeText={setPillsInStock}
                           keyboardType='numeric'
                           value={pillsInStock}
                />
            }
        </View>
    );
};

export default Quantity;

// const CreateStyles = StyleSheet.create({
//     inputContainer:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         height: 48,
//         marginBottom: 15,
//         backgroundColor: colors.lightBlue,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//     },
//     input:{
//         width: '90%',
//         fontSize: 15,
//         color: colors.gray3,
//     },
// })
