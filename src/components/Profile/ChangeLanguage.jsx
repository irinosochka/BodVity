import {
    StyleSheet, Text, TouchableOpacity, View, SafeAreaView
} from 'react-native';
import React, {useState} from 'react';
import {colors, FormStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";
import {CreateStyles} from "../MedsComponents/createPill/createStyles";
import i18next from "i18next";
import i18n from "i18next";


function ChangeLanguage({ navigation }) {
    const { t } = useTranslation();
    const currentLanguage = i18next.language;
    const [language, setLanguage] = useState(currentLanguage);

    const handleChangeLanguage = async (language) => {
        await i18n.changeLanguage(language);
        setLanguage(language);
    }

    return (
        <SafeAreaView style={{...FormStyles.AndroidSafeArea, paddingHorizontal: 15}}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={{alignItems: 'flex-end'}}>
                <Icon name="x" size={35} color={colors.gray} />
            </TouchableOpacity>
            <View style={{marginTop: '10%' }}>
                <Text style={FormStyles.title}>{t('changeLanguage')}</Text>
                <Text style={styles.languageInfo}>{t('changeLanguageInfo')}</Text>
            </View>
            <View style={{marginTop: 20}}>
                <View style={{...CreateStyles.alternativeContainer, marginTop: 20}}>
                    <TouchableOpacity
                        style={language === 'en' ? CreateStyles.squareComplete : CreateStyles.square}
                        onPress={() => handleChangeLanguage('en')}
                    >
                        <View>
                            {language === 'en' ? <Icon name="check" size={23} color="white" /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text style={CreateStyles.checkText}>English</Text>
                </View>
                <View style={{...CreateStyles.alternativeContainer, marginTop: 20}}>
                    <TouchableOpacity
                        style={language === 'pl' ? CreateStyles.squareComplete : CreateStyles.square}
                        onPress={() => handleChangeLanguage('pl')}
                    >
                        <View>
                            {language === 'pl' ? <Icon name="check" size={23} color="white" /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text style={CreateStyles.checkText}>Polski</Text>
                </View>
                <View style={{...CreateStyles.alternativeContainer, marginTop: 20}}>
                    <TouchableOpacity
                        style={language === 'ua' ? CreateStyles.squareComplete : CreateStyles.square}
                        onPress={() => handleChangeLanguage('ua')}
                    >
                        <View>
                            {language === 'ua' ? <Icon name="check" size={23} color="white" /> : null}
                        </View>
                    </TouchableOpacity>
                    <Text style={CreateStyles.checkText}>Українська</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ChangeLanguage;

const styles = StyleSheet.create({
    languageInfo: {
        color: colors.gray3,
        marginTop: 8,
    },
});


