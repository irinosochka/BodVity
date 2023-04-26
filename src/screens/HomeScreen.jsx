import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/Styles";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";
import {auth} from "../../firebase";
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import CalendarComponent from "../components/MedsComponents/CalendarComponent";
import {getReminders} from "../services/collections";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    homeWrapper: {
        // flex: 1,
        paddingTop: 42,
        paddingHorizontal: 15,
    },
    topWrapper: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    upcomingWrapper: {
        paddingTop: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtButton: {
        color: colors.primary
    },
    journalTextContainer: {
        // position: "sticky",
        top: 25,
        left: 20,
        right: 0,
        zIndex: 99,
    },
    journalText: {
        fontWeight: '700',
        fontSize: 14
    }
});

function HomeScreen({ navigation }) {
    const [medications, setMedications] = useState([]);
    const isFocused = useIsFocused();
    const today = moment(new Date()).format('DD-MMM-YYYY');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const medications = await getReminders(auth.currentUser);
                setMedications(medications);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            setIsCompleted(medicationOfDay.length ===
                medicationOfDay.map(med => med.isConfirmed).filter(med => (med === true)).length);
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    const medicationOfDay = medications.map(medication => medication.reminders)
        .flat(1).filter(medItem =>
            (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === today));

    return (
        <View style={styles.container}>
            {/*<View style={styles.homeWrapper}>*/}
            {/*    <TopBarHome navigation={navigation}/>*/}
            {/*    /!*<ProgressComponents isCompleted={isCompleted}/>*!/*/}
            {/*    /!*<View style={styles.upcomingWrapper}>*!/*/}
            {/*    /!*    <Text style={styles.txtTitle}>Upcoming Doses</Text>*!/*/}
            {/*    /!*    <TouchableOpacity onPress={() => navigation.navigate('Pill')}>*!/*/}
            {/*    /!*        <Text style={styles.txtButton}>See all</Text>*!/*/}
            {/*    /!*    </TouchableOpacity>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*    /!*<MedicationOfDay navigation={navigation} medicationOfDay={medicationOfDay}/>*!/*/}
            {/*</View>*/}
            <View style={styles.homeWrapper}>
                <TopBarHome navigation={navigation}/>
            </View>
            <View style={styles.journalTextContainer}>
                <Text style={styles.journalText}>Journal</Text>
            </View>
            <CalendarComponent navigation={navigation} />
        </View>
    );
}

export default HomeScreen;

