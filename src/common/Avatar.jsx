import React, { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

function Avatar({ navigation }) {
    const { userData, setUserData } = useContext(UserDataContext);

    let imageSource;

    switch(userData.avatar) {
        case 1:
            imageSource = require('../../assets/avatar/avatar1.png');
            break;
        case 2:
            imageSource = require('../../assets/avatar/avatar2.png');
            break;
        case 3:
            imageSource = require('../../assets/avatar/avatar3.png');
            break;
        case 4:
            imageSource = require('../../assets/avatar/avatar4.png');
            break;
        case 5:
            imageSource = require('../../assets/avatar/avatar5.png');
            break;
        case 6:
            imageSource = require('../../assets/avatar/avatar6.png');
            break;
        case 7:
            imageSource = require('../../assets/avatar/avatar7.png');
            break;
        case 8:
            imageSource = require('../../assets/avatar/avatar8.png');
            break;
        case 9:
            imageSource = require('../../assets/avatar/avatar9.png');
            break;
        default:
            imageSource = require('../../assets/avatar/avatar9.png');
            break;
    }

    return (
        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
}

export default Avatar;


const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
