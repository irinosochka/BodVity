import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const fullWidth = Dimensions.get('window').width; //full width

export const colors = {
    accent: "#F3534A",
    primary: "#3879E9",
    secondary: "#2BDA8E",
    tertiary: "#FFE358",
    pink: '#EE9CDA',
    quaternary: '#222566',
    black: '#222566',
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#4E515A",
    gray3: "#909090",
    lightBlue: "#EBF1FC",
    lightGray: '#F7F9FB',
};

export const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
};

export const FormStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: fullWidth,
        backgroundColor: colors.white,
    },
    containerSub: {
        width: '80%'
    },
    title: {
        fontSize: sizes.h1,
        fontWeight: "bold",
        color: colors.black,
    },
    subtitle: {
        marginBottom: sizes.padding / 2,
        fontSize: sizes.h3,
        fontWeight: "bold",
        color: colors.black,
    },
    textInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.gray2,
        borderRadius: 0,
        borderWidth: 0,
        fontSize: sizes.body,
        fontWeight: '500',
        color: colors.black,
        height: sizes.base * 3,
    },
    btnShadow: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    btn:{
        opacity: 0.9,
        width: 319,
        height: sizes.base * 3.5,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        borderRadius: 14,
    },
    btnText:{
        fontSize: 16,
        color:'#FFF',
        textAlign: "center",
        fontWeight: "500",
    },
    error: {
        color: colors.accent,
        fontWeight: '500',
        fontSize: sizes.body,
    },
});
