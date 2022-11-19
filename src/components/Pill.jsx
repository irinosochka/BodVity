import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React  from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from "../styles/Styles";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.backgr,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    square: {
        width: 20,
        height: 20,
        borderWidth: 1,
        // borderColor: '#73758a',
        borderColor: colors.gray3,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
    },
    squareComplete: {
        width: 20,
        height: 20,
        // backgroundColor: '#73758a',
        backgroundColor: colors.gray3,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
        alignItems: 'center',
    },
    txtPillTitle: {
        fontWeight: "500",
    },
    pillInfoWrapper: {
        width: "60%",
    },
    txtPillInfo: {

    },
    timeWrapper: {

    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: colors.gray3,
    }
});

function Pill(props) {
    const {
        pill, deleteAction, completeAction,
    } = props;

    // const [reminderTime, setreminderTime] = useState(pill.date);

    // const onReminderTimeChange = async (_event, selectedDate) => {
    //     await UpdatePillForUser(auth.currentUser.uid, pill.id, {
    //         date: Date.parse(selectedDate),
    //     });
    //     setreminderTime(selectedDate);
    // };

    // let ExpandedView;
    // if (isExpanded) {
    //     ExpandedView = (
    //         <View style={styles.expandedItem}>
    //             <TouchableOpacity style={styles.reminderButton}>
    //                 <DateTimePicker
    //                     value={reminderTime}
    //                     mode="time"
    //                     is24Hour
    //                     style={{width: 90, height: 30}}
    //                     onChange={onReminderTimeChange}
    //                 />
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.timeWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {moment.unix(pill.time).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.pillInfoWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {pill.title}
                    </Text>
                    <Text
                        style={styles.txtPillInfo}
                    >
                        {pill.quantity}
                    </Text>
                </View>
                <TouchableOpacity
                    style={pill.completed ? styles.squareComplete : styles.square}
                    onPress={completeAction}
                >
                    <View>
                        {pill.completed ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                    </View>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={deleteAction}>*/}
                {/*    <MaterialCommunityIcons name="delete" size={20} />*/}
                {/*</TouchableOpacity>*/}
            </View>
            {/*{ExpandedView}*/}
        </View>
    );
}

export default Pill;
