import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {colors} from "../styles/Styles";

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
    },
    pinButton: {
        backgroundColor: colors.backgr,
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
        backgroundColor: colors.backgr,
        padding: 5,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
    },
});

function Note(props) {
    const { note, deleteAction } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((value) => !value);

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
