import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../screens/LoginScreen";
import NoteScreen from "../../screens/Notes/NoteScreen";
import AllNotesScreen from "../../screens/Notes/AllNotesScreen";
import CreateNoteScreen from "../../screens/Notes/CreateNoteScreen";
import PillScreen from "../../screens/PillScreen";
import HomeScreen from "../../screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, View} from "react-native";

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
        shadowRadius: 5,
        backgroundColor: '#000',
    }
});

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
                                       case 'Notes':
                                           iconName = 'list';
                                           break;
                                       case 'Login':
                                           iconName = 'log-in';
                                           break;
                                       default:
                                           iconName = 'circle';
                                           break;
                                   }

                                   return <Icon name={iconName} size={size} color={color} />;
                               },
                               activeTintColor: '#9C27B0',
                               inactiveTintColor: '#777',
                               tabBarShowLabel: false,

                           })}>
                {/*<Stack.Screen*/}
                {/*    name="Splash"*/}
                {/*    component={Splash}*/}
                {/*    options={{*/}
                {/*        gestureEnabled: false,*/}
                {/*    }}*/}
                {/*/>*/}
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Tab.Screen
                    name="AddPill"
                    component={PillScreen}
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
                    name="Pill"
                    component={PillScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
