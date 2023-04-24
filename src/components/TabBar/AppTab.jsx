import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../../screens/HomeScreen";
import {StyleSheet, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import {colors} from "../../styles/Styles";
import StockScreen from "../../screens/Stock/StockScreen";
import VariantOfMedsForAdded from "../MedsComponents/VariantOfMedsForAdded";
import CreateMedScreen from "../MedsComponents/createPill/CreateMedScreen";
import StatisticsScreen from "../../screens/Statistics/StatisticsScreen";

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
        shadowColor: colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: colors.primary,
    }
});

const Stack = createNativeStackNavigator();



function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Stock" component={StockScreen} />
        </Stack.Navigator>
    );
}

// function PillStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen options={{ headerShown: false }} name="allPills" component={CalendarComponent} />
//             <Stack.Screen options={{ headerShown: false }} name="createPill" component={ChooseAddedPill} />
//             <Stack.Screen options={{ headerShown: false }} name="editMedication" component={UpdateMedicationScreen} />
//         </Stack.Navigator>
//     );
// }

function CreateMedsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="createVariants" component={VariantOfMedsForAdded} />
            <Stack.Screen options={{ headerShown: false }} name="createRegularMed" component={CreateMedScreen}  initialParams={{ frequency: 'regular' }}/>
            <Stack.Screen options={{ headerShown: false }} name="createOneTimeMed" component={CreateMedScreen}  initialParams={{ frequency: 'one-time' }}/>
            <Stack.Screen options={{ headerShown: false }} name="addMedToStock" component={CreateMedScreen}  initialParams={{ frequency: 'withoutReminders' }}/>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
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
                                           iconName = 'event';
                                           break;
                                       case 'Profile':
                                            iconName = 'person';
                                            break;
                                       case 'Analytics':
                                            iconName = 'insights';
                                            break;
                                       default:
                                           iconName = 'circle';
                                           break;
                                   }

                                   return <Icon name={iconName} size={size} color={color} />;
                               },
                           tabBarActiveTintColor: colors.gray2,
                           tabBarInactiveTintColor: '#b4b4b4',
                           tabBarShowLabel: false,
                       })}>

            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Tab.Screen
                name="Pill"
                component={CreateMedScreen}
                initialParams={{ frequency: 'one-time' }}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Tab.Screen
                    name="CreatePill"
                    component={CreateMedsStack}
                    options={() => ({
                        unmountOnBlur: true,
                        tabBarIcon: ({}) => (
                            <View>
                                <View style={styles.iconTabRound}>
                                    <Icon name="add" size={33} color='#FFF'/>
                                </View>
                            </View>
                        ),
                        headerShown: false,
                        gestureEnabled: false,
                    })}
            />
            <Tab.Screen
                name="Analytics"
                component={StatisticsScreen}
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
