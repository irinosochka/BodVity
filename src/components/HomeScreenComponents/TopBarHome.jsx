import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import {UserDataContext} from "../../context/UserDataContext";
import Icon from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitle: {
        paddingTop: 3,
        color: colors.gray3
    }
});

function TopBarHome({ navigation }) {

    const { userData, setUserData } = useContext(UserDataContext)

    return (
        <View style={styles.topWrapper}>
            <View>
                <Text style={FormStyles.title}>Hello, {userData.name} &#128075; </Text>
                <Text style={styles.subtitle}>Let's check your plan</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('stock')}>
                <Icon name="bell" size={23} color={colors.gray3} />
            </TouchableOpacity>
        </View>
    );
}

export default TopBarHome;
