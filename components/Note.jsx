import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UpdateNoteForUser} from "../services/collections";
import {auth} from "../firebase";
import moment from 'moment';

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
    pinButton: {
        backgroundColor: '#d7eac4',
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
    expandedItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reminderButton: {
        backgroundColor: '#c1d2b0',
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
            reminder: Date.parse(selectedDate)
        });
        setReminderTime(selectedDate);
    };

    let ExpandedView;
    if (isExpanded) {
        ExpandedView = (
            <View style={styles.expandedItem}>
                <Text>
                    {moment(note.date).format("DD/MM/YYYY")}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>{note.title}</Text>
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
