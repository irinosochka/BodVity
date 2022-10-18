import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from "../../screens/HomeScreen";
import AllPillScreen from "../../screens/Pills/AllPillScreen";
import AllNotesScreen from "../../screens/Notes/AllNotesScreen";
import {StyleSheet, View} from "react-native";
import CreateNoteScreen from "../../screens/Notes/CreateNoteScreen";
import NoteScreen from "../../screens/Notes/NoteScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import CreatePillScreen from "../../screens/Pills/CreatePillScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTabRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#c8e2ae',
    }
});

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

function PillStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="allPills" component={AllPillScreen} />
            <Stack.Screen options={{ headerShown: false }} name="createPill" component={CreatePillScreen} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function AppTab() {
    return (
        <Tab.Navigator headerMode="none"
                       screenOptions={({ route }) => ({
                           tabBarIcon: ({ color, size }) => {
                               let iconName;

                               switch (route.name) {
                                       case 'Home':
                                           iconName = 'home';
                                           break;
                                       case 'Pill':
                                           iconName = 'activity';
                                           break;
                                       case 'Profile':
                                            iconName = 'user';
                                            break;
                                       case 'Notes':
                                           iconName = 'list';
                                           break;
                                       default:
                                           iconName = 'circle';
                                           break;
                                   }

                                   return <Icon name={iconName} size={size} color={color} />;
                               },
                           tabBarActiveTintColor: '#586b46',
                           tabBarInactiveTintColor: '#b4b4b4',
                           tabBarShowLabel: false,
                       })}>

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Tab.Screen
                name="Pill"
                component={PillStack}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Tab.Screen
                    name="CreatePill"
                    component={CreatePillScreen}
                    options={() => ({
                        tabBarIcon: ({}) => (
                            <View>
                                <View style={styles.iconTabRound}>
                                    <Icon name="plus" size={26} color='#FFF'/>
                                </View>
                            </View>
                        ),
                        headerShown: false,
                        gestureEnabled: false,
                    })}
            />
            <Tab.Screen
                    name="Notes"
                    component={NotesStack}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            </Tab.Navigator>
    );
}
