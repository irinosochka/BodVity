import {
    StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import Avatar from "../../common/Avatar";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";


function HeaderProfile({ user }) {
    const birthdaySeconds = user.birthday.seconds;
    const birthdayMoment = moment.unix(birthdaySeconds);
    const age = moment().diff(birthdayMoment, 'years');

    const genderIconFunc = () => {
        if(user.gender === 'female' || user.gender === 'male')
            return user.gender;
        return 'transgender-outline';
    }
    const genderIcon = genderIconFunc();

    return (
        <>
            <View style={styles.userInfoContainer}>
                <Avatar radius={100} />
                <View style={{marginLeft: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={FormStyles.title}>{user.name}</Text>
                        <Ionicons name={genderIcon} size={35} color={colors.black} />
                    </View>
                    <Text style={styles.subtitle}>{user.email}</Text>
                </View>
            </View>
            <View style={{...styles.userInfoContainer, justifyContent: 'space-between',}}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Age</Text>
                    <Text style={styles.infoValue}>{age+ ' years'}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Blood Group</Text>
                    <Text style={styles.infoValue}>{user.bloodGroup}</Text>
                </View>
            </View>
        </>

    );
}

export default HeaderProfile;

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
    infoItem: {
        width: '45%',
        height: 50,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoTitle: {
        color: colors.gray2,
        opacity: 0.5,
        fontWeight: '400',
        marginBottom: 5,
    },
    infoValue: {
        color: colors.black,
        fontWeight: '600',
        marginBottom: 5,
    },
});


