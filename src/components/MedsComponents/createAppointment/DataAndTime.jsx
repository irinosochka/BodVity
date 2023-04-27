import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "react-native-modal-datetime-picker";
import {CreateStyles} from "../createPill/createStyles";

// const DateAndTime = ({dateAppointment, setDateAppointment}) => {
//     const [date, setDate] = useState(dateAppointment);
//     const [time, setTime] = useState(dateAppointment);
//     const now = new Date();
//
//     const [startDateString, setStartDateString] = useState('Today');
//
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//
//     const today = new Date();
//
//     const handleConfirmDate = (day) => {
//         const selected = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time.getHours(), time.getMinutes());
//         setDateAppointment(selected);
//         setDate(selected);
//         setDatePickerVisibility(false);
//         setStringStart(selected);
//         console.log(selected)
//     };
//
//     const handleConfirmTime = (selectedTime) => {
//         const selected = new Date(date.getFullYear(), date.getMonth(), date.getDate(), selectedTime.getHours(), selectedTime.getMinutes());
//         setDateAppointment(selected);
//         setTime(selected);
//         setTimePickerVisibility(false);
//         console.log(selected)
//     };
//
//     const getTime = (item) => {
//         const h = item.getHours();
//         const m = item.getMinutes();
//         const str = (
//             (h < 10 ? '0' : '') +
//             h.toString() +
//             ':' +
//             (m < 10 ? '0' : '') +
//             m.toString()
//         );
//         return str;
//     }
//
//     const setStringStart = (day) => {
//         if (day.toDateString() === today.toDateString()) {
//             setStartDateString("Today")
//         } else {
//             setStartDateString(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
//         }
//     }
//
//
//     return (
//         <View style={CreateStyles.howLongContainer}>
//             <View style={{width: '49%'}}>
//                 <Text style={CreateStyles.title}>Date</Text>
//                 <View style={CreateStyles.timeContainerRegular}>
//                     <Text style={CreateStyles.timeContainerText}>{startDateString}</Text>
//                     <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
//                         <Icon name="calendar" size={20} color= {colors.gray3}/>
//                     </TouchableOpacity>
//                     <DateTimePicker
//                         isVisible={isDatePickerVisible}
//                         mode={'date'}
//                         onCancel={() => setDatePickerVisibility(false)}
//                         onConfirm={handleConfirmDate}
//                         date={date}
//                     />
//                 </View>
//             </View>
//             <View style={{width: '49%'}}>
//                 <Text style={CreateStyles.title}>Time</Text>
//                 <View style={CreateStyles.timeContainerRegular}>
//                     <Text style={CreateStyles.timeContainerText}>{getTime(time)}</Text>
//                     <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
//                         <Icon name="clock" size={20} color= {colors.gray3}/>
//                     </TouchableOpacity>
//                     <DateTimePicker
//                         isVisible={isTimePickerVisible}
//                         mode={'time'}
//                         onConfirm={handleConfirmTime}
//                         onCancel={() => setTimePickerVisibility(false)}
//                         date={new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.getHours(), time.getMinutes(), 0, 0)}
//                     />
//                 </View>
//             </View>
//         </View>
//
//     );
// };

const DateAndTime = ({ dateAppointment, setDateAppointment }) => {
    const [startDateString, setStartDateString] = useState('Today');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const today = new Date();

    const handleConfirmDate = (day) => {
        const selected = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            dateAppointment.getHours(),
            dateAppointment.getMinutes()
        );
        setDateAppointment(selected);
        setDatePickerVisibility(false);
        setStringDate(selected);
        console.log(selected)
    };

    const handleConfirmTime = (selectedTime) => {
        const selected = new Date(
            dateAppointment.getFullYear(),
            dateAppointment.getMonth(),
            dateAppointment.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes()
        );
        setDateAppointment(selected);
        setTimePickerVisibility(false);
        console.log(selected)
    };

    const getTime = (item) => {
        const h = item.getHours();
        const m = item.getMinutes();
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const setStringDate = (day) => {
        if (day.toDateString() === today.toDateString()) {
            setStartDateString('Today');
        } else {
            setStartDateString(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
    };

    return (
        <View style={CreateStyles.howLongContainer}>
            <View style={{ width: '49%' }}>
                <Text style={CreateStyles.title}>Date</Text>
                <View style={CreateStyles.timeContainerRegular}>
                    <Text style={CreateStyles.timeContainerText}>{startDateString}</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                        <Icon name="calendar" size={20} color={colors.gray3} />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={dateAppointment}
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            </View>
            <View style={{ width: '49%' }}>
                <Text style={CreateStyles.title}>Time</Text>
                <View style={CreateStyles.timeContainerRegular}>
                    <Text style={CreateStyles.timeContainerText}>{getTime(dateAppointment)}</Text>
                    <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
                        <Icon name="clock" size={20} color={colors.gray3} />
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isTimePickerVisible}
                        mode="time"
                        date={dateAppointment}
                        onConfirm={handleConfirmTime}
                        onCancel={() => setTimePickerVisibility(false)}
                    />
                </View>
            </View>
        </View>
    );
};

export default DateAndTime;
