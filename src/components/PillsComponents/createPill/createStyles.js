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
        fontSize: 18
    },
    title:{
        fontSize: 15,
        marginBottom: 5,
    },
    icon:{
        marginRight: 5
    },
    button:{
        alignItems: 'center',
        bottom: 40,
        paddingVertical: 10,
    },
})
