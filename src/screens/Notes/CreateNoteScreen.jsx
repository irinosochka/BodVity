import {
    StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { AddNoteForUser } from '../../services/collections';
import { auth } from '../../../firebase';
import {colors} from "../../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    saveNote: {
        backgroundColor: colors.lightBlue,
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
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.lightBlue,
        color: '#000',
        width: '95%',
        height: '60%',
        borderRadius: 10,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    titleInput: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: colors.lightBlue,
        color: '#000',
        width: '95%',
        fontWeight: 'bold',
        fontSize: 25,
    },
    btnSave:{
        width: 319,
        height: 56,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginTop: 40
    },
    txtBtnSave:{
        fontSize: 17,
        color:'#FFF'
    },
});

function CreateNoteScreen({ navigation }) {
    const [newContent, setNewContent] = useState('');
    const [newTitle, setNewTitle] = useState('New Note');

    const handleAddNote = async (contentData, titleData) => {
        const newNoteItem = {
            content: contentData,
            date: Date.now(),
            title: titleData,
            completed: false,
        };
        AddNoteForUser(auth.currentUser.uid, newNoteItem).catch(console.error);
        Keyboard.dismiss();
    };

    const onCreate = () => {
        handleAddNote(newContent, newTitle);
        setNewContent('');
        setNewTitle('');
        navigation.navigate('allNotes');
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.titleInput}
                    value={newTitle}
                    onChangeText={(text) => setNewTitle(text)}
                    multiline
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    value={newContent}
                    onChangeText={(text) => setNewContent(text)}
                    multiline
                    autoFocus
                />
                <TouchableOpacity style={styles.btnSave}
                                  onPress={()=>{
                                      onCreate()
                                  }}
                >
                    <Text
                        style={styles.txtBtnSave}>
                        Save
                    </Text>

                </TouchableOpacity>
                {/*<View style={styles.saveNote}>*/}
                {/*    <TouchableOpacity style={styles.touchable} onPress={onCreate}>*/}
                {/*        <Text>Create</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
        </TouchableWithoutFeedback>
    );
}

export default CreateNoteScreen;
