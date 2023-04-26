import React from 'react';
import {
    TouchableOpacity, StyleSheet, Text, View
} from 'react-native';
import {colors, FormStyles} from '../../styles/Styles';
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const Gender = ({selectedGender, setSelectedGender, setPage, RegistrationLoader}) => {
    const colorActive = colors.primary;
    const noActive = "#d7e4fa";

    const handleNext = () => {
        selectedGender !== ''? setPage(3) : alert("Please choose your Gender.");
    }

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
    }

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setPage(1)} style={{padding: 10}}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} style={{padding: 10}}>
                    <Icon name="arrow-right" size={35} color={colors.gray} />
                </TouchableOpacity>
            </View>

            <RegistrationLoader completed={'20%'} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>What's your gender?</Text>
                <Text style={styles.subtitle}>To give you a better experiences we need to know your Gender</Text>
            </View>


            <View style={{...styles.registrationContainer, alignItems: 'center'}}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.genderCircle,
                            selectedGender === 'male' ? {borderColor: colorActive} : {borderColor: noActive}]}
                        onPress={() => handleSelectGender('male')}
                    >
                        <Ionicons name="male" size={100} color={selectedGender === 'male' ? colorActive : noActive} />
                        <Text style={[styles.genderName,
                            selectedGender === 'male' ? {color: colorActive} : {color: noActive}]}
                        >Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderCircle,
                            selectedGender === 'female' ? {borderColor: colorActive} : {borderColor: noActive}]}
                        onPress={() => handleSelectGender('female')}
                    >
                        <Ionicons name="female" size={100} color={selectedGender === 'female' ? colorActive : noActive} />
                        <Text style={[styles.genderName,
                            selectedGender === 'female' ? {color: colorActive} : {color: noActive}]}
                        >Female</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.genderCircle,
                        selectedGender === 'transgender' ? {borderColor: colorActive} : {borderColor: noActive}]}
                    onPress={() => handleSelectGender('transgender')}
                >
                    <Ionicons name="transgender-outline" size={100} color={selectedGender === 'transgender' ? colorActive : noActive} />
                    <Text style={[styles.genderName,
                        selectedGender === 'transgender' ? {color: colorActive} : {color: noActive}]}
                    >Transgender</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Gender;

const styles = StyleSheet.create({
    registrationContainer:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        marginTop: 100,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    genderCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    genderName:{
        fontWeight: '600',
    },
    subtitle:{
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
        color: colors.gray3,
    },
});
