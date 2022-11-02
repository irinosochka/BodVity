import {
    Text, TouchableOpacity, View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Pill from '../../components/Pill';
import { auth } from '../../../firebase';
import {
    retrievePillsForUser, DeletePillForUser, UpdatePillForUser,
} from '../../services/collections';
import {useIsFocused} from "@react-navigation/native";
import {colors, FormStyles} from "../../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pillsWrapper: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 20,
        height: '95%',
    },
    writeTodoWrapper: {
        position: 'absolute',
        padding: 10,
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 'auto',
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
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 2.5,
    },
    newPill: {
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
});

function AllPillScreen({ props, navigation }) {
    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const newPills = await retrievePillsForUser(auth.currentUser.uid);
                setPillItems(newPills);
            }
        }
        fetchData()
            .catch(console.error)
    }, [props, isFocused]);

    const completePill = async (docID, index) => {
        await UpdatePillForUser(auth.currentUser.uid, docID, {
            completed: !pillItems[index].completed,
        });
        const newPillItems = [...pillItems];
        newPillItems[index].completed = !pillItems[index].completed;
        setPillItems(newPillItems);
    };

    const deletePill = async (docID, index) => {
        const itemsCopy = [...pillItems];
        await DeletePillForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setPillItems(itemsCopy);
    };

    return (
        <View style={styles.container}>
            <View style={styles.pillsWrapper}>
                <Text style={FormStyles.title}>Today's Pills</Text>
                <ScrollView style={styles.items}>
                    {
                        pillItems.map((pillItem, index) => (
                            <TouchableOpacity
                                key={pillItem.id}
                                onPress={() => navigation.navigate('editPill', {
                                    pillItem,
                                    index
                                })}
                            >
                                <Pill
                                    pill={pillItem}
                                    completeAction={() => completePill(pillItem.id, index)}
                                    deleteAction={() => deletePill(pillItem.id, index)}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

            {/*<View style={styles.newPill}>*/}
            {/*    <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('createPill')}>*/}
            {/*        <Text>New</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}

            {/*<KeyboardAvoidingView*/}
            {/*    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}*/}
            {/*    style={styles.writeTodoWrapper}*/}
            {/*>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder="Add new pill ..."*/}
            {/*        value={pill}*/}
            {/*        onChangeText={(text) => setPill(text)}*/}
            {/*        onSubmitEditing={() => handleKeyPress()}*/}
            {/*        clearButtonMode="while-editing"*/}
            {/*    />*/}

            {/*    <TouchableOpacity onPress={() => handleAddPill()}>*/}
            {/*        <View style={styles.addWrapper}>*/}
            {/*            <MaterialCommunityIcons name="plus" size={25} />*/}
            {/*        </View>*/}
            {/*    </TouchableOpacity>*/}
            {/*</KeyboardAvoidingView>*/}
        </View>
    );
}

export default AllPillScreen;
