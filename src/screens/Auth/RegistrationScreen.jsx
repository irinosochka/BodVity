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
                page === 2 && <Gender navigation={navigation} setPage={setPage} RegistrationLoader={RegistrationLoader} selectedGender={selectedGender} setSelectedGender={setSelectedGender} />
            }
            {
                page === 3 && <Age birthday={birthday} setBirthday={setBirthday} setPage={setPage} RegistrationLoader={RegistrationLoader} />
            }
            {
                page === 4 && <BloodGroup bloodGroup={bloodGroup} setBloodGroup={setBloodGroup} setPage={setPage} RegistrationLoader={RegistrationLoader} />
            }
            </View>
        </View>
    );
};

export default RegistrationScreen;

