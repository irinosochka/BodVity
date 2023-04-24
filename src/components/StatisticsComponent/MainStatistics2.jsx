import {
    StyleSheet, Text, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from "../../styles/Styles";
import ProgressCircle from 'progress-circle-react-native';
import moment from "moment";


// function MainStatistics2({medications,startDate, endDate}) {
//     const [completedReminders, setCompletedReminders] = useState([]);
//     const [missedReminders, setMissedReminders] = useState([]);
//     const [percentCompleted, setPercentCompleted] = useState(0);
//     const [remindersInRange, setRemindersInRange] = useState([]);
//
//     useEffect(() => {
//         const reminders = getRemindersInRange(medications, startDate, endDate);
//         setRemindersInRange(reminders);
//         const completed = remindersInRange.filter(medItem => medItem.isConfirmed === true);
//         setCompletedReminders(completed);
//         const missed = remindersInRange.filter(medItem => medItem.isConfirmed === false);
//         setMissedReminders(missed);
//         setPercentCompleted(completed.length / remindersInRange.length * 100);
//     }, [medications, startDate, endDate]);
//
//     const getRemindersInRange = async (medications, startDate, endDate) => {
//         const reminders = [];
//         medications.forEach(medication => {
//             medication.reminders.forEach(reminder => {
//                 const reminderDate = moment.unix(reminder.timestamp.seconds);
//                 if (reminderDate.isBetween(startDate, endDate, null, '[]')) {
//                     reminders.push(reminder);
//                 }
//             });
//         });
//         return reminders;
//     }
//
//     return (
//         <View style={styles.shadowForContainer}>
//             <View style={styles.statsContainer}>
//                 <View style={{alignItems: 'center'}}>
//                     <ProgressCircle
//                         percent={percentCompleted}
//                         radius={75}
//                         borderWidth={22}
//                         color={colors.primary}
//                         shadowColor={colors.lightBlue}
//                         bgColor="#fff"
//                     >
//                         <Text style={{fontSize: 30, fontWeight: '500'}}>{parseInt(percentCompleted) + '%'}</Text>
//                     </ProgressCircle>
//                 </View>
//                 <View style={styles.medsItemWrapper}>
//                     <View style={styles.medItemWrapper}>
//                         <Text style={styles.quantityMedTitle}>All</Text>
//                         <Text style={styles.quantityMedText}>{remindersInRange.length + ' meds'}</Text>
//                     </View>
//                     <View style={styles.medItemWrapper}>
//                         <Text style={styles.quantityMedTitle}>Taken</Text>
//                         <Text style={styles.quantityMedText}>{completedReminders.length + ' meds'}</Text>
//                     </View>
//                     <View style={styles.medItemWrapper}>
//                         <Text style={styles.quantityMedTitle}>Missed</Text>
//                         <Text style={styles.quantityMedText}>{missedReminders.length + ' meds'}</Text>
//                     </View>
//                 </View>
//
//             </View>
//         </View>
//     );
// }

function MainStatistics2({medications, startDate, endDate}) {
    const [remindersInRange, setRemindersInRange] = useState([]);
    const [completedReminders, setCompletedReminders] = useState([]);
    const [missedReminders, setMissedReminders] = useState([]);
    const [percentCompleted, setPercentCompleted] = useState(0);

    useEffect(() => {
        const reminders = getRemindersInRange(medications, startDate, endDate);
        setRemindersInRange(reminders);
        const completed = reminders.filter(medItem => medItem.isConfirmed === true);
        setCompletedReminders(completed);
        const missed = reminders.filter(medItem => medItem.isConfirmed === false);
        setMissedReminders(missed);
        if (reminders.length > 0) {
            setPercentCompleted(completed.length / reminders.length * 100);
        } else {
            setPercentCompleted(0);
        }
    }, [medications, startDate, endDate]);


    const getRemindersInRange = (medications, startDate, endDate) => {
        const remindersInRange = [];
        medications.forEach(medication => {
            medication.reminders.forEach(reminder => {
                const reminderDate = moment.unix(reminder.timestamp.seconds);
                if (reminderDate.isBetween(startDate, endDate, null, '[]')) {
                    remindersInRange.push(reminder);
                }
            });
        });
        return remindersInRange;
    }

    return (
        <View style={styles.shadowForContainer}>
            <View style={styles.statsContainer}>
                <View style={{alignItems: 'center'}}>
                    <ProgressCircle
                        percent={percentCompleted}
                        radius={75}
                        borderWidth={22}
                        color={colors.primary}
                        shadowColor={colors.lightBlue}
                        bgColor="#fff"
                    >
                        <Text style={{fontSize: 30, fontWeight: '500'}}>{parseInt(percentCompleted) + '%'}</Text>
                    </ProgressCircle>
                </View>
                <View style={styles.medsItemWrapper}>
                    <View style={styles.medItemWrapper}>
                        <Text style={styles.quantityMedTitle}>All</Text>
                        <Text style={styles.quantityMedText}>{remindersInRange.length + ' meds'}</Text>
                    </View>
                    <View style={styles.medItemWrapper}>
                        <Text style={styles.quantityMedTitle}>Taken</Text>
                        <Text style={styles.quantityMedText}>{completedReminders.length + ' meds'}</Text>
                    </View>
                    <View style={styles.medItemWrapper}>
                        <Text style={styles.quantityMedTitle}>Missed</Text>
                        <Text style={styles.quantityMedText}>{missedReminders.length + ' meds'}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}

export default MainStatistics2;

const styles = StyleSheet.create({
    shadowForContainer:{
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    statsContainer: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 25,
    },
    medsInfo: {
        width: '50%',
        alignItems: 'center',
    },
    allMedsText: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 20,
    },
    quantityMedTitle:{
        color: colors.gray
    },
    quantityMedText: {
        marginTop: 7,
        fontWeight: '600',
    },
    medsItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    medItemWrapper:{
        alignItems: 'center',
    },
});
