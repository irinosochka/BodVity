import React  from 'react';
import {
    TouchableOpacity, StyleSheet, Text, View
} from 'react-native';
import {colors, FormStyles} from '../../styles/Styles';
import Icon from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";

const BloodGroup = ({bloodGroup, setBloodGroup, setPage, RegistrationLoader}) => {
    const { t } = useTranslation();
    const handleSelectBloodGroup = (group) => {
        setBloodGroup(group);
    };

    const handleNext = () => {
        bloodGroup.length !== 0 ? setPage(5) : alert(t('AlarmBloodGroup'));
    }

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setPage(3)} style={{padding: 10}}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} style={{padding: 10}}>
                    <Icon name="arrow-right" size={35} color={colors.gray} />
                </TouchableOpacity>
            </View>

            <RegistrationLoader completed={'60%'} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>{t('yourBloodGroupQuestion')}</Text>
                <Text style={styles.subtitle}>{t('bloodGroupInfo')}</Text>
            </View>


            <View style={{...styles.registrationContainer, alignItems: 'center', marginBottom: 200}}>
                <View style={styles.bloodGroupContainer}>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'A+' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('A+')}>
                        <Text style={styles.bloodGroupText}>A+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'A-' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('A-')}>
                        <Text style={styles.bloodGroupText}>A-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bloodGroupContainer}>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'B+' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('B+')}>
                        <Text style={styles.bloodGroupText}>B+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'B-' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('B-')}>
                        <Text style={styles.bloodGroupText}>B-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bloodGroupContainer}>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'O+' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('O+')}>
                        <Text style={styles.bloodGroupText}>O+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'O-' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('O-')}>
                        <Text style={styles.bloodGroupText}>O-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bloodGroupContainer}>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'AB+' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('AB+')}>
                        <Text style={styles.bloodGroupText}>AB+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.bloodGroupItem}, bloodGroup === 'AB-' ? {backgroundColor: colors.lightBlue} : {backgroundColor: colors.white}]} onPress={() => handleSelectBloodGroup('AB-')}>
                        <Text style={styles.bloodGroupText}>AB-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default BloodGroup;

const styles = StyleSheet.create({
    registrationContainer:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bloodGroupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    subtitle:{
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
        color: colors.gray3,
    },
    bloodGroupItem: {
        borderWidth: 1,
        borderColor: colors.lightBlue,
        width: '49%',
        alignItems: 'center',
        padding: 25,
        borderRadius: 10,
    },
    bloodGroupText:{
        fontSize: 16,
    },
});
