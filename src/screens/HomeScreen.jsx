import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from "react-native";
import {colors, FormStyles} from "../styles/Styles";
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";
import CalendarComponent from "../components/MedsComponents/CalendarComponent";
import {useTranslation} from "react-i18next";

function HomeScreen({ navigation }) {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={FormStyles.AndroidSafeArea}>
            <View style={styles.homeWrapper}>
                <TopBarHome navigation={navigation}/>
            </View>
            <View style={styles.journalTextContainer}>
                <Text style={styles.journalText}>{t('journal')}</Text>
            </View>
            <CalendarComponent navigation={navigation} />
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeWrapper: {
        paddingHorizontal: 15,
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
