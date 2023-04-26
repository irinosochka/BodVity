import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import {UserDataContext} from "../../context/UserDataContext";
import Icon from "react-native-vector-icons/Feather";
import Avatar from "../../common/Avatar";


function TopBarHome({ navigation }) {

    const { userData, setUserData } = useContext(UserDataContext)

    return (
        <View style={styles.topWrapper}>
            <View style={styles.userInfo}>
                <Avatar navigation={navigation} radius={75}/>
                <View style={{marginLeft: 5}}>
                    <Text style={FormStyles.title}>Hello, {userData.name} &#128075; </Text>
                    <Text style={styles.subtitle}>Let's check your plan</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Stock')}>
                <Icon name="archive" size={30} color={colors.gray3} />
            </TouchableOpacity>
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


