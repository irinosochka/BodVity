import {
    StyleSheet, Text, TouchableOpacity
} from 'react-native';
import React from 'react';
import {colors} from "../styles/Styles";

export function ButtonCustom({onPress, buttonText}) {
    return (
        <TouchableOpacity style={styles.btnDone} onPress={onPress}>
            <Text style={styles.txtBtnDone}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnDone:{
        width: 319,
        height: 56,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    txtBtnDone:{
        fontSize: 17,
        color:'#FFF'
    },
})



