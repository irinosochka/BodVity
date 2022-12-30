import {
    View,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import {
    retrievePillsForUser,
} from '../../services/collections';
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../../styles/Styles";
import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";
import PillsOfDay from "../../components/PillsComponents/PillsOfDay";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pillsWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 20,
        height: '95%',
    },
    writeTodoWrapper: {
        position: 'absolute',
        padding: 10,
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 'auto',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        width: 250,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 2.5,
    },
    newPill: {
        backgroundColor: colors.lightBlue,
        width: '50%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        marginBottom: 30,
        bottom: 0,
        marginLeft: 100,
    },
    calendar: {
        paddingTop: 25,
    }
});

function CalendarScreen() {
    const [pillItems, setPillItems] = useState([]);
    const isFocused = useIsFocused();
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {
        setSelectedDate(new Date());
        const fetchData = async () => {
            if (isFocused) {
                const newPills = await retrievePillsForUser(auth.currentUser.uid);
                setPillItems(newPills);
            }
        }
        fetchData()
            .catch(console.error)
    }, [isFocused]);

    const pillsOfDay = pillItems.filter(pillItem =>
        (moment.unix(pillItem.time.seconds).format('DD-MMM-YYYY') === moment(selectedDate).format('DD-MMM-YYYY')));

    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 20}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 110, paddingTop: 20}}
                    // calendarHeaderStyle={{color: colors.primary}}
                    dateNumberStyle={{color: colors.black, fontSize: 22}}
                    dateNameStyle={{color: colors.black}}
                    highlightDateNumberStyle={{color: colors.primary, fontSize: 20}}
                    highlightDateNameStyle={{color: colors.primary, fontSize: 9}}
                    onDateSelected={(date)=>setSelectedDate(date)}
                    scrollable
                    selectedDate={selectedDate}
                />
            </View>
            <View style={styles.pillsWrapper}>
                <PillsOfDay pillsOfDay={pillsOfDay}/>
            </View>
        </View>
    );
}

export default CalendarScreen;
