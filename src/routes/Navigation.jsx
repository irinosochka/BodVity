import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTab from "../components/TabBar/AppTab";
import {UserDataContext} from "../context/UserDataContext";
import AuthStack from "./AuthStack";
import {Scheduling} from "../services/pushNotifications";

const Stack = createNativeStackNavigator();

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
