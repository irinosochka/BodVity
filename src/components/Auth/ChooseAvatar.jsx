import React  from 'react';
import {
    TouchableOpacity, StyleSheet, Text, View, Image, ScrollView
} from 'react-native';
import {colors, FormStyles} from '../../styles/Styles';
import Icon from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";
const ChooseAvatar = ({avatarNumber, setAvatarNumber, setPage, RegistrationLoader, }) => {
    const { t } = useTranslation();

    const handleSelectAvatarNumber = (number) => {
        setAvatarNumber(number);
    };

    const handleNext = () => {
        avatarNumber.length !== 0 ? setPage(6) : alert(t('alarmAvatar'));
    }

    let imageSources = [
        require('../../../assets/avatars/avatar1.png'),
        require('../../../assets/avatars/avatar2.png'),
        require('../../../assets/avatars/avatar3.png'),
        require('../../../assets/avatars/avatar4.png'),
        require('../../../assets/avatars/avatar5.png'),
        require('../../../assets/avatars/avatar6.png'),
    ];


    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setPage(4)} style={{padding: 10}}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} style={{padding: 10}}>
                    <Icon name="arrow-right" size={35} color={colors.gray} />
                </TouchableOpacity>
            </View>

            <RegistrationLoader completed={'80%'} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>{t('yourAvatarQuestion')}</Text>
                <Text style={styles.subtitle}>{t('avatarInfo')}</Text>
            </View>

            <ScrollView style={{paddingTop: 110}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={{...styles.registrationContainer, alignItems: 'center',}}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 0 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(0)}>
                        <Image source={imageSources[0]} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 1 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(1)}>
                        <Image source={imageSources[1]} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 2 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(2)}>
                        <Image source={imageSources[2]} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 3 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(3)}>
                        <Image source={imageSources[3]} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 4 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(4)}>
                        <Image source={imageSources[4]} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{...styles.avatar}, avatarNumber === 5 && {borderColor: colors.primary}]} onPress={() => handleSelectAvatarNumber(5)}>
                        <Image source={imageSources[5]} style={styles.image} />
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </>
    );
};

export default ChooseAvatar;


const styles = StyleSheet.create({
    registrationContainer:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    subtitle:{
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
        color: colors.gray3,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        backgroundColor: colors.lightBlue,
        borderWidth: 1,
        borderColor: colors.lightBlue
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
