import React, { createRef, useEffect, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { RAZORPAY_KEY } from '../constants/matchConstants';
import { RootStackParamList } from './routing/Routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { URL } from '../constants/userConstants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API, loadUser } from '../actions/userActions';
import { ALERT_TYPE, AlertNotificationDialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');
export type Props = NativeStackScreenProps<RootStackParamList, "Bank">;
export const UserBankAccount = () => {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [IFSCcode, setIFSCcode] = useState<string>('');
    const amountInputRef: any = createRef();

    useEffect(() => {
        setAccountNumber(user?.accountNumber);
        setIFSCcode(user?.ifsc);
    }, [user])

    const handleSubmit = () => {
        const data = {
            accountNumber: accountNumber,
            IFSCcode: IFSCcode
        };
        const url = `${URL}/auth/updateBank`
        API.post(url, { ...data })
            .then((response) => {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: "user bank account updated successfully",
                    autoClose: 1000
                })
                dispatch<any>(loadUser())
            })
            .catch((error) => {
                console.log(error.response.data);
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: error.response.data.message,
                    autoClose: 1000
                })
            });
    };

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(phone) =>
                        setAccountNumber(phone)
                    }
                    placeholder="Enter Bank Account Number" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    value={accountNumber}
                    ref={amountInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(phone) =>
                        setIFSCcode(phone)
                    }
                    placeholder="Enter IFSC code" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={amountInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    value={IFSCcode}
                    blurOnSubmit={false}
                    secureTextEntry={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>
            <View style={{ width: width, paddingHorizontal: 35, marginTop: 20 }}>
                <Button title="Submit" onPress={handleSubmit} color="#4c9452" />
            </View>
        </View>
    );
};

export default UserBankAccount;

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
        margin: 10
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