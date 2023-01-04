import {
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import React from 'react';
import {colors} from "../../styles/Styles";
import MedicationItem from "../MedicationItem";

const styles = StyleSheet.create({
    pillsWrapper: {
        flex: 1,
        paddingTop: 80,
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
});

function MedicationOfDay({ medicationOfDay }) {

    // const deletePill = async (docID, index) => {
    //     const itemsCopy = [...pillItems];
    //     await DeletePillForUser(auth.currentUser.uid, docID);
    //     itemsCopy.splice(index, 1);
    //     setPillItems(itemsCopy);
    // };

    return (
        <ScrollView style={styles.items}>
            {
                medicationOfDay.map((medItem, title, index) => (
                    <TouchableOpacity
                        key={medItem.id}
                        // onPress={() => navigation.navigate('editPill', {
                        //     pillItem,
                        //     index
                        // })}
                    >
                        <MedicationItem reminder={medItem}/>
                    </TouchableOpacity>
                ))

                // <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                // <Text>You have no medication today!</Text>
                // </View>

                // .sort(function (a,b){
                //     let dateA=new Date(a.pillItem.time), dateB=new Date(b.pillItem.time)
                //     return dateA-dateB
                // })
            }
        </ScrollView>
    );
}

export default MedicationOfDay;
