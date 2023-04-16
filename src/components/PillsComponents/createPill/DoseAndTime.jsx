import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import {CreateStyles} from "./createStyles";

const DoseAndTime = ({reminders, setReminders, reminder, idx}) => {
    const [numTimeContainers, setNumTimeContainers] = useState(1);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(reminder);
    // const [quantity, setQuantity] = useState(1);

    const now = new Date();

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

        setReminders( reminders.map( (reminder, index) => (index === idx ? time : reminder)))
        setDatePickerVisibility(false);
    };

    const minusQuantity = () => {
        if(time.quantity !== 1){
            setTime( prevTime => ({...prevTime, quantity: prevTime.quantity - 1}))
            setReminders( reminders.map( (reminder, index) => (index === idx ? time : reminder)))
        }
        else{

        }
    }

    const plusQuantity = () => {
        setTime( prevTime => ({...prevTime, quantity: prevTime.quantity + 1}))
        setReminders( reminders.map( (reminder, index) => (index === idx ? time : reminder)))
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
                    <TouchableOpacity onPress={() => minusQuantity()}>
                        <Icon name="minus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                    {
                        parseInt(time.quantity) > 1 ? <Text>
                            {time.quantity} pills </Text>
                            :
                            <Text>{time.quantity} pill</Text>
                    }
                    <TouchableOpacity onPress={() => plusQuantity()}>
                        <Icon name="plus" size={20} color= {colors.gray3}/>
                    </TouchableOpacity>
                </View>
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
                        date={new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.hour, time.minute, 0, 0)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DoseAndTime;
