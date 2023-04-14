import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";

const CreateAlternativeDays = ({isAlternative, setAlternative}) => {

    const [selectMon, setSelectMon] = useState(false);
    const [selectTue, setSelectTue] = useState(false);
    const [selectWed, setSelectWed] = useState(false);
    const [selectThu, setSelectThu] = useState(false);
    const [selectFri, setSelectFri] = useState(false);
    const [selectSat, setSelectSat] = useState(false);
    const [selectSun, setSelectSun] = useState(false);

    return (
        <>
            <View style={styles.alternativeContainer}>
                <TouchableOpacity
                    style={isAlternative ? styles.squareComplete : styles.square}
                    onPress={() => setAlternative(!isAlternative)}
                >
                    <View>
                        {isAlternative ? <Icon name="check" size={23} color="white" /> : null}
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>Alternative days</Text>
            </View>
            {
                isAlternative &&
                <View style={styles.weekContainer}>
                    <TouchableOpacity style={selectMon ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectMon(!selectMon)}>
                        <Text style={selectMon ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Mon</Text>
                        {
                            selectMon ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectTue ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectTue(!selectTue)}>
                        <Text style={selectTue ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Tue</Text>
                        {
                            selectTue ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectWed ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectWed(!selectWed)}>
                        <Text style={selectWed ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Wed</Text>
                        {
                            selectWed ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectThu ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectThu(!selectThu)}>
                        <Text style={selectThu ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Thu</Text>
                        {
                            selectThu ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectFri ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectFri(!selectFri)}>
                        <Text style={selectFri ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Fri</Text>
                        {
                            selectFri ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSat ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectSat(!selectSat)}>
                        <Text style={selectSat ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Sat</Text>
                        {
                            selectSat ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSun ? styles.dayOfWeekContainerSelected : styles.dayOfWeekContainer}
                                      onPress={() => setSelectSun(!selectSun)}>
                        <Text style={selectSun ? styles.dayOfWeekTitleSelected : styles.dayOfWeekTitle}>Sun</Text>
                        {
                            selectSun ?
                                <Icon style={styles.icon} name="check" size={20} color="white"/>
                                :
                                <Icon style={styles.icon} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

export default CreateAlternativeDays;

const styles = StyleSheet.create({
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
    title:{
        fontSize: 15,
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
    icon: {
        marginTop: 5,
    },
})
