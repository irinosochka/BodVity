import {
    StyleSheet, View, Text, ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {retrieveMedicationsForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import StockItem from "../../components/StockComponents/StockItem";
import {useIsFocused} from "@react-navigation/native";

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
});

function StockScreen({ navigation }) {
    const [medicationItems, setMedicationItems] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const newMedications = await retrieveMedicationsForUser(auth.currentUser.uid);
            setMedicationItems(newMedications);
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.notesWrapper}>
                <Text>Your medications in stock</Text>

                <ScrollView style={styles.items}>
                    {
                        medicationItems.map(medItem => (
                            <StockItem medication={medItem} key={medItem.id}/>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
}

export default StockScreen;
