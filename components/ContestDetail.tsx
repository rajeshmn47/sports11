import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView, StyleSheet, TouchableHighlight, TurboModuleRegistry } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import { getDisplayDate } from '../utils/dateFormat';
import { RootStackParamList } from './routing/Routes';
import { getmatch } from "../actions/matchActions";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { URL } from '../constants/userConstants';
import { API } from '../actions/userActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewTeam from './ViewTeam';
import Swap from './Swap';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
    numWinners: number;
}

export interface Team {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: [];
    players: any[];
    captainId: string;
    viceCaptainId: string;
}

export interface MyContest {
    _id: string;
    contest: any;
    teams: any;
}

export interface Commentary {
    ballNbr: string;
    commText: string;
    overNumber: string;
    event: string;
    overSeparator: any;
}



const { width } = Dimensions.get("window")

export type Props = NativeStackScreenProps<RootStackParamList, "ConDetail">;
export default function ContestDetail({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    //const { match_details, matchlive } = useSelector((state: any) => state.match);
    const [date, setDate] = useState<Date>(new Date());
    const [myContest, setMyContest] = useState<any>(null);
    const [prizes, setPrizes] = useState<any[]>([]);
    const layout = useWindowDimensions();
    const [teams, setTeams] = useState<any[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [selectTeams, setSelectTeams] = useState<any>({
        selected: false,
        team: null,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [modal, setModal] = React.useState(null);
    const [tableHead, setTableHead] = useState<any[]>(['winnings', 'rank']);
    const [lTableHead, setLTableHead] = useState<any[]>(['All Teams', 'Points', 'Rank']);
    const [tableTitle, setTableTitle] = useState(['playerName', 'points', 'c']);
    const [widthArr, setWidthArr] = useState<any[]>([layout.width / 2, layout.width / 2]);
    const [lWidthArr, setLWidthArr] = useState<any[]>([layout.width])
    const [showTeam, setShowTeam] = useState<any>(null);
    const [switchTeam, setSwitchTeam] = useState<any>(null);
    const [teamOpen, setTeamOpen] = useState<boolean>(false);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'winnings', title: 'Winnings' },
        { key: 'leaderboard', title: 'Leaderboard' },
    ]);

    useEffect(() => {
        async function getContest() {
            const { data } = await API.get(
                `${URL}/getteam/?matchId=${route.params.matchId}`
            );
            setTeams([...data?.team]);
            dispatch<any>(getmatch(route.params.matchId));
        }
        getContest();
    }, [route.params.matchId]);

    useEffect(() => {
        async function getteams() {
            if (route.params.contestId.length > 3) {
                const teamdata = await API.get(`${URL}/getteamsofcontest/${route.params.contestId}`);
                const contestdata = await API.get(`${URL}/getcontest/${route.params.contestId}`);
                setMyContest(contestdata.data.contest);
                const t = teamdata.data.teams.sort((a: any, b: any) => a._doc.points - b._doc.points);
                setLeaderboard([...t.map((l: any, index: number) => [
                    <TouchableOpacity onPress={() => handleTeamShow(l._doc)}>
                        <View style={user?._id == l.user._id ? styles.myRow : styles.lrow}>
                            <Text numberOfLines={1} style={styles.lItem}>{l.user.username}{" "}({`T${l?._doc?.teamId}`})</Text>
                            <Text style={styles.lItem}>{l._doc.points}</Text>
                            <View style={styles.rank}>
                                <Text>{index + 1}</Text>
                                {user._id == l.user._id ? <TouchableOpacity onPress={() => handleSwap(l._doc)}>
                                    <AntDesign name="swap" size={24} color="black" />
                                </TouchableOpacity> : null}
                            </View>
                        </View>
                    </TouchableOpacity>])]);
            }
        }
        getteams();
    }, [route.params.contestId]);

    useEffect(() => {
        const all: any[] = [];
        if (myContest?.prizeDetails.length > 0) {
            myContest?.prizeDetails.forEach((t: any) => {
                all.push(t.prize);
            });
        }
        setPrizes([...all.map((index: number, a: any) => [index, a + 1])]);
    }, [myContest]);

    const handleTeamShow = (team: any) => {
        setShowTeam(team);
        setTeamOpen(true)
    }

    const handleRejoin = async () => {
        try {
            const { data } = await API.get(`${URL}/reJoinCn/${myContest?._id}?oldTeamId=${switchTeam?._id}&newTeamId=${selectedTeam?._id}`)
            setSwitchTeam(null);
            setSelectTeams({ selected: false, team: null })
        }
        catch (error: any) {
            console.log(error.response)
        }
    }

    const handleSwap = (team: any) => {
        if (!(matchlive?.result == "In Progress" || matchlive?.result == "Complete")) {
            setSelectTeams({ selected: true, team: null })
            setSwitchTeam(team)
        }
        else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Failure',
                textBody: 'Match has already began!',
            })
        }
    }
        const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {
                        prizes.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                widthArr={widthArr}
                                style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
                                textStyle={styles.text}
                            />
                        ))
                    }
                </Table>
            </ScrollView>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={lTableHead} flexArr={[1]} style={styles.head} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {
                        leaderboard.map((rowData: any[], index: number) => (
                            <Row
                                key={index}
                                data={rowData}
                                widthArr={lWidthArr}
                                style={[styles.row, index % 2 ? { backgroundColor: '#ffffff' } : { backgroundColor: '#ffffff' }]}
                                textStyle={styles.text}
                            />
                        ))
                    }
                </Table>
            </ScrollView>
        </View>
    );

    const renderScene = SceneMap({
        winnings: FirstRoute,
        leaderboard: SecondRoute
    });

    return (
        <ScrollView style={styles.container}>
            {!selectTeams?.selected ?
                <>
                    <View style={styles.contest}>
                        <View style={styles.contestTop}>
                            <View style={styles.pool}>
                                <Text>Prize Pool</Text>
                                <Text>{myContest?.price}</Text>
                            </View>
                            <View style={styles.pool}>
                                <Text>Entry</Text>
                                <Text>{myContest?.teamsId?.length}</Text>
                            </View>
                        </View>
                        <View style={styles.slider}>
                            <Slider
                                value={myContest?.teamsId?.length / myContest?.totalSpots}
                                maximumTrackTintColor={'rgb(254, 244, 222)'}
                                minimumTrackTintColor={'#b50000'}
                                thumbTouchSize={{ width: 0, height: 0 }}
                                thumbTintColor={'transparent'}
                                thumbStyle={{ width: 0 }}
                            />
                        </View>
                        <View style={styles.spots}>
                            <Text>
                                {myContest?.spotsLeft} spots left
                            </Text>
                            <Text>
                                {myContest?.totalSpots} spots
                            </Text>
                        </View>
                        <View style={styles.conBottom}>
                            <View>
                                <Text>
                                    ₹{Math.floor(myContest?.price / myContest?.totalSpots)}
                                </Text>
                            </View>
                            <View style={styles.cRow}>
                                <View>
                                    <Icon name="trophy" style={styles.icon} />
                                </View>
                                <Text>
                                    {Math.floor((myContest?.numWinners / myContest?.totalSpots * 100))}%
                                    Single
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tabContainer}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            overScrollMode={'auto'}
                            renderTabBar={props => (
                                <TabBar
                                    {...props}
                                    indicatorStyle={{ backgroundColor: 'white' }}
                                    tabStyle={{ width: layout.width / 2 }}
                                    scrollEnabled={true}
                                    style={{ backgroundColor: '#202020' }}
                                />
                            )}
                        />
                    </View>
                    <ViewTeam
                        teamOpen={teamOpen}
                        setTeamOpen={setTeamOpen}
                        data={showTeam}
                        match={matchlive || match_details}
                        match_details={match_details}
                        navigation={navigation}
                    />
                </> :
                <>
                    <Swap
                        teams={teams}
                        setSelectTeams={setSelectTeams}
                        switchTeam={switchTeam}
                        date={date} match_details={match_details}
                        matchlive={matchlive} selectedTeam={selectedTeam}
                        setSelectedTeam={setSelectedTeam}
                        teamIds={myContest?.teamsId?.length > 0 ? [...myContest.teamsId] : ['id']} />
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button title="create team"
                                onPress={() => navigation.navigate("Create", {
                                    matchId: route.params.matchId,
                                    editMode: false,
                                    data: undefined
                                })} color="blue" />
                        </View>
                        <View style={styles.button}>
                            <Button title="Rejoin"
                                disabled={!selectedTeam} onPress={() => handleRejoin()}
                                color="#4c9452" />
                        </View>
                    </View>
                </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        flex: 1,
        zIndex: 2
    },
    tabContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 1,
        height: 600,
        width: "100%"
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
        height: 170,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    myContest: {
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
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    commentary: {
        margin: 10,
        borderRadius: 10,
        height: 'auto',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
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
    pool: {
        backgroundColor: 'white',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'column',
        height: 40,
        padding: 2,
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
    contestTop: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 2,
        paddingBottom: 0
    },
    slider: {
        paddingHorizontal: 5
    },
    wholeTeamContainer: {
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center'
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
    info: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        padding: 2
    },
    singleInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 2
    },
    teamTop: {
        backgroundColor: '#109e38',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: '80%',
        width: '100%'
    },
    teamInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    light: {
        color: 'rgb(119, 119, 119)'
    },
    bright: {
        color: '#FFFFFF',
        textTransform: 'uppercase',
        fontSize: 12
    },
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 2,
        borderRadius: 15,
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5
    },
    create: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 120,
        padding: 2,
        borderRadius: 15,
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5,
        paddingVertical: 10
    },
    myConBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        padding: 2
    },
    myConMiddle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        padding: 2
    },
    conBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        paddingHorizontal: 5
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    cRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    circle: {
        borderRadius: 10,
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bigCircle: {
        borderRadius: 15,
        borderColor: '#CCCCCC',
        height: 30,
        width: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bottom: {
        backgroundColor: 'rgb(254, 244, 222)'
    },
    commText: {
        marginLeft: 10,
        textAlign: 'left'
    },
    overBreak: {
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: 'rgb(204, 204, 204)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        paddingVertical: 5
    },
    left: {
        width: 40
    },
    separator: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    wicket: {
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: 'red',
        borderColor: 'red',
        marginBottom: 2
    },
    four: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    six: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    text: {
        textAlign: 'center'
    },
    spots: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 5
    },
    head: { height: 40, backgroundColor: '#a9f19b', textAlign: 'center' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    header: { height: 50, backgroundColor: '#537791' },
    dataWrapper: { marginTop: -1 },
    icon: {
        marginRight: 5
    },
    rank: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "33%"
    },
    lrow: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    myRow: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#c7dbe2"
    },
    lItem: {
        width: "33%",
        textAlign: "center",
        overflow: "hidden"
    },
    buttons: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 25
    },
    button: {
        width: "50%"
    }
});
