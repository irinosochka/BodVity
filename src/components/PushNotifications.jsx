import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export function Scheduling() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
}

export async function schedulePushNotification(date, pillTitle) {
    const now = new Date();
    const scheduledDate = new Date(date);
    scheduledDate.setSeconds(0);

    if (scheduledDate > now) {
        return await Notifications.scheduleNotificationAsync({
            content: {
                sound: 'default',
                title: "BodVity",
                body: 'Time to take ' + pillTitle + '.',
                data: {data: 'goes here'},
            },
            trigger: {
                date: scheduledDate,
                repeats: false,
            },
        });
    } else {
        console.log('Invalid date/time for notification');
        return null;
    }
}


export async function confirmPushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            sound: 'default',
            title: "BodVity",
            body: 'Successfully schedule your medicine.',
            data: { data: 'goes here' },
        },
        trigger: {
            seconds : 2,
        },
    });
}

export async function deletePushNotification(notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllPushNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function refillNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            sound: 'default',
            title: "BodVity",
            body: 'Please refill your stock',
            data: { data: 'goes here' },
        },
        trigger: {
            seconds : 2,
        },
    });
}

// export async function registerForPushNotificationsAsync() {
//     let token;
//     if (Constants.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//             alert('Please turn on notification!')
//             return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync()).data;
//         console.log(token);
//     } else {
//         alert('Push notifications don\'t work on simulators/emulators. Please use physical device');
//     }
//
//     if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//             pill: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }
//
//     return token;
// }

export const registerForPushNotificationsAsync = async () => {
    let token;

    if (Constants.isDevice) {
        // we check if we have access to the notification permission
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;


        if (existingStatus !== 'granted') {
            // if we don't have access to it, we ask for it
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            // user does not allow us to access to the notifications
            alert('Failed to get push token for push notification!');
            return;
        }

        // obtain the expo token
        token = (await Notifications.getExpoPushTokenAsync()).data;

        // log the expo token in order to play with it
        console.log(token);
    } else {

        // notifications only work on physcal devices
        alert('Must use physical device for Push Notifications');
    }

    // some android configuration
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
