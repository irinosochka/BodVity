import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {retrieveMedicationsForUser} from "../../../services/collections";
import {auth} from "../../../../firebase";
import {useIsFocused} from "@react-navigation/native";
import CreateTitle from "./CreateTitle";
import CreateQuantity from "./CreateQuantity";
import CreateHowLong from "./CreateHowLong";
import CreateAlternativeDays from "./CreateAlternativeDays";

const CreateMedScreen = () => {
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [medicationItems, setMedicationItems] = useState([]);
    const [title, setTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState(false);
    const [pillsInStock, setPillsInStock] = useState('');
    const [errorStock, setErrorStock] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isAlternative, setAlternative] = useState(false);


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
                <Text style={styles.highTitle}>Add new plan</Text>
            </View>
            <Text style={styles.title}>Medicine name</Text>
            <View style={styles.zIndex}>
                <CreateTitle medicationItems={medicationItems} onSelectItem={handleMedicationSelect} title={title} setTitle={setTitle}/>
            </View>
            <Text style={styles.title}>Quantity in stock</Text>
            {selectedMedication?.title === title
                ?
                <CreateQuantity medication={selectedMedication} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock} />
                :
                <CreateQuantity medication={false} setPillsInStock={setPillsInStock} pillsInStock={pillsInStock}/>
            }
            <CreateHowLong startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <CreateAlternativeDays isAlternative={isAlternative} setAlternative={setAlternative} />
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
    highTitle: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18
    },
    title:{
        fontSize: 15,
        marginBottom: 5,
    },
})
