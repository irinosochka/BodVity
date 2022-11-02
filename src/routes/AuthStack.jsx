import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

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
            <Stack.Screen name="Registration" component={SignUpScreen}
                          options={{
                              headerShown: false,
                              gestureEnabled: false,
                          }}
            />
        </Stack.Navigator>
    );
}
