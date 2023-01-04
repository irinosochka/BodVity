import React, {createContext, useContext, useEffect, useState} from 'react'
import {collection, getDocs, orderBy, query} from "@firebase/firestore";
import {auth, db} from "../../firebase";

export const MedicationsContext = createContext();

export function useMedications() {
    return useContext(MedicationsContext)
}

export const MedicationsContextProvider = ({children}) => {
    const [medications, setMedications] = useState([])

    const fetchData = async (user) => {
        setMedications(prev => [])

        const medicationsRef = collection(db, 'users', user.uid, 'medications')
        const medicationsDocs = await getDocs(medicationsRef)

        medicationsDocs.docs.map( (medication) => {
            const getReminders = async () => {
                const remindersRef = query(collection(db, 'users', user.uid, 'medications', medication.id, 'reminders'), orderBy('timestamp'))
                const remindersDocs = await getDocs(remindersRef)

                return {...medication.data(), id: medication.id, reminders: remindersDocs.docs.map(reminder => ({...reminder.data(), id: reminder.id, timestamp: reminder.data().timestamp.toDate()}))}
            }

            getReminders()
                .then( medication => {
                    setMedications(prev => [...prev, medication])
                }).catch(e => console.log(e))
        })

    }

    async function get() {
        await fetchData(auth.currentUser)
    }

    const medicationsValue = {
        medications,
        get,
        setMedications
    }


    useEffect(
        () => {
            return () => {
                setMedications()
            }
        }
        , [])

    return (
        <MedicationsContext.Provider
            value={medicationsValue}
        >
            {children}
        </MedicationsContext.Provider>
    )
}
