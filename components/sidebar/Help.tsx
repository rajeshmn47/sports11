import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions, Text } from 'react-native';
import { RAZORPAY_KEY } from '../../constants/matchConstants';
import { RootStackParamList } from '../routing/Routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../../constants/userConstants';
import { useSelector } from 'react-redux';
import { API } from '../../actions/userActions';
import BottomBar from '../BottomBar';


export type Props = NativeStackScreenProps<RootStackParamList, "Help">;
const { width, height } = Dimensions.get('window');

const Help = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();

    return (
        <View style={{ flex: 1, padding: 15 }}>
            <Text style={styles.title}>
                Contact Us
            </Text>
            <Text>
                You may contact us using the information below:
            </Text>
            <Text>
                Merchant Legal entity name: THE POWER11
            </Text>
            <Text>
                Registered Address: 32B Grahi Nova bad, Bangalore, Uttar Pradesh, PIN: 251309
            </Text>
            <Text>
                Operational Address: 32B Grahi Nova bad, Bangalore, Uttar Pradesh, PIN: 251309
            </Text>
            <Text>
                Email ID: thepowerplay@email.com
            </Text>
            <Text>
                Thank you for reaching out to us!
            </Text>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
};
export default Help;

const styles = StyleSheet.create({
    mainBody: {
        height: 400,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    title: {
        fontWeight: "600",
        textAlign: "center",
        fontSize: 18,
        marginBottom: 5
    },
    SectionStyle: {
        width: width,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: '#40b46e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    otpContainer: {
        marginHorizontal: 'auto',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    otpInputsContainer: {

    },
    otpPinCodeContainer: {
        marginHorizontal: 3
    },
    otpPinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    }
});
