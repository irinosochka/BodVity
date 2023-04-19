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
                // plans = await setUpRemindersRegular(reminders, startDate, endDate, selectedDaysOfWeek, title)
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

// const  setUpRemindersOneTime = (reminders, startDate) => {
//     let res = []
//     let date = new Date(startDate)
//
//     reminders.forEach( plan => {
//         date.setHours(plan.hour, plan.minute, 0)
//         res = [...res, {
//             plan: 'one-time',
//             timestamp: new Date(date),
//             quantity: plan.quantity,
//             isConfirmed: false,
//             isMissed: true,
//             updatedAt: new Date(date)
//         }]
//     })
//     return res
// }
//
// const setUpReminders = async (reminders, startDate, title, isAlarm) => {
//     let res = []
//     let date = new Date(startDate)
//
//     for (const plan of reminders) {
//         date.setHours(plan.hour, plan.minute, 0)
//         const scheduledDate = new Date(date)
//         let notificationId = null;
//
//         if(isAlarm && scheduledDate > new Date()){
//             notificationId = await schedulePushNotification(scheduledDate, title)
//         }else{
//             //do nothing
//         }
//
//         res.push({
//             plan: 'one-time',
//             timestamp: scheduledDate,
//             quantity: plan.quantity,
//             isConfirmed: false,
//             isMissed: true,
//             updatedAt: new Date(date),
//             notificationId: notificationId
//         })
//     }
//     return res
// }

// const  setUpRemindersRegular = (reminders, startDate, endDate, selectedDaysOfWeek) => {
//     let res = []
//
//     let date = new Date(startDate)
//     let end = new Date(endDate)
//     end.setDate(end.getDate() + parseInt(1))
//
//     while (date <= end)
//     {
//         reminders.forEach( plan => {
//             date.setHours(plan.hour, plan.minute, 0)
//             res = [...res, {
//                 plan: 'regular',
//                 timestamp: new Date(date),
//                 quantity: plan.quantity,
//                 isConfirmed: false,
//                 isMissed: true,
//                 updatedAt: new Date(date)
//             }]
//         })
//             date.setDate(date.getDate() + parseInt(1))
//         }
//     return res
// }

// працює але не асинхронно
// const setUpRemindersRegular = (reminders, startDate, endDate, selectedDaysOfWeek) => {
//     let res = []
//     let start = new Date(startDate)
//     let end = new Date(endDate)
//     end.setDate(end.getDate() + 1)
//
//     while (start <= endDate) {
//         const dayOfWeek = start.getDay()
//         if (selectedDaysOfWeek[dayOfWeek]) {
//             reminders.forEach( plan => {
//                 const reminderDate = new Date(start)
//                 reminderDate.setHours(plan.hour, plan.minute, 0)
//                 res = [...res, {
//                     plan: 'one-time',
//                     timestamp: reminderDate,
//                     quantity: plan.quantity,
//                     isConfirmed: false,
//                     isMissed: true,
//                     updatedAt: reminderDate
//                 }]
//             })
//         }
//         start.setDate(start.getDate() + 1)
//     }
//     return res;
// }

//встановлює всі нагадування на 1 день
// const setUpRemindersRegular = async (reminders, startDate, endDate, selectedDaysOfWeek, title) => {
//     let res = []
//     let date = new Date(startDate)
//     let start = new Date(startDate)
//     let end = new Date(endDate)
//     end.setDate(end.getDate() + 1)
//
//     while (start <= end) {
//         const dayOfWeek = start.getDay()
//
//         if (selectedDaysOfWeek[dayOfWeek]) {
//             for (const plan of reminders) {
//                 date.setHours(plan.hour, plan.minute, 0)
//                 let notificationId = null;
//                 const scheduledDate = new Date(date)
//                 notificationId = await schedulePushNotification(scheduledDate, title);
//
//                 res.push({
//                     plan: 'regular',
//                     timestamp: scheduledDate,
//                     quantity: plan.quantity,
//                     isConfirmed: false,
//                     isMissed: true,
//                     updatedAt: new Date(date),
//                     notificationId: notificationId
//                 })
//             }}
//         start.setDate(start.getDate() + 1)
//     }
//     return res
// }

