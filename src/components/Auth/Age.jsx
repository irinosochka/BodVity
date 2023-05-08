import {useEffect, useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {colors, FormStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import {Picker} from '@react-native-picker/picker';
import moment from "moment";
import {useTranslation} from "react-i18next";

//const monthNames = [  "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",];
//const monthNames = [ t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec'),];

const Age = ({ birthday, setBirthday, setPage, RegistrationLoader, ageString, setAgeString }) => {
    const { t } = useTranslation();
    const monthNames = [ t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec'),];

    const [day, setDay] = useState(birthday.format('DD'));
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(birthday.format('YYYY'));

    const handleNext = () => {
        const selectedDate = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
        const currentDate = new Date();
        const minDate = new Date(currentDate.getFullYear() - 11, currentDate.getMonth(), currentDate.getDate());
        if (selectedDate > currentDate) {
            alert(t('alarmFutureBirthday'));
            return;
        } else if (selectedDate > minDate) {
            alert(t('alarmLessThan11'));
            return;
        }
        setBirthday(selectedDate);
        setPage(4);
    };

    const handlePrevious = () => {
        const selectedDate = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
        setBirthday(selectedDate);
        setPage(2);
    };

    useEffect(() => {
        const selectedDate = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
        const ageDiff = moment().diff(selectedDate, 'years');
        setAgeString(ageDiff);

        const lastDay = new Date(year, month + 1, 0).getDate();
        if (lastDay < Number(day)) {
            setDay(String(lastDay));
        }
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 100;
        if (Number(year) < minYear) {
            setYear(String(minYear));
        }
        console.log(month)
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
            <RegistrationLoader completed={"40%"} />

            <View style={{marginTop: 40}}>
                <Text style={{...FormStyles.title, textAlign: 'center'}}>{t('yourAgeQuestion')}</Text>
                <Text style={styles.subtitle}>{t('ageInfo')}</Text>
            </View>

            <View style={styles.registrationContainer}>
                <Text style={styles.ageText}>{ageString + ' ' + t('years')}</Text>
                <View style={styles.pickersContainer}>
                    <Picker
                        style={{width: '25%'}}
                        selectedValue={day}
                        onValueChange={(value) => setDay(value)}
                    >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                            <Picker.Item key={d} label={`${d}`} value={`${d < 10 ? "0" + d : d}`} />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: '32%' }}
                        selectedValue={month}
                        onValueChange={(value) => setMonth(value)}
                    >
                        {monthNames.map((m, index) => (
                            <Picker.Item key={index+1} label={`${m}`} value={`${index+1}`} />
                        ))}
                    </Picker>
                    <Picker
                        style={{width: '32%'}}
                        selectedValue={year}
                        onValueChange={(value) => setYear(value)}
                    >
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
