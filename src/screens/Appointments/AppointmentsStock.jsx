import {
    StyleSheet, View, Text, TouchableOpacity, BackHandler, SafeAreaView
} from 'react-native';
import React, {useEffect} from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";
import SearchAppoint from "../../common/SearchAppoint";

function AppointmentsStock({navigation}) {
    const { t } = useTranslation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                navigation.goBack();
                return true;
            }
        );
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <SafeAreaView style={{...FormStyles.AndroidSafeArea, paddingHorizontal: 15}}>
                <View style={styles.header}>
                    <Text style={{...FormStyles.title}}>{t('yourAppointments')}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="x" size={35} color= {colors.gray}/>
                    </TouchableOpacity>
                </View>
                <SearchAppoint />
        </SafeAreaView>
    );
}

export default AppointmentsStock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stockWrapper: {
        flex: 1,
        paddingTop: 42,
        paddingHorizontal: 15,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});
