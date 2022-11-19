import {
    StyleSheet, View, Text, Image
} from 'react-native';
import React from 'react';
import {colors} from "../../styles/Styles";

const styles = StyleSheet.create({
    progressWrapper: {
        height: 100,
        borderRadius: 15,
        padding: 20,
        backgroundColor: colors.primary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressTextWrapper: {

    },
    txtTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
    txtSubtitle: {
        paddingTop: 5,
        fontSize: 14,
        fontWeight: "300",
        color: colors.white,
        width: 200,
    },
    iconWrapper: {
        paddingLeft: 20,
    },
    imgDoctor: {
        width: 130,
        height: 130,
    },
});

function ProgressComponents() {

    return (
        <View style={styles.progressWrapper}>
            <View style={styles.progressTextWrapper}>
                <Text style={styles.txtTitle}>Keep it up!</Text>
                <Text style={styles.txtSubtitle}>You haven't missed a single medication. Well done.</Text>
            </View>
            <View style={styles.iconWrapper}>
               <Image style={styles.imgDoctor}
                   source={require('../../../assets/doctor.png')}
               />
            </View>
        </View>
    );
}

export default ProgressComponents;
