import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import React from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import ProgressComponents from "../components/HomeScreenComponents/ProgressComponent";
import {colors} from "../styles/Styles";
import PillsOfDay from "../components/PillsComponents/PillsOfDay";
import moment from "moment";

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

    return (
        <View style={styles.container}>
            <View style={styles.homeWrapper}>
                <TopBarHome/>
                <ProgressComponents/>
                <View style={styles.upcomingWrapper}>
                    <Text style={styles.txtTitle}>Upcoming Doses</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Pill')}>
                        <Text style={styles.txtButton}>See all</Text>
                    </TouchableOpacity>
                </View>
                <PillsOfDay day={moment(new Date()).format('DD-MMM-YYYY')} />
            </View>

        </View>
    );
}

export default HomeScreen;
