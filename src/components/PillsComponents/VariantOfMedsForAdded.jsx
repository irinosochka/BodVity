import {
    Image,
    StyleSheet, Text, TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import {colors} from "../../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    variantsWrapper: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 23
    },
    variantContainer:{
        marginTop: 20,
        padding: 10,
        height: 150,
        backgroundColor: colors.lightBlue,
        width: "100%",
        borderRadius: 15,
        // justifyContent: 'center'
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleVariant:{
        fontSize: 21,
        fontWeight: '400',
    },
    infoVariant:{
        marginTop: 5,
        fontSize: 13,
        color: colors.gray2
    },
    imgPill:{
        width: 170,
        height: 160,
    },
    textWrapper:{
        marginLeft: 10,
        width: 200,
    }
});

function VariantOfMedsForAdded({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.variantsWrapper}>
                <Text style={styles.title}>Add</Text>
                <TouchableOpacity style={styles.variantContainer} onPress={() => navigation.navigate('createRegularMed')}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.titleVariant}>Regular medications</Text>
                        <Text style={styles.infoVariant}>Add medicine and time. And rest we will make sure to remind you about taking your pill on time</Text>
                    </View>
                    <View>
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
                    <View>
                        <Image style={styles.imgPill}
                               source={require('../../../assets/capsule.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.variantContainer}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.titleVariant}>Medication to stock</Text>
                        <Text style={styles.infoVariant}>Add new medicine to stock. You can always check the availability of medicines, when you need them</Text>
                    </View>
                    <View>
                        <Image style={styles.imgPill}
                               source={require('../../../assets/aLotOfPills.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default VariantOfMedsForAdded;

