import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    return (
        <Stack.Navigator headerMode="none" initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen}
                          options={{
                              headerShown: false,
                              gestureEnabled: false,
                          }}
            />
            <Stack.Screen name="SignIn" component={SignInScreen}
                          options={{
                              headerShown: false,
                              gestureEnabled: false,
                          }}
            />
            <Stack.Screen name="Registration" component={RegistrationScreen}
                          options={{
                              headerShown: false,
                              gestureEnabled: false,
                          }}
            />
        </Stack.Navigator>
    );
}
