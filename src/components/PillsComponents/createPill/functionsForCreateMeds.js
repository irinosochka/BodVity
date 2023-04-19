import React from "react";
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore";
import {auth, db} from "../../../../firebase";
import {
    confirmPushNotification,
    schedulePushNotification,
} from "../../PushNotifications";

export const createMedication = async (frequency, title, pillsInStock, startDate, endDate, reminders, isAlarm, selectedDaysOfWeek) => {

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
            const medicationDoc = await addDoc(userMedicationsRef, medicationDocument)
            const userMedicationRemindersRef = collection(db, 'users', auth.currentUser.uid, 'medications', medicationDoc.id.toString(), 'reminders')

            const createMedicationReminders = async () => {
                let plans;

                plans = await setUpReminder(frequency, reminders, startDate, endDate, title, isAlarm, selectedDaysOfWeek);
                let array = []

                for(let plan of plans) {
                    const reminderDocument = {
                        ...plan,
                        timestamp: Timestamp.fromDate(plan.timestamp),
                        updatedAt: Timestamp.fromDate(plan.updatedAt),
                        medicationId: medicationDoc.id.toString(),
                    }
                    console.log('ReminderDocument:', reminderDocument);

                    const reminderDoc = await addDoc(userMedicationRemindersRef, reminderDocument)
                    array.push({...plan, timestamp: plan.timestamp, updatedAt: plan.updatedAt, id: reminderDoc.id})
                }
                return array
            }
            return createMedicationReminders()

        } catch (error) {
            console.log('Error in inserting a new medication plan:', error.message);
        }
    }
    return createMedicationPlan();
}

const setUpReminder = async (frequency, reminders, startDate, endDate, title, isAlarm, selectedDaysOfWeek) => {
    let res = []
    let start = new Date(startDate)
    let end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    const setReminder = async (plan, date) => {
        date.setHours(plan.hour, plan.minute, 0)
        const scheduledDate = new Date(date)
        let notificationId = null;
        if(isAlarm && scheduledDate > new Date()){
            notificationId = await schedulePushNotification(scheduledDate, title)
        }
        res.push({
            plan: frequency,
            timestamp: scheduledDate,
            quantity: plan.quantity,
            isConfirmed: false,
            isMissed: true,
            updatedAt: new Date(date),
            notificationId: notificationId
        })
    }

    if (startDate === endDate) {
        for (const plan of reminders) {
            await setReminder(plan, new Date(startDate))
        }
    } else {
        while (start <= end) {
            const dayOfWeek = start.getDay()

            if (selectedDaysOfWeek[dayOfWeek]) {
                for (const plan of reminders) {
                    await setReminder(plan, new Date(start))
                }
            }

            start.setDate(start.getDate() + 1)
        }
    }
    isAlarm && await confirmPushNotification();
    return res
}
