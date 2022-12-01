import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Pill from '../../components/Pill';
import { auth } from '../../../firebase';
import {
    retrievePillsForUser,
} from '../../services/collections';
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../../styles/Styles";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
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
});

function PillsOfDays({ props, day }) {
    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

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

    // const deletePill = async (docID, index) => {
    //     const itemsCopy = [...pillItems];
    //     await DeletePillForUser(auth.currentUser.uid, docID);
    //     itemsCopy.splice(index, 1);
    //     setPillItems(itemsCopy);
    // };

    return (
        <ScrollView style={styles.items}>
            {
                pillItems.filter(pillItem =>
                    (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === day)
                ).map((pillItem, index) => (
                    <TouchableOpacity
                        key={pillItem.id}
                        onPress={() => navigation.navigate('editPill', {
                            pillItem,
                            index
                        })}
                    >
                        <Pill
                            pill={pillItem}
                        />
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default PillsOfDays;
