import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Feather";
import {CreateStyles} from "./createStyles";

const AlternativeDays = ({isAlternative, setAlternative, selectedDaysOfWeek, setSelectedDaysOfWeek}) => {

    const [selectMon, setSelectMon] = useState(false);
    const [selectTue, setSelectTue] = useState(false);
    const [selectWed, setSelectWed] = useState(false);
    const [selectThu, setSelectThu] = useState(false);
    const [selectFri, setSelectFri] = useState(false);
    const [selectSat, setSelectSat] = useState(false);
    const [selectSun, setSelectSun] = useState(false);

    useEffect(() => {
        if (isAlternative) {
            setSelectedDaysOfWeek([0, 0, 0, 0, 0, 0, 0]);
        } else {
            setSelectedDaysOfWeek([1, 1, 1, 1, 1, 1, 1]);
        }
    }, [isAlternative, setSelectedDaysOfWeek]);

    const selectDayOfWeek = (day, stateVar) => {
        if (stateVar) {
            selectedDaysOfWeek[day] -= 1;
        } else {
            selectedDaysOfWeek[day] += 1;
        }
        stateVar = !stateVar;

        switch (day) {
            case 0:
                setSelectSun(stateVar);
                break;
            case 1:
                setSelectMon(stateVar);
                break;
            case 2:
                setSelectTue(stateVar);
                break;
            case 3:
                setSelectWed(stateVar);
                break;
            case 4:
                setSelectThu(stateVar);
                break;
            case 5:
                setSelectFri(stateVar);
                break;
            case 6:
                setSelectSat(stateVar);
                break;
            default:
                break;
        }
        setSelectedDaysOfWeek(selectedDaysOfWeek);
    }


    return (
        <View style={{marginBottom: 10}}>
            <View style={CreateStyles.alternativeContainer}>
                <TouchableOpacity
                    style={isAlternative ? CreateStyles.squareComplete : CreateStyles.square}
                    onPress={() => setAlternative(!isAlternative)}
                >
                    <View>
                        {isAlternative ? <Icon name="check" size={23} color="white" /> : null}
                    </View>
                </TouchableOpacity>
                <Text style={CreateStyles.checkText}>Alternative days</Text>
            </View>
            {
                isAlternative &&
                <View style={CreateStyles.weekContainer}>
                    <TouchableOpacity style={selectMon ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(1, selectMon)}>
                        <Text style={selectMon ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Mon</Text>
                        {
                            selectMon ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectTue ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(2, selectTue)}>
                        <Text style={selectTue ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Tue</Text>
                        {
                            selectTue ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectWed ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(3, selectWed)}>
                        <Text style={selectWed ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Wed</Text>
                        {
                            selectWed ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectThu ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(4, selectThu)}>
                        <Text style={selectThu ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Thu</Text>
                        {
                            selectThu ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectFri ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(5, selectFri)}>
                        <Text style={selectFri ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Fri</Text>
                        {
                            selectFri ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSat ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(6, selectSat)}>
                        <Text style={selectSat ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Sat</Text>
                        {
                            selectSat ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSun ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => selectDayOfWeek(0, selectSun)}>
                        <Text style={selectSun ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Sun</Text>
                        {
                            selectSun ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default AlternativeDays;
