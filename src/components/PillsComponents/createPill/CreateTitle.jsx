import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../../styles/Styles";

const CreateTitle = ({ medicationItems, onSelectItem, title, setTitle, }) => {
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

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Ibuprofen"
                    onChangeText={setTitle}
                    value={title}
                    onFocus={handleFocus}
                />
                <TouchableOpacity onPress={() => setVisibleDropdown(!visibleDropdown)}>
                    <Icon name={visibleDropdown ? 'chevron-up' : 'chevron-down'} size={27} color={colors.gray3} />
                </TouchableOpacity>
            </View>

            {visibleDropdown && (
                <ScrollView style={styles.dropdownContainer}>
                    <View style={styles.dropdown}>
                        {filterMedicationItems()?.map((unit) => {
                            return (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelectItem(unit)}
                                    key={unit.id}
                                >
                                    <Text style={styles.dropdownText}>{unit.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                        {!filterMedicationItems()?.length && (
                            <View style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>No results found</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </>
    );
}

export default CreateTitle;


const styles = StyleSheet.create({
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
        fontSize: 15,
        color: colors.gray3,
    },
})


