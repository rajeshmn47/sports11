import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import { getDisplayDate, hoursRemaining } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient'
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { API, loadToken, logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from './routing/Routes';
import { Timer } from './Timer';
import { URL } from '../constants/userConstants';
import BottomBar from './BottomBar';
import Navbar from './navbar/Navbar';
import { Link } from '@react-navigation/native';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import Loader from './loader/Loader';
import Live from './Live';
import Completed from './Completed';
import Mega from './homescreen/Mega';



export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
    teams: any;
    contests: any;
    won: any;
}

const Item = ({ live, completed, data, date, navigation }: { live: Boolean, completed: Boolean, data: Match, date: any, navigation: any }) => {
    const openPopup = () => {
        navigation.navigate('Details', {
            matchId: data.id
        });
    }
    return (
        <>
            <TouchableOpacity onPress={() => openPopup()}>
                <View style={styles.match}>
                    <View>
                        <Text style={styles.title}>{data.match_title}</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        <View style={styles.team}>
                            {/*<SvgUri
                            onError={() =>
                                console.log('error')
                            }
                            width="40"
                            height="40"
                            style={{ marginRight: 10 }}
                            uri={data.teamHomeFlagUrl.replace("https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_(Pantone).svg")}
                        />
                        */}
                            <View style={styles.imageContainer}></View>
                            <Text style={styles.code}>{data.home.code}</Text>
                        </View>
                        <View style={styles.matchDate}>
                            {completed && <Completed />}
                            {live ? <Live /> : completed ? <Text>{getDisplayDate(data?.date, "i", date)}</Text> : <Timer matchDate={data?.date} />}
                        </View>
                        <View style={styles.team}>
                            <Text style={styles.code}>{data.away.code}</Text>
                            <View style={styles.imageContainer}></View>
                            {/*<SvgUri
                            onError={() =>
                                console.log('error')
                            }
                            width="40"
                            height="40"
                            style={{ marginLeft: 10 }}
                            uri={data.teamAwayFlagUrl.replace("https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_(Pantone).svg")}
                        />
                        */}
                        </View>
                    </View>
                    <View style={styles.myBottom}>
                        <View style={styles.tcInfo}>
                            <Text>{data?.teams?.length}{" "}teams{"  "}</Text>
                            <Text>{data?.contests?.length}{" "}contests{"  "}</Text>
                        </View>
                        {data?.won > 0 && <Text style={styles.won}>YOU Won ₹{data?.won}</Text>}
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openPopup()}>
                <View style={styles.match}>
                    <View style={styles.topBar}>
                        <Text numberOfLines={1} style={styles.title}>{data?.match_title}</Text>
                        <LinearGradient colors={['rgba(204, 64, 64, 0.14)', 'rgba(255, 255, 255, 0.14)']} style={styles.lineups}>
                            <Text style={styles.redText}>LINEUPS OUT</Text>
                            <Image source={require('../assets/cricket.png')} style={{ marginLeft: 10, width: 20, height: 20 }} />
                        </LinearGradient>
                    </View>
                    <View style={styles.teamContainer}>
                        <View style={styles.team}>
                            <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5 }} style={styles.imageContainer}>
                                <Image source={{ uri: `${data.teamHomeFlagUrl.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                            </LinearGradient>
                            <Text style={{ ...styles.code }} numberOfLines={1}>{data.home.name}</Text>
                        </View>
                        <Timer matchDate={data?.date} />
                        <View style={styles.team}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: `${data.teamAwayFlagUrl.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                            </View>
                            <Text style={styles.code} numberOfLines={1}>{data.away.name}</Text>
                        </View>
                    </View>
                    <View style={styles.timeLine}>
                        <View style={styles.line}>
                        </View>
                        <Text style={styles.time}>
                            {' '}
                            {hoursRemaining(data?.date, 'date', date) && <AntIcon name='clockcircleo' color='#CC4040' />}
                            {' '}
                            {hoursRemaining(data?.date, 'date', date)}{' '}</Text>
                        <View style={styles.line}>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.bottomLeft}>
                            <Mega />
                        </View> <View style={styles.tcInfo}>
                            <Text>{data?.teams?.length}{" "}teams{"  "}</Text>
                            <Text>{data?.contests?.length}{" "}contests{"  "}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>)
}
const { width, height } = Dimensions.get('window')
export type Props = NativeStackScreenProps<RootStackParamList, "MyMatches">;
export default function MyMatches({ navigation, route }: Props) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [index, setIndex] = React.useState(0);
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const [routes] = React.useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'live', title: 'Live' },
        { key: 'completed', title: 'Completed' }]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [completed, setCompleted] = useState<any[]>([]);
    const [live, setLive] = useState<any[]>([]);
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item completed={false} live={false} data={item} date={date} navigation={navigation} />;
    const renderLiveItem: ListRenderItem<Match> = ({ item }) => <Item completed={false} live={true} data={item} date={date} navigation={navigation} />;
    const renderCompletedItem: ListRenderItem<Match> = ({ item }) => <Item completed={true} live={false} data={item} date={date} navigation={navigation} />;
    useEffect(() => {
        async function getupcoming() {
            setRefreshing(true);
            try {
                const response = await API.get(`${URL}/myMatches`);
                const a: [] = response.data.upcoming.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                const b: [] = response.data.live.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                const c: [] = response.data.completed.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                //setUpcoming([...a]);
                setLive([...b]);
                setCompleted([...c]);
                setRefreshing(false);
            } catch (error) {
                console.error(error);
            }
        }
        getupcoming();
    }, []);
    useEffect(() => {
        const i = setInterval(() => {
            //setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={upcoming}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing ? true : false}
                                onRefresh={refreshHandler}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    {live?.length > 0 ? <FlatList
                        data={live}
                        renderItem={renderLiveItem}
                        keyExtractor={(item: any) => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing ? true : false}
                                onRefresh={refreshHandler}
                            />
                        }
                    /> : <Text style={styles.errorText}>No live matches now!</Text>}
                </View>
            </View>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={completed}
                        renderItem={renderCompletedItem}
                        keyExtractor={(item: any) => item.id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing ? true : false}
                                onRefresh={refreshHandler}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    );


    const renderScene = SceneMap({
        upcoming: FirstRoute,
        live: SecondRoute,
        completed: ThirdRoute
    });

    async function refreshHandler() {
        setRefreshing(true);
        try {
            const response = await API.get(`${URL}/myMatches`);
            const a: [] = response.data.upcoming.results.sort(
                (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
            );
            const b: [] = response.data.live.results.sort(
                (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
            );
            const c: [] = response.data.completed.results.sort(
                (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
            );
            //setUpcoming([...a]);
            setLive([...b]);
            setCompleted([...c]);
            setRefreshing(false);
        } catch (error) {
            setRefreshing(false);
        }
    }

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={styles.titleContainer}>
                <Text style={styles.heading}>My Matches</Text>
            </View>
            <Loader loading={loading} />
            <View style={styles.tabsContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(a) => setIndex(a)
                    }
                    initialLayout={{ width: width }}
                    overScrollMode={'auto'}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            tabStyle={{ width: width / 3 }}
                            scrollEnabled={true}
                            renderTabBarItem={(props) => (
                                <View style={props.key == (index == 0 ? 'upcoming' : index == 1 ? 'live' : 'completed') ? styles.firstTab : styles.secondTab}>
                                    <TabBarItem
                                        {...props}
                                        activeColor='white'
                                        inactiveColor='#212121'
                                    />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        marginTop: 10
    },
    errorText: {
        color: "#aa0000",
        textAlign: "center",
        marginTop: 5
    },
    matchesContainer: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10,
        height: 600,
        paddingVertical: 300
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "86.66%",
        width: "100%"
    },
    match: {
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
        padding: 10,
        paddingHorizontal: 10
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
    firstTab: {
        backgroundColor: '#212121'
    },
    secondTab: {
        backgroundColor: '#FFFFFF'
    },
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 5,
        borderRadius: 2,
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2,
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    matchDate: {
        width: 100,
        fontSize: 10,
        flex: 2,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(130, 130, 130)'
    },
    title: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: '200'
    },
    titleContainer: {
        backgroundColor: "#e7e7e7",
        marginBottom: 0,
        paddingVertical: 5,
        paddingHorizontal: 15,
        height: "5%"
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '200',
        backgroundColor: "transparent"
    },
    code: {
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 'bold'
    },
    myBottom: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tcInfo: {
        flexDirection: "row"
    },
    won: {
        color: "#3d7940"
    },
    imageContainer: {
        width: 40,
        height: 40
    },

    line: {
        height: 1,
        width: '40%',
        backgroundColor: '#F0F1F3'
    },
    time: {
        color: '#CC4040'
    },
    lineups: {
        width: '40%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    redText: {
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: '400',
        color: "#CC4040",
        textTransform: 'uppercase',
        fontFamily: 'BebasNeue_400Regular'
    },
    date: {
        fontWeight: "200",
        fontSize: 12
    },
    bottom: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    bottomLeft: {
        width: 130,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    timeLine: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    topBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 30,
        backgroundColor: 'rgba(26, 37, 136, 0.06)'
    },
});