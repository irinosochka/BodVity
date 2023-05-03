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
        elevation: 1,
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
    errorInput:{
        borderWidth: 1,
        borderColor: colors.accent,
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
        width: '100%',
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
    timeContainerText:{
        color: colors.black,
    },
    doseAndTimeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 42,
        paddingHorizontal: 15,
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
        color: colors.black,
    },
    icon:{
        marginRight: 5
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
        color: colors.black,
        fontSize: 12.5,
    },
    dayOfWeekTitleSelected: {
        color: colors.white,
        fontSize: 12.5,
    },
    iconDayOfWeek: {
        marginTop: 5,
    },
    checkText: {
        fontSize: 15,
        letterSpacing: 1,
        color: colors.black
    },
    shadowForContainer:{
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    createContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 80,
    },
    scrollContainer:{
        height: 60,
    },
    chooseTimeRange:{
        height: 55,
        width: '100%',
        backgroundColor: colors.lightBlue,
        marginBottom: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonTimeRange: {
        height: 40,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    activeButton:{
        backgroundColor: colors.white,
    },
    notActiveButton:{
        backgroundColor: colors.lightBlue,
    },
    activeText:{
        fontWeight: '600',
    },
    textBtn: {
        color: colors.black,
    },
})
