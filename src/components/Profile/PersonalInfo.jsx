import {
    StyleSheet,
} from 'react-native';
import React from 'react';
import {colors} from "../../styles/Styles";


function PersonalInfo({ user }) {

    return (
        <>

        </>

    );
}

export default PersonalInfo;

const styles = StyleSheet.create({
    userInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    subtitle: {
        paddingTop: 3,
        color: colors.gray3,
        fontWeight: '500',
    },
});


