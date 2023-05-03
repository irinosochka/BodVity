import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/Styles";
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import CalendarComponent from "../components/MedsComponents/CalendarComponent";
import {useTranslation} from "react-i18next";

function HomeScreen({ navigation }) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.homeWrapper}>
                <TopBarHome navigation={navigation}/>
            </View>
            <View style={styles.journalTextContainer}>
                <Text style={styles.journalText}>{t('journal')}</Text>
            </View>
            <CalendarComponent navigation={navigation} />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    homeWrapper: {
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
        top: 25,
        left: 20,
        right: 0,
        zIndex: 99,
    },
    journalText: {
        fontWeight: '700',
        fontSize: 14,
        color: colors.black,
    }
});
