import React, { createRef, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './routing/Routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../actions/userActions';


export type Props = NativeStackScreenProps<RootStackParamList, "Payment">;
const { width, height } = Dimensions.get('window');

const Payment = ({ navigation, route }: Props) => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [amount, setAmount] = useState<string>('');
    const amountInputRef: any = createRef();

    const handlePayment = async () => {
    };

    const handleData = () => {
        const data = {
            id: user._id,
            amount: amount
        };
        const url = `${URL}/payment/addamount/`

        API.patch(url, { data })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(phone) =>
                        setAmount(phone)
                    }
                    placeholder="Enter Amount" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={amountInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>
            <View style={{ width: width, paddingHorizontal: 35, marginTop: 20 }}>
                <Button title="Pay Now" onPress={handlePayment} color="#4c9452" />
            </View>
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
