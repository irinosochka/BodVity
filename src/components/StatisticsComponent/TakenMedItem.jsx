import {
    StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import {getMedicationByID} from "../../services/collections";
import {auth} from "../../../firebase";
import {TakenMedsModal} from "./TakenMedsModal";

function TakenMedItem({idx, medID, reminders, count}) {
    const [medication, setMedication] = useState(getMedicationByID(auth.currentUser.uid, medID));
    const [isShowTakenMedsModal, setIsShowTakenMedsModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const newMedication = await getMedicationByID(auth.currentUser.uid, medID);
            setMedication(newMedication);
        }
        fetchData().catch(console.error)
    },[medID])


    return (
        <>
            <TouchableOpacity style={styles.medContainer} onPress={() => setIsShowTakenMedsModal(!isShowTakenMedsModal)}>
                <Text style={styles.medTitle}>{idx+1 + '. ' + medication.title}</Text>
                <Text style={styles.countText}>{count}</Text>
            </TouchableOpacity>
            {isShowTakenMedsModal && <TakenMedsModal isShowTakenMedsModal={isShowTakenMedsModal} setIsShowTakenMedsModal={setIsShowTakenMedsModal} reminders={reminders} title={medication.title} />}
        </>
    );
}

export default TakenMedItem;


const styles = StyleSheet.create({
    medContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightBlue,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    countText:{
        fontWeight: '600',
        color: colors.black,
    },
    medTitle:{
        color: colors.black,
    },
});
