import {StyleSheet} from "react-native";
import {colors} from "../../../styles/Styles";

export const CreateStyles = StyleSheet.create({
    dropdownContainer: {
        position: 'absolute',
        top: 37,
        width: '100%',
        backgroundColor: colors.lightBlue,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        zIndex: 99,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 150,
    },
    dropdown: {
        flex: 1,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownText: {
        fontSize: 14,
        color: colors.gray3
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
    howLongContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeContainerRegular:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 180,
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    timeContainerOneTime:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        marginBottom: 15,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    doseAndTimeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    zIndex:{
        zIndex: 99
    },
    highTitle: {
        fontWeight: '700',
        fontSize: 18,
    },
    title:{
        fontSize: 15,
        marginBottom: 5,
        letterSpacing: 1,
    },
    icon:{
        marginRight: 5
    },
    button:{
        alignItems: 'center',
        bottom: 40,
        paddingVertical: 10,
    },
    alternativeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    square: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: colors.primary,
        opacity: 0.8,
        borderRadius: 7,
        marginRight: 10,
    },
    squareComplete: {
        width: 25,
        height: 25,
        backgroundColor: colors.primary,
        opacity: 0.8,
        borderRadius: 7,
        marginRight: 10,
        alignItems: 'center',
    },
    weekContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    dayOfWeekContainer: {
        borderRadius: 7,
        width: '12%',
        height: 70,
        backgroundColor: colors.lightBlue,
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayOfWeekContainerSelected: {
        borderRadius: 7,
        width: '12%',
        height: 70,
        backgroundColor: colors.primary,
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayOfWeekTitle: {
        color: colors.black
    },
    dayOfWeekTitleSelected: {
        color: colors.white
    },
    iconDayOfWeek: {
        marginTop: 5,
    },
    checkText: {
        fontSize: 15,
        letterSpacing: 1,
    },
})
