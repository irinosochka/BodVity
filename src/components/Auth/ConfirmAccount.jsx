import React  from 'react';
import {
    TouchableOpacity, StyleSheet, Text, View, Image
} from 'react-native';
import {colors, FormStyles} from '../../styles/Styles';
import Icon from "react-native-vector-icons/Feather";
import {ButtonCustom} from "../../common/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import {genderIconFunc, getAvatar} from "../../services/auth";
import {useTranslation} from "react-i18next";

const ConfirmAccount = ({setPage, RegistrationLoader, gender, name, avatarNumber, bloodGroup, ageString, handleCreateUser}) => {
    const { t } = useTranslation();
    const avatarFile = getAvatar(avatarNumber);

    const genderIcon = genderIconFunc(gender);

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setPage(5)} style={{padding: 10}}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
            </View>

            <RegistrationLoader completed={'100%'} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>{t('confirmUserCard')}</Text>
                <Text style={styles.subtitle}>{t('userCardInfo')}</Text>
            </View>

            <View style={{alignItems: 'center', marginTop: 40}}>
                <View style={styles.userProfileContainer}>
                    <View style={styles.avatar}>
                        <Image source={avatarFile} style={styles.image} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Ionicons name={genderIcon} size={35} color={colors.black} />
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.title}>{t('bloodGroup') + ":"}</Text>
                            <Text style={styles.valueText}>{bloodGroup}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.title}>{t('age') + ':'}</Text>
                            <Text style={styles.valueText}>{ageString + ' ' + t('years')}</Text>
                        </View>
                    </View>
                </View>

                <ButtonCustom buttonText={t('createAccountBtn')} width={'80%'} onPress={handleCreateUser}/>
            </View>
        </>
    );
};

export default ConfirmAccount;

const styles = StyleSheet.create({
    registrationContainer:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle:{
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
        color: colors.gray3,
    },
    userProfileContainer: {
        width: '80%',
        height: '60%',
        backgroundColor: colors.lightBlue,
        borderRadius: 40,
        alignItems: 'center',
        padding: 10,
        marginBottom: 40,
    },
    avatar: {
        width: 170,
        height: 170,
        borderRadius: 85,
        overflow: "hidden",
        backgroundColor: colors.lightBlue,
        borderWidth: 1,
        borderColor: colors.lightBlue
    },
    image: {
        width: "100%",
        height: "100%",
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    name: {
        fontSize: 27,
        fontWeight: '600',
        color: colors.black,
        marginLeft: 10,
    },
    rowContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        color: colors.black,
        fontWeight: '500',
        fontSize: 18,
    },
    valueText: {
        marginTop: 5,
        fontWeight: '500',
        fontSize: 16,
        color: colors.black,
    }
});
