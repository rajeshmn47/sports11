import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStackNavigator from '../navigation/MyStackNavigator';

export type RootStackParamList = {
    Entry: undefined;
    Home: undefined;
    Details: {matchId:string};
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

export default function Routes() {
    return (
        <>
            <NavigationContainer independent={true}>
                <MyStackNavigator/>
            </NavigationContainer>
        </>
    );
}