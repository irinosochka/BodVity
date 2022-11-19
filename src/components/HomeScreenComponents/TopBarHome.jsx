import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {FormStyles} from "../../styles/Styles";
import {UserDataContext} from "../../context/UserDataContext";
import Icon from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
    homeWrapper: {
        flex: 1,
        paddingTop: 80,
    },
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
            <TouchableOpacity>
                <Icon name="bell" size={23} color={'#9B9B9B'} />
            </TouchableOpacity>
        </View>
    );
}

export default TopBarHome;
