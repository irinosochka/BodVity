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
    }
});

function TopBarHome({ navigation }) {

    const { userData, setUserData } = useContext(UserDataContext)

    return (
        <View style={styles.topWrapper}>
            <Text style={FormStyles.title}>Hello, {userData.name} &#128075; </Text>
            <TouchableOpacity onPress={() => navigation.navigate('stock')}>
                <Icon name="bell" size={23} color={colors.gray3} />
            </TouchableOpacity>
        </View>
    );
}

export default TopBarHome;
