import {useEffect, useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {colors, FormStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {Picker} from '@react-native-picker/picker';
import moment from "moment";

const monthNames = [  "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",];

const Age = ({ birthday, setBirthday, setPage, RegistrationLoader }) => {
    const [ageString, setAgeString] = useState(null);
    const [day, setDay] = useState(birthday.format('DD'));
    const [month, setMonth] = useState(monthNames[birthday.month()]);
    const [year, setYear] = useState(birthday.subtract(30, 'years').format('YYYY'));

    const handleNext = () => {
        const selectedDate = moment(`${year}-${month}-${day}`, 'YYYY-MMM-DD');
        const currentDate = new Date();
        const minDate = new Date(currentDate.getFullYear() - 11, currentDate.getMonth(), currentDate.getDate());
        if (selectedDate > currentDate) {
            alert("Please select a past date.");
            return;
        } else if (selectedDate > minDate) {
            alert("You must be at least 11 years old to use this program.");
            return;
        }
        setBirthday(selectedDate);
        setPage(4);
    };

    const handlePrevious = () => {
        const selectedDate = moment(`${year}-${month}-${day}`, 'YYYY-MMM-DD');
        setBirthday(selectedDate);
        setPage(2);
    };

    useEffect(() => {
        const birthDate = new Date(`${month} ${day}, ${year}`);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        setAgeString(Math.abs(ageDate.getUTCFullYear() - 1970));
        const lastDay = new Date(year, new Date(month + " 1, " + year).getMonth() + 1, 0).getDate();
        if (lastDay < Number(day)) {
            setDay(String(lastDay));
        }
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 100;
        if (Number(year) < minYear) {
            setYear(String(minYear));
        }
    }, [day, month, year]);

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={handlePrevious} style={{padding: 10}}>
                    <Icon name="arrow-left" size={35} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} style={{padding: 10}}>
                    <Icon name="arrow-right" size={35} color={colors.gray} />
                </TouchableOpacity>
            </View>
            <RegistrationLoader completed={"45%"} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>How old are you?</Text>
                <Text style={styles.subtitle}>Some notifications depend on it</Text>
            </View>

            <View style={styles.registrationContainer}>
                <Text style={styles.ageText}>{ageString + ' years'}</Text>

                <View style={styles.pickersContainer}>
                    <Picker
                        style={{width: '30%'}}
                        selectedValue={day}
                        onValueChange={(value, itemIndex) =>
                            setDay(value)
                        }>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                            <Picker.Item key={d} label={`${d}`} value={`${d < 10 ? "0" + d : d}`} />
                        ))}
                    </Picker>
                    <Picker
                        style={{width: '30%'}}
                        selectedValue={month}
                        onValueChange={(value, itemIndex) =>
                            setMonth(value)
                        }>
                        {monthNames.map((m) => (
                            <Picker.Item key={m} label={`${m}`} value={`${m}`} />
                        ))}
                    </Picker>
                    <Picker
                        style={{width: '30%'}}
                        selectedValue={year}
                        onValueChange={(value, itemIndex) =>
                            setYear(value)
                    }>
                        {Array.from({ length: 121 }, (_, i) => i + new Date().getFullYear() - 120).map((y) => (
                            <Picker.Item key={y} label={`${y}`} value={`${y}`} />
                        ))}
                    </Picker>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    registrationContainer:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        top: 300,
    },
    subtitle:{
        marginTop: 10,
        textAlign: 'center',
        color: colors.gray3,
    },
    pickersContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '7%'
    },
    ageText:{
        fontWeight: '500',
        fontSize: 16,
        color: colors.black
    },
});

export default Age;
