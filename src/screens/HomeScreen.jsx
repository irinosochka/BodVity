import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from "../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.backgr,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
    },
});

function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Notes')}
                    style={styles.button}
                >
                    <Text>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Pill')}
                    style={styles.button}
                >
                    <Text>Pill</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;
