import {
    StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors, FormStyles, sizes} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {ButtonCustom} from "../../common/Button";
import {UserDataContext} from "../../context/UserDataContext";
import {CreateStyles} from "../MedsComponents/createPill/createStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import ChangeAvatar from "./ChangeAvatar";
import {UpdateUser} from "../../services/auth";
import {auth} from "../../../firebase";
import {useTranslation} from "react-i18next";


function PersonalInfo({ navigation }) {
    const { t } = useTranslation();
    const {userData} = useContext(UserDataContext)
    const birthdaySeconds = userData.birthday.seconds;
    const birthdayMoment = moment.unix(birthdaySeconds);
    const [name, setName] = useState(userData.name);
    const [errorName, setErrorName] = useState(false);
    const [birthday, setBirthday] = useState(new Date(birthdayMoment));
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [gender, setGender] = useState(userData.gender);
    const [avatarNumber, setAvatarNumber] = useState(userData.avatar);

    const age = moment().diff(birthday, 'years');

    const handleConfirmBirthday = (day) => {
        setBirthday(day);
        setDatePickerVisible(false);
    }

    const handleSetGender = (gender) => {
        setGender(gender);
    }

    const handleUpdateUser = async () => {
        setErrorName(name.length === 0);
        if(name.length !== 0 && age >= 11){
            await UpdateUser(auth.currentUser.uid, {
                name: name,
                gender: gender,
                birthday: new Date(birthday),
                avatar: avatarNumber
            })
            navigation.navigate('profile')
        }
        else if(age < 0){
            alert(t('alarmFutureBirthday'));
        }else if(age < 11){
            alert(t('alarmLessThan11'));
        }
    }

    return (
        <SafeAreaView style={{...FormStyles.AndroidSafeArea}}>
            <View style={{paddingHorizontal: 15}}>
                <TouchableOpacity onPress={() => navigation.navigate('profile')} style={{alignItems: 'flex-end'}}>
                    <Icon name="x" size={35} color={colors.gray} />
                </TouchableOpacity>
                <View style={{marginTop: 5}}>
                    <Text style={FormStyles.title}>{t('personalInfo')}</Text>
                    <Text style={{...styles.registrationInfo, marginTop: 8}}>{t('personalDataInfo')}</Text>
                    <View style={styles.inputsContainer}>
                        <Text style={CreateStyles.title}>{t('yourName')}</Text>
                        <View style={errorName ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                            <TextInput
                                style={FormStyles.input}
                                placeholder={t('name')}
                                onChangeText={(value) => {
                                    setName(value);
                                    if (value.length > 0) {
                                        setErrorName(false);
                                    }
                                }}
                                value={name}
                            />
                        </View>
                    </View>
                    <>
                        <Text style={CreateStyles.title}>{t('yourGender')}</Text>
                        <View style={CreateStyles.chooseTimeRange}>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange,  gender === "male" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("male")}>
                                <Text style={[CreateStyles.textBtn, gender === "male" && CreateStyles.activeText]}>{t('male')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange, gender === "female" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("female")}>
                                <Text style={[CreateStyles.textBtn, gender === "female" && CreateStyles.activeText]}>{t('female')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange, gender === "transgender" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("transgender")}>
                                <Text style={[CreateStyles.textBtn, gender === "transgender" && CreateStyles.activeText]}>{t('transgender')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    <>
                        <Text style={CreateStyles.title}>{t('yourAge')}</Text>
                        <View style={CreateStyles.timeContainerOneTime}>
                            <Text style={{color: colors.gray3}}>{age}</Text>
                            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                <Icon name="calendar" size={20} color= {colors.gray3}/>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={isDatePickerVisible}
                                mode={'date'}
                                onCancel={() => setDatePickerVisible(false)}
                                onConfirm={handleConfirmBirthday}
                                date={birthday}
                            />
                        </View>
                    </>
                    <View>
                        <ChangeAvatar avatarNumber={avatarNumber} setAvatarNumber={setAvatarNumber} />
                    </View>


                    <View style={styles.container3}>
                        <ButtonCustom buttonText={t('saveBtn')} width={'100%'} onPress={handleUpdateUser}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    );
}

export default PersonalInfo;

const styles = StyleSheet.create({
    userInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    subtitle: {
        paddingTop: 3,
        color: colors.gray3,
        fontWeight: '500',
    },
    registrationInfo: {
        color: colors.gray3,
        marginTop: 3,
    },
    inputsContainer:{
        marginTop: 20,
    },
    container3: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btnLogin: {
        marginTop: 15,
        color: colors.gray3,
        fontSize: sizes.body
    }
});


