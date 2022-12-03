import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from "../styles/Styles";
import moment from "moment";
import {UpdatePillForUser} from "../services/collections";
import {auth} from "../../firebase";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightBlue,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    square: {
        width: 20,
        height: 20,
        borderWidth: 1,
        // borderColor: '#73758a',
        borderColor: colors.primary,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
    },
    squareComplete: {
        width: 20,
        height: 20,
        // backgroundColor: '#73758a',
        backgroundColor: colors.primary,
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15,
        alignItems: 'center',
    },
    txtPillTitle: {
        fontWeight: "500",
    },
    pillInfoWrapper: {
        width: "60%",
    },
    txtPillInfo: {
        color: colors.gray2,
        paddingTop: 4,
        fontSize: 12,
    },
    timeWrapper: {

    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: colors.gray3,
    }
});

//TODO: pill completed doesn't change without refreshing page

function Pill(props) {
    const {
        pill,
    } = props;

    const [pillCompleted, setPillCompleted] = useState(pill.completed);


    const handleComplete = async () => {
        await UpdatePillForUser(auth.currentUser.uid, pill.id, {
            completed: !pill.completed
        })
        setPillCompleted(!pillCompleted);
    }

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.timeWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {moment.unix(pill.time).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.pillInfoWrapper}>
                    <Text
                        style={styles.txtPillTitle}
                    >
                        {pill.title}
                    </Text>
                    <Text
                        style={styles.txtPillInfo}
                    >
                        {pill.quantity}
                    </Text>
                </View>
                <TouchableOpacity
                    style={pillCompleted ? styles.squareComplete : styles.square}
                    onPress={handleComplete}
                >
                    <View>
                        {pillCompleted ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Pill;
