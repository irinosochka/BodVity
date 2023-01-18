import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import ProgressComponents from "../components/HomeScreenComponents/ProgressComponent";
import {colors} from "../styles/Styles";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";
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
    const [howManyCompleted, setHowManyCompleted] = useState(0);
    const [medications, setMedications] = useState([]);
    const isFocused = useIsFocused();
    const today = moment(new Date()).format('DD-MMM-YYYY');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getRemind(auth.currentUser.uid)
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    useEffect(() => {
        const fetchData = async () => {
            setHowManyCompleted(medicationOfDay.map(med => med.isConfirmed).filter(med => (med === true)).length);
            setIsCompleted(medicationOfDay.length ===
                medicationOfDay.map(med => med.isConfirmed).filter(med => (med === true)).length);
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);


    const getRemind = async (userID) => {
        setMedications(prev => [])

        const medicationsRef = collection(db, 'users', userID, 'medications')
        const medicationsDocs = await getDocs(medicationsRef)

        medicationsDocs.docs.map( (medication) => {
            const getReminders = async () => {
                const remindersRef = query(collection(db, 'users', userID, 'medications', medication.id, 'reminders'), orderBy('timestamp'))
                const remindersDocs = await getDocs(remindersRef)

                return {...medication.data(), id: medication.id, reminders: remindersDocs.docs.map(reminder => ({...reminder.data(), id: reminder.id, timestamp: reminder.data().timestamp}))}
            }

            getReminders()
                .then( medication => {
                    setMedications(prev => [...prev, medication])
                }).catch(e => console.log(e))
        })
    }

    const medicationOfDay = medications.map(medication => medication.reminders)
        .flat(1).filter(medItem =>
            (moment.unix(medItem.timestamp.seconds).format('DD-MMM-YYYY') === today));


    // const completed = medicationOfDay.length ===
    //     medicationOfDay.map(med => med.isConfirmed).filter(med => (med === true)).length;


    return (
        <View style={styles.container}>
            <View style={styles.homeWrapper}>
                <TopBarHome navigation={navigation}/>
                <ProgressComponents isCompleted={isCompleted}/>
                <View style={styles.upcomingWrapper}>
                    <Text style={styles.txtTitle}>Upcoming Doses</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Pill')}>
                        <Text style={styles.txtButton}>See all</Text>
                    </TouchableOpacity>
                </View>
                <MedicationOfDay navigation={navigation} medicationOfDay={medicationOfDay} howManyCompleted={howManyCompleted} setHowManyCompleted={setHowManyCompleted}/>
            </View>
        </View>
    );
}

export default HomeScreen;
