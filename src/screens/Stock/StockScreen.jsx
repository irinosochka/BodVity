import {
    StyleSheet, View, Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {retrieveMedicationsForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import Search from "../../common/Search";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stockWrapper: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 20,
        height: '95%',
    },
    title: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18
    }
});

function StockScreen() {
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
            <View style={styles.stockWrapper}>
                <Text style={styles.title}>Your medications in stock</Text>
                <Search />
            </View>
        </View>
    );
}

export default StockScreen;
