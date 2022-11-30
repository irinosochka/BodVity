import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import {UserDataContext} from "../../context/UserDataContext";
import {Restart} from "../../utils/Restart";
import {colors} from "../../styles/Styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.lightBlue,
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
    },
});

function ProfileScreen() {
    const { userData, setUserData } = useContext(UserDataContext)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUserData('');
                Restart()
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {/*{console.log({userData})}*/}
                <Text>Hey {userData.name}</Text>
                <Text>Email: {userData.email}</Text>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProfileScreen;
