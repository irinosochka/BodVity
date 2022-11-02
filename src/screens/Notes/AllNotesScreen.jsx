import {
    StyleSheet, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Note from '../../components/Note';
import {
    retrieveNotesForUser, DeleteNoteForUser, UpdateNoteForUser,
} from '../../services/collections';
import { auth } from '../../../firebase';
import {colors, FormStyles} from "../../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    notesWrapper: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 20,
        height: '95%',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    newNote: {
        backgroundColor: colors.backgr,
        width: '50%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        marginBottom: 30,
        bottom: 0,
        marginLeft: 100,
    },
    touchable: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    btnContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30
    },
    btnSave:{
        width: 319,
        height: 56,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginTop: 138
    },
    txtBtnSave:{
        fontSize: 17,
        color:'#FFF'
    },
});

function AllNotesScreen({ props, navigation }) {
    const [noteItems, setNoteItems] = useState([]);
    const isFocused = useIsFocused();

    // useEffect(async () => {
    //     if (isFocused) {
    //         const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
    //         setNoteItems(newNotes);
    //     }
    // }, [props, isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
                setNoteItems(newNotes);
            }
        }
        fetchData()
            .catch(console.error)
    }, [props, isFocused]);

    const deleteNote = async (docID, index) => {
        const itemsCopy = [...noteItems];
        await DeleteNoteForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setNoteItems(itemsCopy);
    };

    const completeNote = async (docID, index) => {
        await UpdateNoteForUser(auth.currentUser.uid, docID, {
            completed: !noteItems[index].completed,
        });
        const newNoteItems = [...noteItems];
        newNoteItems[index].completed = !noteItems[index].completed;

        setNoteItems(newNoteItems);
    };

    return (
        <View style={styles.container}>
            <View style={styles.notesWrapper}>
                <Text style={FormStyles.title}>All notes</Text>
                <ScrollView style={styles.items}>
                    {
                        noteItems.map((noteItem, index) => (
                            <TouchableOpacity
                                key={noteItem.id}
                                onPress={() => navigation.navigate('note', {
                                    noteItem,
                                    index,
                                })}
                            >
                                <Note
                                    note={noteItem}
                                    content={noteItem.content}
                                    deleteAction={() => deleteNote(noteItem.id, index)}
                                    completeAction={() => completeNote(noteItem.id, index)}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnSave}
                                  onPress={() => navigation.navigate('createNote')}
                >
                    <Text
                        style={styles.txtBtnSave}>
                        New Note
                    </Text>

                </TouchableOpacity>
            </View>

            {/*<View style={styles.newNote}>*/}
            {/*    /!*<TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('createNote')}>*!/*/}
            {/*    /!*    <Text>New</Text>*!/*/}
            {/*    /!*</TouchableOpacity>*!/*/}
            {/*</View>*/}
        </View>
    );
}

export default AllNotesScreen;
