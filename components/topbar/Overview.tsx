import { StatusBar } from 'expo-status-bar';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Slider } from '@miblanchard/react-native-slider';
import axios from "axios";
import { getDisplayDate } from '../../utils/dateFormat';
import { RootStackParamList } from '../routing/Routes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useSelector } from 'react-redux';


export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: string;
    userIds: [];
}


const Item = ({ data, date }: { data: Contest, date: any }) => (
    <View style={styles.contest}>
        <View>
            <Text>{data.price}</Text>
        </View>
        <View style={styles.teamContainer}>
            <View style={styles.team}>
                <Text>{data.totalSpots}</Text>
            </View>
            <View style={styles.team}>
                <Text>{data.userIds.length}</Text>
            </View>
            <View style={styles.team}>
                <Text>{data.teamsId.length}</Text>
            </View>
        </View>
        <View>
            <Slider
                value={data.teamsId.length / data.totalSpots}
                maximumTrackTintColor={'rgb(254, 244, 222)'}
                minimumTrackTintColor={'#b50000'}
                thumbTouchSize={{ width: 0, height: 0 }}
                thumbTintColor={'transparent'}
                thumbStyle={{ width: 0 }}
            />
        </View>
    </View>
);
const { width } = Dimensions.get("window")
export type Props = NativeStackScreenProps<RootStackParamList, "Details">;
export default function Overview({ navigation, livescore, matchId, match_details, matchlive }: { navigation: any, livescore: any, matchId: string, match_details: any, matchlive: any }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [contests, setContests] = useState<[]>([]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;
    useEffect(() => {
        async function getMatch() {
            const data = await axios.get(`https://backendforpuand-dream11.onrender.com/getcontests/${matchId}`);
            setContests(data.data.contests);
        }
        getMatch();
    }, []);
    useEffect(() => {
        //const i = setInterval(() => {
            //setDate(new Date());
       // }, 1000);
        return () => {
           // clearInterval(i);
        };
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.backNav}>
                    <TouchableOpacity onPressIn={() => navigation.goBack()}>
                        <IonicIcon name='arrow-back' color='#FFF' size={25} />
                    </TouchableOpacity>
                    <View style={styles.matchTitle}>
                        <Text style={styles.code}>{match_details?.teamHomeCode}
                            {'  '}v/s{'  '} {match_details?.teamAwayCode}</Text>
                        {(!((matchlive?.inPlay == "Yes") || (matchlive?.result == "Complete"))) ? <Text style={styles.brightText}>
                            {(match_details?.date && getDisplayDate(match_details.date, 'i', date))}
                        </Text> : null}
                    </View>
                </View>
                {(!((matchlive?.inPlay == "Yes") || (matchlive?.result == "Complete"))) &&
                    <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
                        <View style={styles.cash}>
                            <Icon name="wallet" style={styles.icon} size={20} color="#FFF" />
                            <Text style={styles.cashText}>
                                ₹{Math.floor(user?.wallet)}{" "} </Text>
                            <View style={styles.plusCircle}>
                                <Text style={styles.cashText}>+</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        color: '#ffffff',
        padding: 10
    },
    top: {
        backgroundColor: '#202020',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        height: 50
    },
    matchTitle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginLeft: 5
    },
    contest: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 15,
        borderRadius: 10,
        height: 150,
        backgroundColor: 'white',
        padding: 5
    },
    team: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: 40
    },
    backNav: {
        flexDirection: "row",
        alignItems: "center"
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        height: 50,
        padding: 10
    },
    stretch: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    date: {
        fontSize: 10
    },
    teamScores: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: 'rgb(117, 114, 114)',
        alignItems: 'center'
    },
    scoresA: {
        alignItems: 'flex-start',
        width: "40%",
        justifyContent: "flex-start"
    },
    scoresB: {
        alignItems: 'flex-end',
        width: "40%",
        justifyContent: "flex-end"
    },
    lightText: {
        color: 'rgb(117, 114, 114)'
    },
    brightText: {
        color: '#FFFFFF'
    },
    cashText: {
        color: '#FFFFFF',
        fontSize: 14
    },
    code: {
        color: '#FFFFFF',
        textTransform: "uppercase"
    },
    lightCode: {
        color: 'rgb(117, 114, 114)',
        textTransform: "uppercase"
    },
    status: {
        color: '#FFFFFF'
    },
    matchStatus: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(117, 114, 114)',
        marginVertical: 5
    },
    player: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%'
    },
    playerA: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5
    },
    cash: {
        backgroundColor: "#3f3f3f",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15
    },
    icon: {
        marginRight: 10
    },
    plusCircle: {
        backgroundColor: "#6eb87e",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});