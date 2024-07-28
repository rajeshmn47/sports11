import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../routing/Routes';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import DetailsScreen from '../DetailsScreen';
import LoginScreen from '../Login';
import EntryScreen from '../entry/Entry';
import RegisterScreen from '../Register';
import UserProfile from '../UserProfile';
import MyMatches from '../MyMatches';
import CreateTeam from '../CreateTeam';
import EditTeam from '../EditTeam';
import SelectCaptain from '../Captain';
import ContestDetail from '../ContestDetail';
import UserBankAccount from '../UserBankAccount';
import Withdraw from '../Withdraw';
import Winners from '../winners/Winners';
import Balance from '../Balance';
import Community from '../community/Community';
import Settings from '../sidebar/Settings';
import HowToPlay from '../sidebar/HowToPlay';
import TermsandConditions from '../sidebar/TermsandConditions';
import Help from '../sidebar/Help';
import KYC from '../sidebar/KYC';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from '@/actions/userActions';

const Stack = createStackNavigator<RootStackParamList>();

export default function MyStackNavigator() {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(loadToken())
    }, []
    )
    return (
            <>
            {userToken == null ? (
                // No token found, user isn't signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Entry" component={EntryScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                // User is signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MyMatches" component={MyMatches} options={{ headerShown: false }} />
                        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="UserProfile" component={UserProfile} />
                        <Stack.Screen name="Create" component={CreateTeam} options={{ headerShown: false }}/>
                        <Stack.Screen name="Edit" component={EditTeam} />
                        <Stack.Screen name="Captain" component={SelectCaptain} />
                        <Stack.Screen name="ConDetail" component={ContestDetail} />
                        <Stack.Screen name="Balance" component={Balance} />
                        <Stack.Screen name="Bank" component={UserBankAccount} />
                        <Stack.Screen name="Withdraw" component={Withdraw} />
                        <Stack.Screen name="Winners" component={Winners} />
                        <Stack.Screen name="Community" component={Community} />
                        <Stack.Screen name="Settings" component={Settings} />
                        <Stack.Screen name="HowToPlay" component={HowToPlay} options={{ headerShown: false }} />
                        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
                        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
                        <Stack.Screen name="Kyc" component={KYC} options={{ headerShown: true }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}
