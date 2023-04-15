import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/Feather";
import {CreateStyles} from "./createStyles";

const AlternativeDays = ({isAlternative, setAlternative}) => {

    const [selectMon, setSelectMon] = useState(false);
    const [selectTue, setSelectTue] = useState(false);
    const [selectWed, setSelectWed] = useState(false);
    const [selectThu, setSelectThu] = useState(false);
    const [selectFri, setSelectFri] = useState(false);
    const [selectSat, setSelectSat] = useState(false);
    const [selectSun, setSelectSun] = useState(false);

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
                                      onPress={() => setSelectMon(!selectMon)}>
                        <Text style={selectMon ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Mon</Text>
                        {
                            selectMon ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectTue ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectTue(!selectTue)}>
                        <Text style={selectTue ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Tue</Text>
                        {
                            selectTue ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectWed ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectWed(!selectWed)}>
                        <Text style={selectWed ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Wed</Text>
                        {
                            selectWed ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectThu ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectThu(!selectThu)}>
                        <Text style={selectThu ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Thu</Text>
                        {
                            selectThu ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectFri ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectFri(!selectFri)}>
                        <Text style={selectFri ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Fri</Text>
                        {
                            selectFri ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSat ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectSat(!selectSat)}>
                        <Text style={selectSat ? CreateStyles.dayOfWeekTitleSelected : CreateStyles.dayOfWeekTitle}>Sat</Text>
                        {
                            selectSat ?
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="white"/>
                                :
                                <Icon style={CreateStyles.iconDayOfWeek} name="check" size={20} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={selectSun ? CreateStyles.dayOfWeekContainerSelected : CreateStyles.dayOfWeekContainer}
                                      onPress={() => setSelectSun(!selectSun)}>
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
