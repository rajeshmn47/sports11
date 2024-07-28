import { Text, TouchableHighlight, View, StyleSheet, Image } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { styles } from "./stylesheet";
import { useSelector } from "react-redux";
import {
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

export interface Contest {
    _id: string;
    teamsId: [];
    spotsLeft: number;
    totalSpots: number;
    price: number;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
    numWinners: number;
}


export default function ContestItem({ data, selectedTeam, selectTeams, handleClick }: { data: Contest, selectedTeam: any, selectTeams: any, handleClick: any }) {
    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_200ExtraLight, Manrope_300Light
    });
    return (
        <TouchableHighlight onPress={() => handleClick(data)}>
            <View style={styles.contest}>
                <View style={styles.contestTop}>
                    <View style={styles.poolA}>
                        <Text style={newStyles.light}>Prize Pool</Text>
                        <Text style={newStyles.money}>{data?.price}</Text>
                    </View>
                    <View style={styles.poolB}>
                        <Text style={newStyles.light}>Entry</Text>
                        <Text style={newStyles.money}>₹{Math.floor(data?.price / data?.totalSpots)}</Text>
                    </View>
                </View>
                <View style={styles.contestMiddle}>
                    <View style={styles.pool}>
                        <View style={styles.row}>
                            <View style={styles.icon}>
                                <AntDesign name="Trophy" size={14} color="#AAAAAA" />
                            </View>
                            <Text style={newStyles.light}>59% wins</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={newStyles.mIcon}>
                                <Text style={newStyles.mText}>
                                    M
                                </Text>
                            </View>
                            <Text style={newStyles.light}>Upto 20</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.icon}>
                                <Image source={require('../../assets/charm_shield-tick.png')} style={{ width: 14, height: 14 }} />
                            </View>
                            <Text style={newStyles.light}>Guaranteed</Text>
                        </View>
                    </View>
                    <View style={styles.poolEnd}>
                        <View style={newStyles.priceBtn}>
                            <Text style={newStyles.whiteText}>Rs. 49</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.slider}>
                    <Slider
                        value={1 / data?.totalSpots}
                        maximumTrackTintColor={'rgb(254, 244, 222)'}
                        minimumTrackTintColor={'#CC4040'}
                        thumbTouchSize={{ width: 0, height: 0 }}
                        thumbTintColor={'transparent'}
                        thumbStyle={{ width: 0 }}
                    />
                </View>
                <View style={styles.spots}>
                    <Text style={newStyles.redText}>
                        {data?.spotsLeft} spots left
                    </Text>
                    <Text style={newStyles.light}>
                        {data?.totalSpots} spots
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const newStyles = StyleSheet.create({
    money: {
        fontFamily: 'BebasNeue_400Regular'
    },
    light: {
        fontFamily: "Manrope_400Regular",
        color: "#AAAAAA"
    },
    redText: {
        fontFamily: "Manrope_400Regular",
        color: "rgba(204, 64, 64, 0.7)"
    },
    mIcon: {
        borderRadius: 14,
        width: 14,
        height: 14,
        borderColor: "#AAAAAA",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginRight: 5
    },
    mText: {
        color: "#AAAAAA",
        fontSize: 10
    },
    priceBtn: {
        backgroundColor: "#569209",
        width: 62,
        height: 26,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    whiteText: {
        color: "#FFF",
        textAlign: "center",
        fontFamily: "Manrope_400Regular"
    }
})