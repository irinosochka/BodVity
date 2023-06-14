import {
    StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView
} from 'react-native';
import React, {useContext, useState} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import {UserDataContext} from "../../context/UserDataContext";
import {colors, FormStyles} from "../../styles/Styles";
import {cancelAllPushNotification} from "../../services/pushNotifications";
import HeaderProfile from "../../components/Profile/HeaderProfile";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";
import {ConfirmLogoutModal} from "../../components/Auth/ConfirmLogoutModal";


function ProfileScreen({navigation}) {
    const { t } = useTranslation();
    const { userData, setUserData } = useContext(UserDataContext)
    const [isShowConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUserData('');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleCancelAllNotification = async () => {
        await cancelAllPushNotification();
    }

    return (
        <View style={FormStyles.container}>
            <SafeAreaView style={{...FormStyles.AndroidSafeArea, marginHorizontal: 10}}>
                <View style={styles.shadowForContainer}>
                    <HeaderProfile user={userData} />
                </View>
                <View style={styles.shadowForContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('personalInfo')}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name='person-outline' size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('personalInfo')}</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('yourMedications')}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name='bandage-outline' size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('yourMedications')}</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('yourAppointments')}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="alarm-outline" size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('yourAppointments')}</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemMenu} onPress={() => navigation.navigate('changeLanguage')}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="language-outline" size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('changeLanguage')}</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemMenu} onPress={handleCancelAllNotification}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="notifications-off-outline" size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('cancelAllNotifications')}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemMenu} onPress={() => setShowConfirmLogoutModal(true)}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="log-out-outline" size={20} color={colors.primary} />
                                <Text style={styles.textBtnMenu}>{t('logout')}</Text>
                            </View>
                        </TouchableOpacity>
                        <ConfirmLogoutModal isShowConfirmLogoutModal={isShowConfirmLogoutModal} setShowConfirmLogoutModal={setShowConfirmLogoutModal} handleSignOut={handleSignOut}/>
                    </ScrollView>
                  </View>
            </SafeAreaView>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    shadowForContainer:{
        backgroundColor: colors.white,
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
    },
    itemMenu: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightBlue,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBtnMenu: {
        marginLeft: 7,
        fontWeight: '500',
        fontSize: 15,
        color: colors.black,
    },
});
