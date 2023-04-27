import {
    Image, ScrollView,
    StyleSheet, Text, TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import {colors, FormStyles} from "../../styles/Styles";

function VariantOfMedsForAdded({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.variantsWrapper}>
                <Text style={FormStyles.title}>Choose your variant</Text>
                <ScrollView style={{width: "100%"}}>
                    <TouchableOpacity style={styles.variantContainer} onPress={() => navigation.navigate('createRegularMed')}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.titleVariant}>Regular medications</Text>
                            <Text style={styles.infoVariant}>Add medicine and time. And rest we will make sure to remind you about taking your pill on time</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.imgPill}
                                   source={require('../../../assets/bottle_with_pills.png')}
                            />
                        </View>
                       </TouchableOpacity>
                    <TouchableOpacity style={styles.variantContainer} onPress={() => navigation.navigate('createOneTimeMed')}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.titleVariant}>One-time medication</Text>
                            <Text style={styles.infoVariant}>Add a medicine which you drank once. This will help you monitor your statistics in the future</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.imgPill}
                                   source={require('../../../assets/capsule.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.variantContainer} onPress={() => navigation.navigate('createAppointment')}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.titleVariant}>Appointment</Text>
                            <Text style={styles.infoVariant}>Add new medicine to stock. You can always check the availability of medicines</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.imgPill}
                                   source={require('../../../assets/appointment.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.variantContainer} onPress={() => navigation.navigate('addMedToStock')}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.titleVariant}>Medication to stock</Text>
                            <Text style={styles.infoVariant}>Add new medicine to stock. You can always check the availability of medicines</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.imgPill}
                                   source={require('../../../assets/aLotOfPills.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

export default VariantOfMedsForAdded;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    variantsWrapper: {
        flex: 1,
        paddingTop: 42,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 23
    },
    variantContainer:{
        marginTop: 20,
        padding: 10,
        height: 137,
        backgroundColor: colors.lightBlue,
        width: "100%",
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleVariant:{
        fontSize: 21,
        fontWeight: '400',
        color: colors.black,
    },
    infoVariant:{
        marginTop: 5,
        fontSize: 13,
        color: colors.gray2
    },
    imgContainer:{

    },
    imgPill:{
        width: 150,
        height: 160,
    },
    textWrapper:{
        marginLeft: 10,
        width: '59%',
    }
});
