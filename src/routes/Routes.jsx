import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../screens/LoginScreen";
import NoteScreen from "../../screens/Notes/NoteScreen";
import AllNotesScreen from "../../screens/Notes/AllNotesScreen";
import CreateNoteScreen from "../../screens/Notes/CreateNoteScreen";
import PillScreen from "../../screens/PillScreen";
import HomeScreen from "../../screens/HomeScreen";

const Stack = createNativeStackNavigator();

function NotesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="allNotes" component={AllNotesScreen} />
            <Stack.Screen options={{ headerShown: false }} name="createNote" component={CreateNoteScreen} />
            <Stack.Screen options={{ headerShown: false }} name="note" component={NoteScreen} />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                {/*<Stack.Screen*/}
                {/*    name="Splash"*/}
                {/*    component={Splash}*/}
                {/*    options={{*/}
                {/*        gestureEnabled: false,*/}
                {/*    }}*/}
                {/*/>*/}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Notes"
                    component={NotesStack}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Pill"
                    component={PillScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
