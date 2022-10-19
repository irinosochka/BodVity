import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {UpdatePillForUser} from '../services/collections';
import { auth } from '../../firebase';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#d7eac4',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
        shadowColor: '#282A36',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#383A59',
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
    },
    squareComplete: {
        width: 24,
        height: 24,
        backgroundColor: '#383A59',
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
        alignItems: 'center',
    },
    itemText: {
        maxWidth: '80%',
    },
    lineThroughItemText: {
        maxWidth: '80%',
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'black',
    },
    deleteButton: {
        position: 'absolute',
        right: 20,
    },
    infoButton: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 50,
        padding: 10,
    },
    expandedItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#282A36',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    reminderButton: {
        backgroundColor: '#c1d2b0',
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
    },
});

function Pill(props) {
    const {
        pill, deleteAction, completeAction,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((value) => !value);

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
                    <View style={styles.itemsLeft}>
                        <TouchableOpacity
                            style={pill.completed ? styles.squareComplete : styles.square}
                            onPress={completeAction}
                        >
                            <View>
                                {pill.completed ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={pill.completed ? styles.lineThroughItemText : styles.itemText}
                        >
                            {pill.title}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={deleteAction}>
                        <MaterialCommunityIcons name="delete" size={20} />
                    </TouchableOpacity>
                </View>
                {/*{ExpandedView}*/}
            </View>

    );
}

export default Pill;