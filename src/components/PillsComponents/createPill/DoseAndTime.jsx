import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import {CreateStyles} from "./createStyles";

const DoseAndTime = ({reminders, setReminders, reminder}) => {
    const [numTimeContainers, setNumTimeContainers] = useState(1);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(reminder);
    const [quantity, setQuantity] = useState(2)

    const getTime = (item) => {
        const h = item.hour;
        const m = item.minute;
        const str = (
            (h < 10 ? '0' : '') +
            h.toString() +
            ':' +
            (m < 10 ? '0' : '') +
            m.toString()
        );
        return str;
    }


    const addTimeContainer = () => {
        setNumTimeContainers(numTimeContainers + 1);
    };

    const handleConfirm = (day) => {
        setTime( prevTime => ({
            ...prevTime,
            hour: day.getHours(),
            minute: day.getMinutes()
        }))

        setDatePickerVisibility(false);
    };

    const minusQuantity = () => {
        if(quantity === 1)
            setQuantity(quantity)
        else{
            setQuantity(quantity-1)
        }
    }

    // const timeContainers = [];
    // for (let i = 0; i < numTimeContainers; i++) {
    //     timeContainers.push(
    //         <View key={i} style={CreateStyles.timeContainerRegular}>
    //             {/* Add content of timeContainerRegular here */}
    //         </View>
    //     );
    // }

    return (
        <View>
            {/*<View style={[CreateStyles.doseAndTimeContainer, { marginBottom: 5 }]}>*/}
            {/*    <Text style={CreateStyles.title}>Plan</Text>*/}
            {/*    <TouchableOpacity onPress={addTimeContainer}>*/}
            {/*        <Icon style={CreateStyles.icon} name="plus" size={25} color={colors.gray3} />*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            {/*{timeContainers}*/}
            <View style={CreateStyles.doseAndTimeContainer}>
                <View style={CreateStyles.timeContainerRegular}>
                    <Text>{getTime(time)}</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Icon name="clock" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode={'time'}
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
                <View style={CreateStyles.timeContainerRegular}>
                    <TouchableOpacity onPress={() => minusQuantity()}>
                        <Icon name="minus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    {
                        parseInt(quantity) > 1 ? <Text>
                            {quantity} pills </Text>
                            :
                            <Text>{quantity} pill</Text>
                    }
                    <TouchableOpacity onPress={() => setQuantity(quantity+1)}>
                        <Icon name="plus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default DoseAndTime;
//
// const CreateStyles = StyleSheet.create({
//     doseAndTimeContainer:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     timeContainerRegular:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: 180,
//         height: 48,
//         marginBottom: 15,
//         backgroundColor: colors.lightBlue,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//     },
//     timeContainerOneTime:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         height: 48,
//         marginBottom: 15,
//         backgroundColor: colors.lightBlue,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//     },
//     title:{
//         fontSize: 15,
//         marginBottom: 5,
//     },
// })
