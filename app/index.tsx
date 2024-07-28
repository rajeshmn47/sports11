import { AppRegistry, Platform, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './../store';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import MyStackNavigator from './../components/navigation/MyStackNavigator';
import { loadToken } from '@/actions/userActions';
//import MyStackNavigator from './../components/navigation/MyStackNavigator';

export type RootStackParamList = {
    Entry: undefined;
    Home: undefined;
    Details: { matchId: string };
    Login: undefined,
    Post: undefined;
    Register: undefined,
    Create: { matchId: string, editMode: Boolean, data: any },
    Edit: { matchId: string, editMode: Boolean, data: any },
    Routes: undefined,
    Captain: { players: any[], matchId: string, team: any, editMode: Boolean },
    ConDetail: { contestId: string, contest: any, matchId: string },
    MyMatches: { userId: string }
    Payment: undefined,
    Balance: undefined,
    Winners: undefined,
    Community: undefined,
    Settings: undefined,
    HowToPlay: undefined,
    TermsandConditions: undefined,
    Help: undefined,
    Withdraw: undefined,
    View: { match: any, team: any, data: any },
    Bank: undefined,
    UserProfile: undefined,
    Kyc: undefined
};

export default function Abc() {
    return (
        <PaperProvider>
            <AlertNotificationRoot>
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <MyStackNavigator />
                    </PersistGate>
                </Provider>
            </AlertNotificationRoot>
        </PaperProvider>
    )
}

AppRegistry.registerComponent('cricket11', () => Abc)