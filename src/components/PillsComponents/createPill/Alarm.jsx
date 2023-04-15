import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";
import {CreateStyles} from "./createStyles";

const Alarm = ({isAlarm, setIsAlarm}) => {
    return (
        <View style={CreateStyles.alternativeContainer}>
            <TouchableOpacity
                style={isAlarm ? CreateStyles.squareComplete : CreateStyles.square}
                onPress={() => setIsAlarm(!isAlarm)}
            >
                <View>
                    {isAlarm ? <Icon name="check" size={23} color="white" /> : null}
                </View>
            </TouchableOpacity>
            <Text style={CreateStyles.title}>Alarm</Text>
        </View>
    );
};

export default Alarm;
//
// const CreateStyles = StyleSheet.create({
//     alternativeContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     square: {
//         width: 25,
//         height: 25,
//         borderWidth: 1,
//         borderColor: colors.primary,
//         opacity: 0.8,
//         borderRadius: 7,
//         marginRight: 10,
//     },
//     squareComplete: {
//         width: 25,
//         height: 25,
//         backgroundColor: colors.primary,
//         opacity: 0.8,
//         borderRadius: 7,
//         marginRight: 10,
//         alignItems: 'center',
//     },
//     title:{
//         fontSize: 15,
//     },
// })
