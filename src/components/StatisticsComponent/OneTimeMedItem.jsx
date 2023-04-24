import {
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import {getMedicationByID} from "../../services/collections";
import {auth} from "../../../firebase";
import {MissedMedsModal} from "./MissedMedsModal";

function OneTimeMedItem({idx, medID, reminders, count}) {
    const [medication, setMedication] = useState(getMedicationByID(auth.currentUser.uid, medID));
    const [isShowMissedMedsModal, setIsShowMissedMedsModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const newMedication = await getMedicationByID(auth.currentUser.uid, medID);
            setMedication(newMedication);
        }
        fetchData().catch(console.error)
    },[medID])


    return (
        <>
            <TouchableOpacity style={styles.medContainer} onPress={() => setIsShowMissedMedsModal(!isShowMissedMedsModal)}>
                <Text>{idx+1 + '. ' + medication.title}</Text>
                <Text style={styles.countText}>{count}</Text>
            </TouchableOpacity>
            {isShowMissedMedsModal && <MissedMedsModal isShowMissedMedsModal={isShowMissedMedsModal} setIsShowMissedMedsModal={setIsShowMissedMedsModal} reminders={reminders} title={medication.title} />}
        </>
    );
}

export default OneTimeMedItem;


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
    },
});
