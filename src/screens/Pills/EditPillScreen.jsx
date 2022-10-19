import React, {useState} from "react";
import {View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {UpdatePillForUser} from "../../services/collections";
import { auth } from '../../../firebase';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30

    },
    title:{
        marginTop: 32,
        fontSize: 28,
        marginBottom: 31,
        alignSelf:'flex-start',
        paddingLeft: 15

    },
    input:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 319,
        height: 48,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10
    },
    txtTitle:{
        fontSize: 15,
        width: 190,
        height: 38

    },
    quantityInput:{
        fontSize: 15,
        color: '#9B9B9B',
        width: 152,
        height: 48,
        marginBottom: 15,
        backgroundColor: '#F8F8F6',
        borderRadius: 14,
        paddingLeft: 10
    },
    quantity:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        paddingLeft: 40
    },
    btnSave:{
        width: 319,
        height: 56,
        backgroundColor: '#c8e2ae',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginTop: 138
    },
    txtBtnSave:{
        fontSize: 17,
        color:'#FFF'
    },
    btnBack:{
        width: 56,
        height: 56,
        alignSelf:'flex-start',
        backgroundColor: '#F8F8F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,

    }
});

function EditPillScreen({navigation, route}){

    const { pillItem } = route.params;

    const[title, setTitle]=useState(pillItem.title)
    const[notification, setNotification]=useState(pillItem.days)
    const[quantity, setQuantity]=useState(pillItem.quantity)
    const[days, setDays]=useState(pillItem.days)

    const updatePill = async () => {
        const docID = pillItem.id;
        pillItem.title = title;
        pillItem.notification = notification;
        pillItem.quantity = quantity;
        pillItem.days = days;
        UpdatePillForUser(auth.currentUser.uid, docID, {
            title: title,
            notification: notification,
            quantity: quantity,
            days: days,
        }).catch(console.error);
    };

    const onSave = () => {
        updatePill();
        navigation.navigate('allPills');
    };

    // const deletePill = async () => {
    //     // db.collection("pills").doc(id).delete()
    //     //     .catch(console.error)
    //     // //
    //     // // navigation.navigate('allPills')
    //     const docID = pillItem.id;
    //     DeletePillForUser(auth.currentUser.uid, docID)
    //         .catch(console.error);
    //     navigation.navigate('allPills');
    // }

    return(
    <KeyboardAvoidingView
        style={styles.container}
    >
        <TouchableOpacity onPress={()=> navigation.navigate('allPills')} style={styles.btnBack}>
            <Icon name="arrow-left" size={24} color="black" style={styles.arrowBack}/>
        </TouchableOpacity>

        <Text style={styles.title}>Edit Pill</Text>

        <View >
            <Text style={styles.txtTitle}>
                Pill name
            </Text>
            <TextInput style={styles.input}
                onChangeText={setTitle}
                value={title}
            />
        </View>


        <View style={styles.quantity}>
            <View>
                <Text style={styles.txtTitle}>
                    Quantity
                </Text>
                <TextInput style={styles.quantityInput}
                    onChangeText={setQuantity}
                    value={quantity}
                />
            </View>

            <View >
                <Text style={styles.txtTitle}>
                    How long?
                </Text>
                <TextInput style={styles.quantityInput}
                    onChangeText={setDays}
                    value={days}
                />
            </View>
        </View>

        <View >
            <Text style={styles.txtTitle}>
                Notification
            </Text>
            <TextInput style={styles.input}
                onChangeText={setNotification}
                value={notification}
            />
        </View>

        {/*<TouchableOpacity style={styles.btnExcluir}*/}
        {/*    onPress={()=>{*/}
        {/*        deletePill()*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <Text style={styles.txtBtnExcluir}>*/}
        {/*        Delete*/}
        {/*    </Text>*/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity style={styles.btnSave}
            onPress={()=>{
                onSave()
            }}
        >
            <Text
            style={styles.txtBtnSave}>
                Save
            </Text>

        </TouchableOpacity>

     </KeyboardAvoidingView>
    )
}
export default EditPillScreen