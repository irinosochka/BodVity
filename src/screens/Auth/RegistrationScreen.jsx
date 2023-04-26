import React, { useState } from 'react';
import {
    View
} from 'react-native';
import Registration from "../../components/Registration/Registration";
import {colors, FormStyles} from "../../styles/Styles";
import Gender from "../../components/Registration/Gender";
import Age from "../../components/Registration/Age";
import moment from "moment";
import BloodGroup from "../../components/Registration/BloodGroup";
import ChooseAvatar from "../../components/Registration/ChooseAvatar";
import ConfirmAccount from "../../components/Registration/ConfirmAccount";
import {createUser} from "../../services/auth";

const RegistrationLoader = ({completed}) => (
    <>
        <View style={{borderWidth: 2, borderRadius: 5, marginTop: 20, borderColor: colors.primary, opacity: 0.2}} />
        <View style={{borderWidth: 2, borderRadius: 5, marginTop: -4, borderColor: colors.primary, width: completed}} />
    </>
);

const RegistrationScreen = ({ navigation }) => {
    const now = moment();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [page, setPage] = useState(1);
    const [selectedGender, setSelectedGender] = useState('');
    const [birthday, setBirthday] = useState(now);
    const [bloodGroup, setBloodGroup] = useState('');
    const [avatarNumber, setAvatarNumber] = useState('');
    const [ageString, setAgeString] = useState('');

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPage(1);
        setSelectedGender('');
        setBirthday('');
        setBloodGroup('');
        setAvatarNumber('');
        setAgeString('');
    }

    const handleCreateUser = async () => {
        try {
            await createUser(email, password, name, avatarNumber, selectedGender, birthday, bloodGroup);
            reset();
        }catch (error){
            console.log('Error creating user:', error.message);
        }
    }

    return (
        <View style={FormStyles.container}>
            <View style={FormStyles.containerSub}>{
                page === 1 &&
                <Registration navigation={navigation}
                              name={name} email={email} password={password} confirmPassword={confirmPassword}
                              setName={setName} setEmail={setEmail} setPassword={setPassword}
                              setConfirmPassword={setConfirmPassword} setPage={setPage}
                />
            }
            {
                page === 2 && <Gender navigation={navigation} setPage={setPage}
                                      RegistrationLoader={RegistrationLoader} selectedGender={selectedGender}
                                      setSelectedGender={setSelectedGender}
                />
            }
            {
                page === 3 && <Age birthday={birthday} setBirthday={setBirthday} setPage={setPage}
                                   RegistrationLoader={RegistrationLoader} ageString={ageString}
                                   setAgeString={setAgeString}
                />
            }
            {
                page === 4 && <BloodGroup bloodGroup={bloodGroup} setBloodGroup={setBloodGroup}
                                          setPage={setPage} RegistrationLoader={RegistrationLoader}
                />
            }
            {
                page === 5 && <ChooseAvatar avatarNumber={avatarNumber} setAvatarNumber={setAvatarNumber}
                                            setPage={setPage} RegistrationLoader={RegistrationLoader}
                />
            }
            {
                page === 6 && <ConfirmAccount setPage={setPage} RegistrationLoader={RegistrationLoader}
                                              name={name} gender={selectedGender} avatarNumber={avatarNumber}
                                              bloodGroup={bloodGroup} ageString={ageString}
                                              handleCreateUser={handleCreateUser}
                />
            }
            </View>
        </View>
    );
};

export default RegistrationScreen;

