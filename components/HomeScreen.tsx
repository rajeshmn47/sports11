import { Button, Dimensions, RefreshControl, ScrollView, StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { URL } from "./../constants/userConstants";
import Loader from './loader/Loader';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
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
import { RootStackParamList } from './routing/Routes';
import Navbar from './navbar/Navbar';
import BottomBar from './BottomBar';
import Mega from './homescreen/Mega';
import { Timer } from './Timer';
import { hoursRemaining } from '../utils/dateFormat';
import { API } from '../actions/userActions';
import Index from './carousel';

export type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export interface Match {
    id: string;
    username: string,
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
    livestatus: string;
    lineups: string;
}

const Item = ({ data, date, navigation }: { data: Match, date: any, navigation: any }) => {
    const handleClick = () => {
        navigation.navigate("Details", { matchId: data?.id })
    }
    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <LinearGradient
                //locations={[0, 0.5, 0.55,1]}
                style={styles.match}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["rgba(150, 28, 33, 1)", "rgba(22, 33, 35, 1)", "rgba(72, 141, 23, 1)"]}
            >
                <View style={styles.matchTitleContainer}>
                    <View style={styles.matchTitle}>
                        <Text style={{ color: '#FFF', textTransform: 'capitalize', fontWeight: 500, position: 'absolute', top: -40, textAlign: 'center' }}>
                            {data?.match_title}
                        </Text>
                    </View>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.team}>
                        <Text style={{ ...styles.code }} numberOfLines={1}>{data.home.name}</Text>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${data.teamHomeFlagUrl.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                            <Text style={{ ...styles.code, marginLeft: 5 }}>{data?.home?.code}</Text>
                        </View>
                    </View>
                    <Timer matchDate={data?.date} />
                    <View style={styles.team}>
                        <Text style={styles.code} numberOfLines={1}>{data.away.name}</Text>
                        <View style={styles.imageContainer}>
                            <Text style={{ ...styles.code, marginRight: 5 }}>{data?.away?.code}</Text>
                            <Image source={{ uri: `${data.teamAwayFlagUrl.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.matchBottom}>
                    <Text style={styles.whiteText}>
                        {`Max `} 900 crore
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation, route }: Props) {
    const [text, setText] = useState('');
    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_200ExtraLight, Manrope_300Light
    });
    const [upcoming, setUpcoming] = useState<any[]>();
    const [featuredPosts, setFeaturedPosts] = useState<any[]>();
    const [completed, setCompleted] = useState<any[]>([])
    const [loading, setLoading] = useState<Boolean>(false);
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'featured', title: 'Featured' },
        { key: 'upcoming', title: 'Upcoming' }]);

    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={new Date()} navigation={navigation} />;

    useEffect(() => {
        refreshHandler()
    }, [])

    async function refreshHandler() {
        setRefreshing(true);
        try {
            const response = await API.get(`${URL}/homeMatches`);
            const a: [] = response.data.upcoming.results
            setUpcoming([...a]);
            setCompleted([...response.data.past.results])
            setRefreshing(false);
        } catch (error) {
            console.log(error)
            setRefreshing(false);
        }
    }

    const SecondRoute = () => (
        <View style={{ backgroundColor: '#0D0E0F' }
        } >
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
    );

    return (
        <>
            {fontsLoaded ?
                <View style={styles.container}>
                    <StatusBar backgroundColor={"#000000"} barStyle={'light-content'} />
                    <Loader loading={loading} />
                    <View style={{ height: 50, flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../assets/starprize.png')} style={{ width: 24, height: 24, marginRight: 5 }} />
                            <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 17 }}>
                                FantasyCrick
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Image source={require('../assets/whiteball.png')} style={{ width: 24, height: 24, marginRight: 5 }} />
                            <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 17 }}>
                                Cricket
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 30, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <Text style={{ color: '#FFF', fontWeight: '400', fontSize: 14 }}>
                            My matches
                        </Text>
                        <View style={{ backgroundColor: 'rgba(217, 217, 217, 0.4)', paddingHorizontal: 10, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#FFF', fontWeight: '400', fontSize: 14 }}>
                                View all
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 200, paddingVertical: 5 }}>
                        <Index data={completed} navigation={navigation} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.heading}>Upcoming</Text>
                    </View>
                    <View style={styles.tabsContainer}>
                        <SecondRoute />
                    </View>
                    <BottomBar route={route} navigation={navigation} />
                </View > : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        color: 'white',
        fontStyle: 'italic',
        position: 'relative'
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: "100%",
        width: "100%"
    },
    selectedTabTextStyle: {
        color: 'green'
    },
    label: {
        color: 'red'
    },
    firstTab: {
        backgroundColor: '#333333'
    },
    secondTab: {
        backgroundColor: '#FFFFFF'
    },
    imageContainer: {
        width: 40,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    match: {
        marginHorizontal: 10,
        backgroundColor: '#1f2a38',
        marginVertical: 10,
        borderRadius: 18,
        height: 160,
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        position: 'relative'
    },
    matchTitleContainer: {
        position: 'absolute',
        left: 100
    },
    matchTitle: {
        borderTopWidth: 40,
        borderTopColor: 'rgba(217, 217, 217, 0.12)',
        borderLeftWidth: 20,
        borderLeftColor: 'transparent',
        borderRightWidth: 20,
        borderRightColor: 'transparent',
        height: 0,
        width: 175
    },
    actions: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row'
    },
    team: {
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'column',
        height: 60,
        padding: 0,
        width: 103
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
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
        paddingHorizontal: 10
    },
    topBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 30,
        backgroundColor: 'rgba(26, 37, 136, 0.06)'
    },
    greenText: {
        overflow: 'hidden',
        fontSize: 18,
        fontWeight: '600',
        color: "#398d44"
    },
    redText: {
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: '400',
        color: "#CC4040",
        textTransform: 'uppercase',
        fontFamily: 'BebasNeue_400Regular'
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2,
    },
    matchBottom: {
        height: 30,
        backgroundColor: '#162123',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    matchDate: {
        width: 130,
        fontSize: 10,
        alignItems: 'center',
        fontWeight: '200',
        justifyContent: 'center',
        alignContent: 'center'
    },
    date: {
        fontWeight: "200",
        fontSize: 12
    },
    hours: {
        fontWeight: "200"
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(130, 130, 130)'
    },
    title: {
        width: "60%",
        fontSize: 14,
        fontWeight: '600',
        color: '#474C52',
        fontFamily: 'Manrope_600SemiBold'
    },
    headings: {
        width: "50%",
        fontSize: 14,
        fontWeight: '200',
        textTransform: "capitalize",
        textAlign: "right"
    },
    titleContainer: {
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 24,
        paddingHorizontal: 15,
        height: "6%"
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    heading: {
        overflow: 'hidden',
        fontSize: 20,
        fontWeight: '400',
        backgroundColor: "transparent",
        fontFamily: 'BebasNeue_400Regular',
        textTransform: "uppercase",
        color: "#FFF"
    },
    code: {
        overflow: 'hidden',
        fontSize: 12,
        fontWeight: '400',
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'Manrope_400Regular'
    },
    whiteText: {
        overflow: 'hidden',
        fontSize: 12,
        fontWeight: '400',
        color: '#FFF',
        textTransform: 'capitalize',
        fontFamily: 'Manrope_400Regular'
    },
    bottom: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "transparent"
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
    }
});
