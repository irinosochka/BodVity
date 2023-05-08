import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles/Styles";
import React, {useState} from "react";
import {CreateStyles} from "../MedsComponents/createPill/createStyles";
import {UpdateAppointmentForUser} from "../../services/collections";
import {auth} from "../../../firebase";
import {useTranslation} from "react-i18next";
import {serverTimestamp} from "firebase/firestore";
import moment from "moment";
import DataAndTime from "../MedsComponents/createAppointment/DataAndTime";
import {ButtonCustom} from "../../common/Button";

export function EditAppointmentModal({isShowEditModal, setIsShowEditModal, appointment, setTitle, setNote, setDateAppointment}) {
    const { t } = useTranslation();
    const [titleEdit, setTitleEdit] = useState(appointment.title);
    const [noteEdit, setNoteEdit] = useState(appointment.note);
    const [errorTitle, setErrorTitle] = useState(false);
    const [dateAppointmentEdit, setDateAppointmentEdit] = useState(new Date(moment.unix(appointment.appointmentDate.seconds)))

    const handleChangeAndClose = async() => {
        if(titleEdit.length === 0){
            setErrorTitle(true);
        }else{
            await UpdateAppointmentForUser(auth.currentUser.uid, appointment.id, {
                title: titleEdit,
                note: noteEdit,
                appointmentDate: new Date(dateAppointmentEdit),
                updatedAt: serverTimestamp(),
            })
            setNote(noteEdit);
            setTitle(titleEdit);
            setDateAppointment(dateAppointmentEdit);
            setIsShowEditModal(!isShowEditModal);
        }
    }

    return (
        <Modal transparent={true} visible={isShowEditModal} animationType='fade'>
            <TouchableOpacity style={styles.modalBackground} onPress={() => setIsShowEditModal(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{t('editAppointment')}</Text>
                        <View style={styles.modalMedInfo}>
                            <View style={errorTitle ? {...CreateStyles.inputContainer, ...CreateStyles.errorInput} : {...CreateStyles.inputContainer}}>
                                <View style={styles.inputWithButton}>
                                    <TextInput style={styles.input}
                                               placeholder={t('exampleAppointment')}
                                               onChangeText={(text) => {
                                                   setTitleEdit(text);
                                                   if (text.length > 0) {
                                                       setErrorTitle(false);
                                                   }
                                               }}
                                               value={titleEdit}
                                    />
                                </View>
                            </View>
                            <View style={{...CreateStyles.inputContainer}}>
                                <View style={styles.inputWithButton}>
                                    <TextInput style={styles.input}
                                               placeholder={t('exampleNoteForAppointment')}
                                               onChangeText={(text) => {
                                                   setNoteEdit(text);
                                               }}
                                               value={noteEdit}
                                    />
                                </View>
                            </View>
                            <DataAndTime dateAppointment={dateAppointmentEdit} setDateAppointment={setDateAppointmentEdit} />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <ButtonCustom buttonText={t('saveBtn')} onPress={handleChangeAndClose} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContainer: {
        position: 'absolute',
        top: '30%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 14,
        paddingVertical: 20,
    },
    modalMedInfo: {
        flex: 1,
        paddingHorizontal: 10,
    },
    input:{
        fontSize: 15,
        color: colors.gray3,
        width: '80%',
        height: 45,
        backgroundColor: colors.lightBlue,
        borderBottomLeftRadius: 14,
        borderTopLeftRadius: 14,
        paddingLeft: 10,
    },
    inputWithButton: {
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        marginBottom: 12,
        color: colors.black,
        textAlign: 'center',
        fontWeight: '500',
    },
})
