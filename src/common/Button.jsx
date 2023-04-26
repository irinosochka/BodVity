import {
    Text, TouchableOpacity
} from 'react-native';
import React from 'react';
import {colors, FormStyles} from "../styles/Styles";

export function ButtonCustom({onPress, buttonText, isShadow = false, width = 319}) {
    return (
        <>
            {
                <TouchableOpacity
                    style={isShadow ? {...FormStyles.btn, width: width, ...FormStyles.btnShadow,} : {...FormStyles.btn, width: width}}
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

