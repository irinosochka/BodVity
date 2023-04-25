import {
    Text, TouchableOpacity
} from 'react-native';
import React from 'react';
import {colors, FormStyles} from "../styles/Styles";

export function ButtonCustom({onPress, buttonText, isShadow = false}) {
    return (
        <>
            {
                <TouchableOpacity
                    style={isShadow ? {...FormStyles.btn, ...FormStyles.btnShadow} : FormStyles.btn}
                    onPress={onPress}
                >
                    <Text
                        style={isShadow ? {...FormStyles.btnText, color: colors.black} : FormStyles.btnText}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            }
        </>
    );
}

