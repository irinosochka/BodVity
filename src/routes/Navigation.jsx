import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTab from "../components/TabBar/AppTab";
import {UserDataContext} from "../context/UserDataContext";
import AuthStack from "./AuthStack";
import {Scheduling} from "../components/PushNotifications";

const Stack = createNativeStackNavigator();

// function AuthStack() {
//     return (
//         <Stack.Navigator headerMode="none" initialRouteName="Login">
//             {/*<Stack.Screen name="register" component={Register} />*/}
//             <Stack.Screen name="Login" component={LoginScreen}
//                           options={{
//                               headerShown: false,
//                               gestureEnabled: false,
//                           }}
//             />
//         </Stack.Navigator>
//     );
// }

export default function Navigation() {
    Scheduling()

    const { userData } = useContext(UserDataContext)
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" mode="modal">

                {userData?
                    <Stack.Screen name="AppTab" component={AppTab}
                                         options={{
                                             headerShown: false,
                                             gestureEnabled: false,
                                         }}
                    />

                    :

                    <Stack.Screen name="AuthStack" component={AuthStack}
                                  options={{
                                      headerShown: false,
                                      gestureEnabled: false,
                                  }}
                    />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
