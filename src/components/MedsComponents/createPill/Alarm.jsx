import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import {CreateStyles} from "./createStyles";

const Alarm = ({isAlarm, setIsAlarm}) => {

    return (
        <View style={{marginBottom: 10}}>
            <View style={CreateStyles.alternativeContainer}>
                <TouchableOpacity
                    style={isAlarm ? CreateStyles.squareComplete : CreateStyles.square}
                    onPress={() => setIsAlarm(!isAlarm)}
                >
                    <View>
                        {isAlarm ? <Icon name="check" size={23} color="white" /> : null}
                    </View>
                </TouchableOpacity>
                <Text style={CreateStyles.checkText}>Alarm</Text>
            </View>
        </View>
    );
};

export default Alarm;
