import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from "@react-native-community/datetimepicker";
import {UpdateNoteForUser} from "../services/collections";
import {auth} from "../firebase";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#BD93F9',
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
    pinButton: {
        backgroundColor: '#c39df9',
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        marginTop: 10,
    },
    itemsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    deleteButton: {
        position: 'absolute',
        right: 20,
    },
    infoButton: {
        position: 'absolute',
        right: 50,
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
    lineThroughItemText: {
        maxWidth: '80%',
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'black',
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
        backgroundColor: '#c39df9',
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
    },
});

function Note(props) {
    const { note, deleteAction, completeAction } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((value) => !value);
    const [reminderTime, setReminderTime] = useState(note.date);

    const onReminderTimeChange = async (_event, selectedDate) => {
        await UpdateNoteForUser(auth.currentUser.uid, note.id, {
            date: Date.parse(selectedDate)
        });
        setReminderTime(selectedDate);
    };

    let ExpandedView;
    if (isExpanded) {
        ExpandedView = (
            <View style={styles.expandedItem}>
                <TouchableOpacity style={styles.reminderButton}>
                    <DateTimePicker
                        value={reminderTime}
                        mode="time"
                        is24Hour
                        style={{width: 90, height: 30}}
                        onChange={onReminderTimeChange}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.itemsLeft}>
                    <TouchableOpacity
                        style={note.completed ? styles.squareComplete : styles.square}
                        onPress={completeAction}
                    >
                        <View>
                            {note.completed ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text
                        style={note.completed ? styles.lineThroughItemText : styles.itemText}
                    >
                        {note.title}
                    </Text>
                </View>
                <TouchableOpacity style={styles.infoButton} onPress={toggleExpanded}>
                    <MaterialCommunityIcons name="information-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deleteAction}>
                    <MaterialCommunityIcons name="delete" size={20} />
                </TouchableOpacity>
            </View>
            {ExpandedView}
        </View>
    );
}

export default Note;
