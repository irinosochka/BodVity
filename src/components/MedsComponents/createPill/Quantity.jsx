import React, {useState} from "react";
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";
import {AddToStockModal} from "../../StockComponents/AddToStockModal";
import {CreateStyles} from "./createStyles";

const Quantity = ({ medication, pillsInStock, setPillsInStock, errorStock, setErrorStock }) => {
    const [isShowAddModal, setIsShowAddModal] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
                           keyboardType='number-pad'
                           value={pillsInStock}
                />
            }
        </View>
        </TouchableWithoutFeedback>
    );
};

export default Quantity;
