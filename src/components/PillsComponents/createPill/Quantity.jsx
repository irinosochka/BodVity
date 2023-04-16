import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";
import {AddToStockModal} from "../../StockComponents/AddToStockModal";
import {CreateStyles} from "./createStyles";

const Quantity = ({ medication, pillsInStock, setPillsInStock, errorStock, setErrorStock }) => {
    const [isShowAddModal, setIsShowAddModal] = useState(false);

    return (
        <View style={errorStock ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : CreateStyles.inputContainer}>
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
                           onChangeText={(text) => {
                               setPillsInStock(text);
                               if (text.length > 0) {
                                   setErrorStock(false);
                               }
                           }}
                           keyboardType='numeric'
                           value={pillsInStock}
                />
            }
        </View>
    );
};

export default Quantity;
