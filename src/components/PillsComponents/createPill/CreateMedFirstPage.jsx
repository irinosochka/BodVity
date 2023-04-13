import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/Styles";
import {useIsFocused} from "@react-navigation/native";
import {retrieveMedicationsForUser} from "../../../services/collections";
import {auth} from "../../../../firebase";
import Icon from "react-native-vector-icons/Feather";
import {AddToStockModal} from "../../StockComponents/AddToStockModal";

function CreateMedFirstPage() {
    const [title, setTitle] = useState('');
    const [pillsInStock, setPillsInStock] = useState('')
    const [visibleDropdown, setVisibleDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [medicationItems, setMedicationItems] = useState([]);
    const [isShowAddModal, setIsShowAddModal] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newMedications = await retrieveMedicationsForUser(auth.currentUser.uid);
                setMedicationItems(newMedications);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [isFocused]);

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
        setPillsInStock(item.pillsInStock)
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
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Add new plan</Text>
            </View>
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
            <View>
                <Text style={styles.txtTitle}>
                    Quantity in stock
                </Text>
                <View style={styles.inputContainer}>
                    {isSelectedItemTheSame() ?
                        <>
                            <Text style={styles.input}>{selectedItem.pillsInStock}</Text>
                            <TouchableOpacity onPress={() => setIsShowAddModal(!isShowAddModal)}>
                                <Icon name="plus" size={25} color= {colors.gray3}/>
                            </TouchableOpacity>
                            <AddToStockModal setIsShowAddModal={setIsShowAddModal} isShowAddModal={isShowAddModal} medication={selectedItem}/>
                        </>
                        :
                        <TextInput style={styles.input}
                                   placeholder='Ex: 10'
                                   onChangeText={setPillsInStock}
                                   keyboardType='numeric'
                                   value={pillsInStock}
                        />
                    }
                </View>
            </View>
        </View>
    );
}

export default CreateMedFirstPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18
    },
    dropdownContainer: {
        position: 'absolute',
        top: 130,
        left: 20,
        right: 20,
        backgroundColor: colors.lightBlue,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 150,
        zIndex: 99,
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
        borderRadius: 14,
        paddingHorizontal: 10,
    },
    input:{
        fontSize: 15,
        color: colors.gray3,
    },
})


