import React from "react";
import { type StyleProp, type ViewStyle, type ViewProps, type ImageSourcePropType, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import Constants from "expo-constants";

import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";
import { LinearGradient } from "expo-linear-gradient";
import { Timer } from "../Timer";

interface Props extends AnimateProps<ViewProps> {
    style?: StyleProp<ViewStyle>
    index?: number
    pretty?: boolean
    showIndex?: boolean
    img?: ImageSourcePropType,
    data: any
}

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

{/*export const SBItem = ({ props }: { props: any }) => {
    const { style, showIndex = true, data, index, pretty, img, testID, ...animatedViewProps } = props;
    console.log(props, 'abcd');
    const handleClick = () => {
        //navigation.navigate("Details", { matchId: data?.id })
    }
    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <LinearGradient
                //locations={[0, 0.5, 0.55,1]}
                style={styles.match}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["rgba(29, 97, 129, 1)", "rgba(22, 33, 35, 1)", "rgba(44, 27, 92, 1)"]}
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
                        <Text style={{ ...styles.code }} numberOfLines={1}>{data?.home?.name}</Text>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${data?.teamHomeFlagUrl?.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                            <Text style={styles.code}>{data?.home?.code}</Text>
                        </View>
                    </View>
                    <Timer matchDate={data?.date} />
                    <View style={styles.team}>
                        <Text style={styles.code} numberOfLines={1}>{data?.away?.name}</Text>
                        <View style={styles.imageContainer}>
                            <Text style={styles.code}>{data?.away?.code}</Text>
                            <Image source={{ uri: `${data?.teamAwayFlagUrl?.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.matchBottom}>
                    <Text style={styles.whiteText}>
                        2 teams{` `}
                    </Text>
                    <Text style={styles.whiteText}>
                        {`   `}3 contests
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};
*/}

export const SBItem: React.FC<Props> = (props) => {
    const { style, showIndex = true, index, data, pretty, img, testID, ...animatedViewProps } = props;
    const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
    const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
    console.log(props, 'index');
    const handleClick = () => {
        //navigation.navigate("Details", { matchId: data?.id })
    }
    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <LinearGradient
                //locations={[0, 0.5, 0.55,1]}
                style={styles.match}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["rgba(29, 97, 129, 1)", "rgba(22, 33, 35, 1)", "rgba(44, 27, 92, 1)"]}
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
                        <Text style={{ ...styles.code }} numberOfLines={1}>{data?.home?.name}</Text>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${data?.teamHomeFlagUrl?.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                            <Text style={styles.code}>{data?.home?.code}</Text>
                        </View>
                    </View>
                    <Timer matchDate={data?.date} />
                    <View style={styles.team}>
                        <Text style={styles.code} numberOfLines={1}>{data?.away?.name}</Text>
                        <View style={styles.imageContainer}>
                            <Text style={styles.code}>{data?.away?.code}</Text>
                            <Image source={{ uri: `${data?.teamAwayFlagUrl?.replace('svg', 'png')}` }} style={{ width: 50, height: 40 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.matchBottom}>
                    <Text style={styles.whiteText}>
                        2 teams{` `}
                    </Text>
                    <Text style={styles.whiteText}>
                        {`   `}3 contests
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

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