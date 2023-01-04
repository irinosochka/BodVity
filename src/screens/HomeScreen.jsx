import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import ProgressComponents from "../components/HomeScreenComponents/ProgressComponent";
import {colors} from "../styles/Styles";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";
import {retrievePillsForUser} from "../services/collections";
import {auth, db} from "../../firebase";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import MedicationOfDay from "../components/PillsComponents/MedicationOfDay";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    homeWrapper: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
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
    }
});

function HomeScreen({ navigation }) {
    const [medications, setMedications] = useState([])
    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();
    const today = moment(new Date()).format('DD-MMM-YYYY');

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const newPills = await retrievePillsForUser(auth.currentUser.uid);
                setPillItems(newPills);
                await getRemind(auth.currentUser)
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    const getRemind = async (user) => {
        setMedications(prev => [])

        const medicationsRef = collection(db, 'users', user.uid, 'medications')
        const medicationsDocs = await getDocs(medicationsRef)

        medicationsDocs.docs.map( (medication) => {
            const getReminders = async () => {
                const remindersRef = query(collection(db, 'users', user.uid, 'medications', medication.id, 'reminders'), orderBy('timestamp'))
                const remindersDocs = await getDocs(remindersRef)

                return {...medication.data(), id: medication.id, reminders: remindersDocs.docs.map(reminder => ({...reminder.data(), id: reminder.id, timestamp: reminder.data().timestamp}))}
            }

            getReminders()
                .then( medication => {
                    setMedications(prev => [...prev, medication])
                }).catch(e => console.log(e))
        })
    }

    const pillsOfDay = pillItems.filter(pillItem =>
        (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === today));

    const medicationOfDay = medications.map(medication => medication.reminders)
        .flat(1).filter(medItem =>
            (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === today));


    return (
        <View style={styles.container}>
            {console.log(medicationOfDay)}
            <View style={styles.homeWrapper}>
                <TopBarHome/>
                <ProgressComponents pillsOfDay={pillsOfDay}/>
                <View style={styles.upcomingWrapper}>
                    <Text style={styles.txtTitle}>Upcoming Doses</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Pill')}>
                        <Text style={styles.txtButton}>See all</Text>
                    </TouchableOpacity>
                </View>
                <MedicationOfDay medicationOfDay={medicationOfDay} />
            </View>

        </View>
    );
}

export default HomeScreen;
