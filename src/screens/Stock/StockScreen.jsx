import {
    StyleSheet, View, Text, TouchableOpacity, BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {retrieveMedicationsForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import Search from "../../common/Search";
import {colors, FormStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";

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
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

function StockScreen({navigation}) {
    const [medicationItems, setMedicationItems] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                navigation.goBack();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [navigation]);

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
                <View style={styles.header}>
                    <Text style={{...FormStyles.title}}>Medications in stock</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="x" size={27} color= {colors.black}/>
                    </TouchableOpacity>
                </View>
                <Search />
            </View>
        </View>
    );
}

export default StockScreen;
