import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import ProgressComponents from "../components/HomeScreenComponents/ProgressComponent";
import {colors} from "../styles/Styles";
import PillsOfDay from "../components/PillsComponents/PillsOfDay";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";
import {retrievePillsForUser} from "../services/collections";
import {auth} from "../../firebase";

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

    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();
    const today = moment(new Date()).format('DD-MMM-YYYY');

    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                const newPills = await retrievePillsForUser(auth.currentUser.uid);
                setPillItems(newPills);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    const pillsOfDay = pillItems.filter(pillItem =>
        (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === today));

    return (
        <View style={styles.container}>
            <View style={styles.homeWrapper}>
                <TopBarHome/>
                <ProgressComponents pillsOfDay={pillsOfDay}/>
                <View style={styles.upcomingWrapper}>
                    <Text style={styles.txtTitle}>Upcoming Doses</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Pill')}>
                        <Text style={styles.txtButton}>See all</Text>
                    </TouchableOpacity>
                </View>
                <PillsOfDay pillsOfDay={pillsOfDay} />
            </View>

        </View>
    );
}

export default HomeScreen;
