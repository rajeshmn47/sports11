import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './routing/Routes';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
import { AntDesign } from '@expo/vector-icons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
import { getImgurl } from '../utils/images';
import { URL } from '../constants/userConstants';
import { API } from '../actions/userActions';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    useFonts,
} from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';


export interface Contest {
    _id: string;
    playerName: string;
    image: string;
    isSelected: Boolean;
    isCaptain: Boolean;
    isViceCaptain: Boolean;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Captain">;
export default function SelectCaptain({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_500Medium
    });
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [date, setDate] = useState<Date>(new Date());
    const [commentary, setCommentary] = useState<any>();
    const [livescore, setLivescore] = useState<any>();
    const [contests, setContests] = useState([]);
    const layout: any = useWindowDimensions();
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const [match, setMatch] = useState<any>(null);
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [next, setNext] = useState<Boolean>(false);
    const [nonPlayers, setNonPlayers] = useState<any[]>([]);
    const [lmPlayers, setLmplayers] = useState<any[]>([]);
    const [live, setLive] = useState<any>();


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'wk', title: 'Wk' },
        { key: 'bat', title: 'Bat' },
        { key: 'ar', title: 'Ar' },
        { key: 'bowl', title: 'Bowl' }
    ]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;

    useEffect(() => {
        async function getPlayers() {
            setPlayers([...route.params.players])
            const pl = route.params.players.map((obj) => ({
                ...obj,
                isCaptain: obj.playerId == route.params.team?.captainId ? true : false,
                isViceCaptain: obj.playerId == route.params.team?.viceCaptainId ? true : false,
            }))
            setPlayers([...pl])
        }
        getPlayers();
    }, [route.params.matchId]);
    const handleCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isCaptain = true;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const nHandleCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isCaptain = false;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const handleVCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isViceCaptain = true;
            }
            return p;
        });
        setPlayers([...po]);
    };

    const nHandleVCaptain = (i: string) => {
        const po = players.map((p) => {
            if (p._id === i) {
                p.isViceCaptain = false;
            }
            return p;
        });
        setPlayers([...po]);
    };

    function isCandVcselected() {
        const a = players.find((s) => s.isCaptain === true);
        const b = players.find((s) => s.isViceCaptain === true);
        return a && b;
    }

    const handleSave = () => {
        const dataToSend: any = {
            players: players,
            matchId: route.params.matchId,
            captainId: players.find((p) => p.isCaptain == true).playerId,
            vicecaptainId: players.find((p) => p.isViceCaptain == true).playerId,
        }
        let url = route.params.editMode ? `${URL}/updateTeam/${route.params.team?._id}` : `${URL}/saveteam/${route.params.matchId}`;
        if (route.params.editMode) {
            API.put(url, dataToSend).then((responseJson) => {
                //Hide Loader
                setLoading(false);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Congrats! your team is created successfully',
                    autoClose: 500
                })
                navigation.navigate('Details', { matchId: route.params.matchId });
                // If server response message same as Data Matched
            }).catch((error: any) => {
                console.error(error)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: error.response.data.message,
                    autoClose: 500
                })
                navigation.navigate('Details', { matchId: route.params.matchId });
                // Error; SMS not sent
                // ...
            });
        }
        else {
            API.post(url, dataToSend).then((responseJson) => {
                //Hide Loader
                setLoading(false);
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Congrats! your team is created successfully',
                    autoClose: 500
                })
                navigation.navigate('Details', { matchId: route.params.matchId });
                // If server response message same as Data Matched
            }).catch((error: any) => {
                console.error(error)
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failure',
                    textBody: error.response.data.message,
                    autoClose: 500
                })
                navigation.navigate('Details', { matchId: route.params.matchId });
                // Error; SMS not sent
                // ...
            });
        }
    };
    const Item = ({ data, date }: { data: Contest, date: any }) => (
        <View>
            <View style={styles.playerContainer}>
                <View style={{ alignItems: "center", justifyContent: "center", overflow: 'hidden', height: 50, width: 50, borderRadius: 50 }}>
                    <Image source={{ uri: getImgurl(data.image, data.playerName) }} style={{ height: 50, width: 50, borderRadius: 5 }} />
                </View>
                <View style={styles.team}>
                    <Text style={{ color: "#FFF", textTransform: "capitalize", fontFamily: "Poppins_500Medium" }}>{data.playerName}</Text>
                </View>
                <TouchableHighlight onPress={() => data.isCaptain ? nHandleCaptain(data._id) : handleCaptain(data._id)}>
                    <View style={data.isCaptain ? styles.captain : styles.no}>
                        <Text style={data.isCaptain ? styles.dark : styles.bright}>c</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => data.isViceCaptain ? nHandleVCaptain(data._id) : handleVCaptain(data._id)}>
                    <View style={data.isViceCaptain ? styles.vCaptain : styles.no}>
                        <Text style={data.isViceCaptain ? styles.dark : styles.bright}>vc</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.players}>
            </View>
            <StatusBar backgroundColor={"#212121"} style='light' />
            <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                colors={["rgba(29, 97, 129, 1)", "rgba(22, 33, 35, 1)", "rgba(44, 27, 92, 1)"]}
            >
                <View style={{ height: 190, alignItems: 'center', paddingVertical: 8 }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.backContainer}>
                            <TouchableHighlight onPress={() => navigation.goBack()}>
                                <View style={styles.backIcon}>
                                    <AntDesign name="arrowleft" size={24} color="white" />
                                </View>
                            </TouchableHighlight>
                            <Text style={styles.code}>22 h 30 m left</Text>
                            <AntDesign name="questioncircleo" size={24} color="#FFF" />
                        </View>
                    </View>
                    <View style={styles.codes}>
                        <View style={styles.codeContainer}>
                            <View style={styles.blueBackground}>
                                <Text style={styles.code}>{match_details?.teamAwayName}</Text>
                                <Image source={{ uri: match_details.teamAwayFlagUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={styles.code}>{match_details?.teamAwayCode}</Text>
                        </View>
                        <View style={{ width: 60 }}>
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#FFF" }}>5 : 6</Text>
                        </View>
                        <View style={styles.codeContainer}>
                            <Text style={styles.code}>{match_details?.teamHomeCode}</Text>
                            <View style={styles.whiteBackground}>
                                <Text style={styles.code}>{match_details?.teamHomeName}</Text>
                                <Image source={{ uri: match_details.teamHomeFlagUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.header}>
                <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "#FFF", textAlign: "center" }}>Choose Captain & Vice Captain</Text>
                <Text style={{ color: "#535C63", textAlign: "center", fontSize: 9, fontFamily: "Poppins_600SemiBold" }}>C will get 2x points & VC will get 1.5x points</Text>
            </View>
            <View>
                <FlatList
                    data={players}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item._id}
                />
            </View>
            <View style={styles.nextContainer}>
                <View style={styles.preview}>
                    <Icon name="eyeo" color={'#FFFFFF'} />
                    <Text style={styles.bright}>
                        Preview / Lineup
                    </Text>
                    <IonicIcon name="people" color={'#FFFFFF'} />
                </View>
                <TouchableHighlight style={
                    players.filter((k) => k.isSelected === true).length >= 11
                        ? styles.notDisabled
                        : styles.disabled
                }
                    onPress={() => handleSave()}
                >
                    <View
                        style={
                            isCandVcselected()
                                ? styles.next
                                : styles.disabled
                        }
                        pointerEvents={isCandVcselected() ? 'none' : 'auto'}
                    >
                        <Text style={styles.bright}>save</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
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
        height: 100,
        backgroundColor: 'white',
        padding: 5
    },
    backText: {
        color: 'white',
        fontFamily: "Poppins_600SemiBold"
    },
    backContainer: {
        backgroundColor: 'transparent',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 380,
        paddingHorizontal: 4,
        paddingVertical: 15
    },
    backIcon: {
        backgroundColor: 'transparent',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    team: {
        flex: 1,
        backgroundColor: 'rgba(13, 14, 15, 1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: 40
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
    playerContainer: {
        backgroundColor: 'rgba(13, 14, 15, 1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderBottomWidth: 1,
        borderColor: "#CCC"
    },
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    nextContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 10,
        padding: 2,
        borderRadius: 2,
        zIndex: 0,
        position: "absolute",
        bottom: "10%",
        width: "100%"
    },
    next: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: '#FFF',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '100%'
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
    notSelected: {
        backgroundColor: '#9e7044',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    selected: {
        backgroundColor: '#ecac6f',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    disabled: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '100%'
    },
    notDisabled: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    players: {
        zIndex: 10
    },
    bright: {
        color: '#FFFFFF',
        textAlign: "center"
    },
    dark: {
        color: '#000000',
        textAlign: "center",
    },
    captain: {
        borderRadius: 12.5,
        backgroundColor: '#CECECE',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    whiteBackground: {
        width: 70,
        height: 105,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        borderRadius: 3,
        overflow: 'hidden'
    },
    code: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'Poppins_600SemiBold'
    },
    matchInfo: {
        height: 80,
        backgroundColor: "transparent",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 10,

    },
    info: {
        justifyContent: "center",
        alignItems: "flex-start",
        marginRight: 2
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
        overflow: 'hidden'
    },
    vCaptain: {
        borderRadius: 12.5,
        backgroundColor: '#CECECE',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nBox: {
        width: 12,
        height: 12,
        backgroundColor: "rgba(217, 217, 217, 0.12)",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    codes: {
        flexDirection: 'row',
        width: 350,
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginTop: 15
    },
    header: {
        backgroundColor: "#0D0E0F"
    },
    boxes: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 250,
        flexDirection: 'row',
        marginVertical: 10
    },
    blueBackground: {
        width: 80,
        height: 105,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 3,
        overflow: "hidden"
    },
    no: {
        borderRadius: 12.5,
        borderColor: '#CCCCCC',
        height: 25,
        width: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: "#252626"
    }
});