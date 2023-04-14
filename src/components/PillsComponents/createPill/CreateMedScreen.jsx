import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {retrieveMedicationsForUser} from "../../../services/collections";
import {auth} from "../../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import CreateTitle from "./CreateTitle";
import CreateQuantity from "./CreateQuantity";

const CreateMedScreen = () => {
    const [title, setTitle] = useState('');
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [medicationItems, setMedicationItems] = useState([]);
    const [pillsInStock, setPillsInStock] = useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newMedications = await retrieveMedicationsForUser(auth.currentUser.uid);
                setMedicationItems(newMedications);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);

    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Add new plan</Text>
            </View>
            <View style={styles.zIndex}>
                <CreateTitle medicationItems={medicationItems} onSelectItem={handleMedicationSelect} title={title} setTitle={setTitle}/>
            </View>
            {selectedMedication?.title === title
                ?
                <CreateQuantity medication={selectedMedication} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock} />
                :
                <CreateQuantity medication={false} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock}/>
            }
        </View>
    );
};

export default CreateMedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    zIndex:{
        zIndex: 99
    },
    title: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18
    },
})
