import React, {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {DeleteMedicationForUser, retrieveMedicationsForUser} from "../services/collections";
import {auth} from "../../firebase";
import {ScrollView, StyleSheet, TextInput} from "react-native";
import StockItem from "../components/StockComponents/StockItem";
import {colors} from "../styles/Styles";
import {useTranslation} from "react-i18next";

function SearchMed() {
    const { t } = useTranslation();

    const [title, setTitle] = useState('');

    const [medicationItems, setMedicationItems] = useState([]);
    const isFocused = useIsFocused();

    const deleteMed = async (docID, index) => {
        const itemsCopy = [...medicationItems];
        await DeleteMedicationForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setMedicationItems(itemsCopy);
    };

    useEffect(() => {
        const fetchData = async () => {
            const newMedications = await retrieveMedicationsForUser(auth.currentUser.uid);
            setMedicationItems(newMedications);
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    const sortedMedication = medicationItems.sort((a, b) => b.updatedAt - a.updatedAt);

    return (
        <>
            <TextInput style={styles.input}
                   placeholder={t('exampleMed')}
                   onChangeText={setTitle}
                   value={title}
            />
            <ScrollView>
                {sortedMedication?.filter(unit => {
                    if(title === ''){
                        return unit;
                    }
                    else if(unit?.title?.toLowerCase().includes(title.toLowerCase())){
                        return unit;
                    }
                }).map((unit, index) => {
                    return(
                        <StockItem
                            medication={unit}
                            key={unit.id}
                            deleteAction={() => deleteMed(unit.id, index)}
                        />
                    )
                })}
            </ScrollView>
        </>
    )
}

export default SearchMed;

const styles = StyleSheet.create({
    input:{
        fontSize: 15,
        color: colors.gray3,
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 14,
        paddingLeft: 10,
    },
})
