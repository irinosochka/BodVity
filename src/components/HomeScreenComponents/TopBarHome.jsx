import {
    StyleSheet, Text, View,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import {UserDataContext} from "../../context/UserDataContext";
import Avatar from "../../common/Avatar";


function TopBarHome({ navigation }) {

    const { userData, setUserData } = useContext(UserDataContext)

    const handleNavigateToProfile = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.topWrapper}>
            <View style={styles.userInfo}>
                <Avatar radius={75} onPress={handleNavigateToProfile}/>
                <View style={{marginLeft: 10}}>
                    <Text style={FormStyles.title}>Hello, {userData.name} &#128075; </Text>
                    <Text style={styles.subtitle}>Let's check your plan</Text>
                </View>
            </View>
        </View>
    );
}

export default TopBarHome;

const styles = StyleSheet.create({
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        paddingTop: 3,
        color: colors.gray3
    },
});


