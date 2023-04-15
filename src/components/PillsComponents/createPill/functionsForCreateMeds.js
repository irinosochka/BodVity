import React from "react";
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore";
import {auth, db} from "../../../../firebase";
import {
    confirmPushNotification,
    scheduleOneTimePushNotification,
    schedulePushNotification
} from "../../PushNotifications";

export const createMedication = async (frequency, title, pillsInStock, startDate, endDate, reminders) => {

    const createMedicationPlan = async () => {
        const userMedicationsRef = collection(db, 'users', auth.currentUser.uid, 'medications')

        const medicationDocument = {
            createdAt: serverTimestamp(),
            title: title,
            pillsInStock: parseInt(pillsInStock),
            startDate: Timestamp.fromDate(startDate),
            endDate: Timestamp.fromDate(endDate),
            updatedAt: serverTimestamp()
        }

        try{
            await addDoc(userMedicationsRef, medicationDocument).then( medicationDoc => {

                const userMedicationRemindersRef = collection(db, 'users', auth.currentUser.uid, 'medications', medicationDoc.id.toString(), 'reminders')

                const createMedicationReminders = async () => {
                    let plans;
                    if(frequency === 'regular')
                        plans = setUpRemindersRegular(reminders, startDate, endDate)
                    else if(frequency === 'one-time')
                        plans = setUpRemindersOneTime(reminders, startDate)

                    let array = []

                    for(let plan of plans) {
                        const reminderDocument = {
                            ...plan,
                            timestamp: Timestamp.fromDate(plan.timestamp),
                            updatedAt: Timestamp.fromDate(plan.updatedAt),
                            medicationId: medicationDoc.id.toString(),
                        }
                        console.log('ReminderDocument:', reminderDocument);

                        await addDoc(userMedicationRemindersRef, reminderDocument).then(reminderDoc => {
                            array.push({...plan, timestamp: plan.timestamp, updatedAt: plan.updatedAt, id: reminderDoc.id})
                        }).catch(e => console.log('Error in adding reminders to a medication:', e.message))
                    }
                }
                createMedicationReminders()
            })

        } catch (error) {
            console.log('Error in inserting a new medication plan:', error.message);
        }
    }
    await createMedicationPlan()

    await confirmPushNotification()

    for(let reminder of reminders)
    {
        if(frequency === 'regular')
            await schedulePushNotification(parseInt(reminder.hour), parseInt(reminder.minute), parseInt(pillsInStock), title)
        else if(frequency === 'one-time')
            await scheduleOneTimePushNotification(parseInt(reminder.hour), parseInt(reminder.minute), title)
    }
}

const  setUpRemindersOneTime = (reminders, startDate) => {
    let res = []
    let date = new Date(startDate)

    reminders.forEach( plan => {
        date.setHours(plan.hour, plan.minute, 0)
        res = [...res, {
            plan: 'one-time',
            timestamp: new Date(date),
            quantity: plan.quantity,
            isConfirmed: false,
            isMissed: true,
            note: plan.note,
            updatedAt: new Date(date)
        }]
    })
    return res
}

const  setUpRemindersRegular = (reminders, startDate, endDate) => {
    let res = []

    let date = new Date(startDate)

    while(date <= endDate) {
        reminders.forEach( plan => {
            date.setHours(plan.hour, plan.minute, 0)
            res = [...res, {
                plan: 'regular',
                timestamp: new Date(date),
                quantity: plan.quantity,
                isConfirmed: false,
                isMissed: true,
                note: plan.note,
                updatedAt: new Date(date)
            }]
        })
            date.setDate(date.getDate() + parseInt(1))
        }
    return res
}