import React, {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {retrieveMedicationsForUser} from "../services/collections";
import {auth} from "../../firebase";
import {ScrollView, StyleSheet, TextInput} from "react-native";
import StockItem from "../components/StockComponents/StockItem";

function Search() {

    const [title, setTitle] = useState('');

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
        <>
            <TextInput style={styles.input}
                   placeholder='Ex: Ibuprofen'
                   onChangeText={setTitle}
                   value={title}
            />
            <ScrollView>
                {medicationItems?.filter(unit => {
                    if(title === ''){
                        return unit;
                    }
                    else if(unit?.title?.toLowerCase().includes(title.toLowerCase())){
                        return unit;
                    }
                }).map(unit => {
                    return(
                        <StockItem medication={unit} key={unit.id} />
                    )
                })
                }
            </ScrollView>
        </>
    )
}

export default Search;

const styles = StyleSheet.create({
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        height: 48,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10,
        //marginTop: 10,
    },
})