// const setUpReminder = async (frequency, reminders, startDate, endDate, title, isAlarm, selectedDaysOfWeek) => {
//     let res = []
//     let date = new Date(startDate)
//     let start = new Date(startDate)
//     let end = new Date(endDate)
//     end.setHours(23, 59, 59, 999)
//
//     if(frequency === 'one-time'){
//         for (const plan of reminders) {
//             date.setHours(plan.hour, plan.minute, 0)
//             const scheduledDate = new Date(date)
//             let notificationId = null;
//
//             if(isAlarm && scheduledDate > new Date()){
//                 notificationId = await schedulePushNotification(scheduledDate, title)
//             }
//             res.push({
//                 plan: frequency,
//                 timestamp: scheduledDate,
//                 quantity: plan.quantity,
//                 isConfirmed: false,
//                 isMissed: true,
//                 updatedAt: new Date(date),
//                 notificationId: notificationId
//             })
//         }
//     }else {
//         while (start <= end) {
//             const dayOfWeek = start.getDay()
//
//             if (selectedDaysOfWeek[dayOfWeek]) {
//                 for (const plan of reminders) {
//                     const reminderDate = new Date(start);
//                     reminderDate.setHours(plan.hour, plan.minute, 0)
//                     let notificationId = null;
//                     const scheduledDate = new Date(reminderDate)
//                     notificationId = await schedulePushNotification(scheduledDate, title);
//                     res.push({
//                         plan: frequency,
//                         timestamp: scheduledDate,
//                         quantity: plan.quantity,
//                         isConfirmed: false,
//                         isMissed: true,
//                         updatedAt: new Date(date),
//                         notificationId: notificationId
//                     })
//                 }}
//             start.setDate(start.getDate() + 1)
//         }
//     }
//     await confirmPushNotification();
//     return res
// }


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


// const setUpReminder = async (frequency, reminders, startDate, endDate, title, isAlarm, selectedDaysOfWeek) => {
//     const res = []
//     let date = new Date(startDate)
//     const start = new Date(startDate)
//     const end = new Date(endDate)
//
//     if (frequency === 'one-time') {
//         for (const plan of reminders) {
//             date.setHours(plan.hour, plan.minute, 0)
//             const scheduledDate = new Date(date)
//
//             if (isAlarm && scheduledDate > new Date()) {
//                 const notificationId = await schedulePushNotification(scheduledDate, title)
//                 res.push({
//                     plan: frequency,
//                     timestamp: scheduledDate,
//                     quantity: plan.quantity,
//                     isConfirmed: false,
//                     isMissed: true,
//                     updatedAt: new Date(date),
//                     notificationId
//                 })
//             }
//         }
//     } else {
//         const promises = []
//         while (start <= end) {
//             const dayOfWeek = start.getDay()
//             if (selectedDaysOfWeek[dayOfWeek]) {
//                 for (const plan of reminders) {
//                     date.setHours(plan.hour, plan.minute, 0)
//                     const scheduledDate = new Date(date)
//
//                     if (isAlarm && scheduledDate > new Date()) {
//                         const promise = schedulePushNotification(scheduledDate, title)
//                             .then(notificationId => {
//                                 res.push({
//                                     plan: frequency,
//                                     timestamp: scheduledDate,
//                                     quantity: plan.quantity,
//                                     isConfirmed: false,
//                                     isMissed: true,
//                                     updatedAt: new Date(date),
//                                     notificationId
//                                 })
//                             })
//                         promises.push(promise)
//                     }
//                 }
//             }
//             start.setDate(start.getDate() + 1)
//         }
//         await Promise.all(promises)
//     }
//
//     await confirmPushNotification()
//     return res
// }
