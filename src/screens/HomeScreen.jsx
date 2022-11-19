import {
    StyleSheet, View,
} from 'react-native';
import React from 'react';
import TopBarHome from "../components/HomeScreenComponents/TopBarHome";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <TopBarHome/>
        </View>
    );
}

export default HomeScreen;
