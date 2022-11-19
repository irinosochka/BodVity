import {
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import React from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import ProgressComponents from "../components/HomeScreenComponents/ProgressComponent";
import {colors} from "../styles/Styles";
import PillList from "../components/PillsComponents/PillList";

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

//design HomeScreen && edited list with all pills && fixed showing time

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
                <PillList/>
            </View>

        </View>
    );
}

export default HomeScreen;
