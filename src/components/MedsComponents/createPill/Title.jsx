import React, {useEffect, useState} from "react";
import {Keyboard, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";
import {CreateStyles} from "./createStyles";
import {useTranslation} from "react-i18next";

const Title = ({ medicationItems, onSelectItem, title, setTitle, errorTitle, setErrorTitle, setErrorStock, frequency}) => {
    const { t } = useTranslation();
    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setVisibleDropdown(false);
        setSelectedItem(null);
    }, []);

    useEffect(() => {
        setVisibleDropdown(title !== '' && filterMedicationItems().length > 0);
    }, [medicationItems, title]);

    const handleFocus = () => {
        setVisibleDropdown(true);
    };

    const handleSelectItem = (item) => {
        setTitle(item.title);
        setSelectedItem(item);
        setVisibleDropdown(false);
        onSelectItem(item);
        setErrorTitle(false);
        setErrorStock(false);
    };

    const filterMedicationItems = () => {
        const filteredItems = medicationItems?.filter((unit) => {
            return unit?.title?.toLowerCase().includes(title.toLowerCase());
        });

        if (isSelectedItemTheSame()) {
            setVisibleDropdown(false);
        }

        return filteredItems;
    };

    const isSelectedItemTheSame = () =>{
        return selectedItem && selectedItem.title.toLowerCase() === title.toLowerCase();
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <>
            {
                frequency === 'withoutReminders' ?
                    <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : CreateStyles.inputContainer}>
                        <TextInput
                            style={CreateStyles.input}
                            placeholder={t('exampleMed')}
                            onChangeText={(text) => {
                                setTitle(text);
                                if (text.length > 0) {
                                    setErrorTitle(false);
                                }
                            }}
                            value={title}
                        />
                    </View>

                    :

                    <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : CreateStyles.inputContainer}>
                        <TextInput
                            style={CreateStyles.input}
                            placeholder={t('exampleMed')}
                            onChangeText={(text) => {
                                setTitle(text);
                                if (text.length > 0) {
                                    setErrorTitle(false);
                                }
                            }}
                            value={title}
                            onFocus={handleFocus}
                        />
                        <TouchableOpacity onPress={() => setVisibleDropdown(!visibleDropdown)}>
                            <Icon name={visibleDropdown ? 'chevron-up' : 'chevron-down'} size={27} color={colors.gray3} />
                        </TouchableOpacity>
                    </View>
            }

            {visibleDropdown && frequency !== 'withoutReminders' && (
                <ScrollView style={CreateStyles.dropdownContainer}>
                    <View style={CreateStyles.dropdown}>
                        {filterMedicationItems()?.map((unit) => {
                            return (
                                <TouchableOpacity
                                    style={CreateStyles.dropdownItem}
                                    onPress={() => handleSelectItem(unit)}
                                    key={unit.id}
                                >
                                    <Text style={CreateStyles.dropdownText}>{unit.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                        {!filterMedicationItems()?.length && (
                            <View style={CreateStyles.dropdownItem}>
                                <Text style={CreateStyles.dropdownText}>{t('noMeds')}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
            </>
        </TouchableWithoutFeedback>
    );
}

export default Title;
