import {
    StyleSheet, Text, TextInput, TouchableOpacity, View,
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


function PersonalInfo({ navigation }) {
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
        await UpdateUser(auth.currentUser.uid, {
            name: name,
            gender: gender,
            birthday: new Date(birthday),
            avatar: avatarNumber
        })
        navigation.navigate('profile')
    }

    return (
        <View style={FormStyles.container}>
            <View style={FormStyles.containerSub}>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
                <View style={{marginTop: '10%' }}>
                    <Text style={FormStyles.title}>Personal Info</Text>
                    <Text style={{...styles.registrationInfo, marginTop: 8}}>Change your date if you need it</Text>
                    <View style={styles.inputsContainer}>
                        <Text style={CreateStyles.title}>Your Name</Text>
                        <View style={errorName ? {...FormStyles.inputContainer, ...FormStyles.errorInput} : FormStyles.inputContainer}>
                            <TextInput
                                style={FormStyles.input}
                                placeholder="Name"
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
                        <Text style={CreateStyles.title}>Your Gender</Text>
                        <View style={CreateStyles.chooseTimeRange}>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange,  gender === "male" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("male")}>
                                <Text style={[CreateStyles.textBtn, gender === "male" && CreateStyles.activeText]}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange, gender === "female" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("female")}>
                                <Text style={[CreateStyles.textBtn, gender === "female" && CreateStyles.activeText]}>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[CreateStyles.buttonTimeRange, gender === "transgender" ? CreateStyles.activeButton : CreateStyles.notActiveButton,]}
                                              onPress={() => handleSetGender("transgender")}>
                                <Text style={[CreateStyles.textBtn, gender === "transgender" && CreateStyles.activeText]}>Trans</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    <>
                        <Text style={CreateStyles.title}>Your Age</Text>
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
                        <ButtonCustom buttonText={'Save'} width={'100%'} onPress={handleUpdateUser}/>
                    </View>
                </View>
            </View>
        </View>

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


