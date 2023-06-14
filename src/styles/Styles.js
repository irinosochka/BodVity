import {Platform, StatusBar, StyleSheet} from 'react-native';

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
    softPink: '#F4A4A4',
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
        backgroundColor: colors.white,
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 5,
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
        // width: 319,
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
    inputContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input:{
        width: '90%',
        fontSize: 15,
        color: colors.gray3,
    },
    errorInput:{
        borderWidth: 1,
        borderColor: colors.accent,
    },
});
