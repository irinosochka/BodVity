import React, { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import {colors} from "../styles/Styles";

function Avatar({ navigation, radius}) {
    const { userData, setUserData } = useContext(UserDataContext);

    let imageSource;

    switch(userData.avatar) {
        case 1:
            imageSource = require('../../assets/avatars/avatar1.png');
            break;
        case 2:
            imageSource = require('../../assets/avatars/avatar2.png');
            break;
        case 3:
            imageSource = require('../../assets/avatars/avatar3.png');
            break;
        case 4:
            imageSource = require('../../assets/avatars/avatar4.png');
            break;
        case 5:
            imageSource = require('../../assets/avatars/avatar5.png');
            break;
        case 6:
            imageSource = require('../../assets/avatars/avatar6.png');
            break;
    }

    return (
        <TouchableOpacity style={{...styles.avatar, width: radius, height: radius, borderRadius: radius/2}} onPress={() => navigation.navigate('Profile')}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
}

export default Avatar;


const styles = StyleSheet.create({
    avatar: {
        // width: 80,
        // height: 80,
        // borderRadius: 40,
        overflow: "hidden",
        backgroundColor: colors.lightBlue
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
