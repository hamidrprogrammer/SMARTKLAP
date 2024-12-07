import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { McText } from "../../../Components";
import { Colors } from "../../../Constants";
import Timer from '../../../Components/timer/timerBack';
import { LinearGradient } from "expo-linear-gradient";
import CountDownLive from "../../../Components/CountDownLive";
import CountDownTimer from "react-native-countdown-timer-hooks";
import ntpSync from "@ruanitto/react-native-ntp-sync";
import Countdown from "../../Chant/IndexTsx/CountDownCoustom";
import CountDownTimerBack from "../../Chant/IndexTsx/CountDownCoustom";
import moment from "moment";
import SignalRContext from "../../../Servise/Sinal/SignalRContext";
import { EventContext } from "../../../Servise/Events/eventContaxt";
// Import a library for image loading, e.g., react-native-fast-image
const widthFull = Dimensions.get("window").width;
export const FinishUi = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(data.timetostart - Date.now());

  return (
    <View style={styles.full}>
     <ImageBackground style={{width:widthFull,height:200,paddingTop:30,paddingLeft:10,paddingRight:8}}
     resizeMode="contain"
      source={require("../../../../assets/pendingCard.png")}>
        <View style={styles.row}>
          <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.hostTeam?.logoUrl }}
              style={{ width: 50, height: 50 }}
            />
            <McText
              align={"center"}
              bold
              size={13}
              color={"#000"}
              style={{ marginTop: 9,paddingLeft:8 }}
            >
              {data?.hostTeam?.name}
            </McText>
          </View>
          <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.logoUrl }}
              style={{ width: 50, height: 50, marginBottom: 15 }}
            />
            <McText black color={"#000"} size={20}>
              {data?.hostTeamPoint + " - " + data?.guestTeamPoint}
            </McText>
            <View style={{ marginBottom: 15 }} />
            <McText black color={"#000"} align="center" size={13} style={{width:500}}>
              {new Date(data?.startTime).toDateString()}
            </McText>
          </View>
          <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.guestTeam?.logoUrl }}
              style={{ width: 50, height: 50}}
            />
            <McText
              align={"center"}
              bold
              size={13}
              color={"#000"}
              style={{ marginTop: 9 }}
            >
              {data?.guestTeam?.name}
            </McText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export const PendinghUi = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(data.timetostart - Date.now());

  return (
    <View style={styles.full}>
      <ImageBackground style={{width:340,height:210,paddingTop:15,paddingLeft:8,paddingRight:8}}
     resizeMode="contain"
      source={require("../../../../assets/pendingCard.png")}>
        <View style={styles.row}>
        <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.hostTeam?.logoUrl }}
              resizeMethod="resize"
              
              style={{ width: 50, height: 50 }}
            />
            <McText
              align={"center"}
              bold
              size={13}
              color={"#000"}
              style={{ marginTop: 9 }}
            >
              {data?.hostTeam?.name}
            </McText>
          </View>
          <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.logoUrl }}
              style={{ width: 50, height: 50, marginBottom: 15 }}
            />

            <View style={{ marginBottom: 15 }} />
            <McText black color={"#000"} align="center" size={13} style={{width:500}}>
              {new Date(data?.startTime).toDateString()}
            </McText>
          </View>
          <View style={[styles.center,{ backgroundColor:"#fff"}]}>
            <Image
              source={{ uri: data?.guestTeam?.logoUrl }}
              style={{ width: 50, height: 50 }}
            />
            <McText
              align={"center"}
              bold
              size={13}
              color={"#000"}
              style={{ marginTop: 9 }}
            >
              {data?.guestTeam?.name}
            </McText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export const PreStartUi = ({ data }) => {
  const {currentTime} = useContext(EventContext)
  const [timeLeft, setTimeLeft] = useState(data.timetostart - Date.now());
  const CheckTime = () => {
    let e =0;
    let time = new Date();
    if(currentTime.length>8){
      const initialDater = parse(currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS", new Date());

      // Format the date with the desired format
      const desiredFormat = "yyyy-MM-dd'T'HH:mm:ssxxx";
      const formattedDate = format(initialDater, desiredFormat);
      const formatted = formattedDate.replace(/(.*?)\+.*$/, '$1+00:00');
     
      var dateEntryLive = formatted;
      //Getting the current date-time with required formate and UTC
      var expirydateLive = data?.startTime; //You can set your own date-time
      //Let suppose we have to show the countdown for above date-time
      var diffrLive = moment.duration(
        moment(expirydateLive).diff(moment(dateEntryLive))
      );
      //difference of the expiry date-time given and current date-time
      var hoursLive = parseInt(diffrLive.asHours());
      var minutesLive = parseInt(diffrLive.minutes());
      var secondsLive = parseInt(diffrLive.seconds());
       e = hoursLive * 60 * 60 + minutesLive * 60 + secondsLive;
    }

     time = Math.floor(diffrLive / (1000 * 60 * 60 * 24));

    if (e > 1) {
      return (
        <>
          <View style={{ marginBottom: 15 }} />
          {time>= 1 ? (
            <McText size={30}color={"#fff"}>{time+1 + " DAYS"}</McText>
          ) : (
            <CountDownTimer
              timestamp={e}
              containerStyle={{
                height: 40,
                width: 500,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
              textStyle={{
                fontSize: 25,
                color: "#fff",
                fontWeight: "500",
                letterSpacing: 0.25,
              }}
            />
          )}
        </>
      );
    } else {
      return <View></View>;
    }
  };

  return (
    <View style={styles.full}>
      <Card style={[styles.card, { padding: 0, height: 200 }]}>
        <LinearGradient
           colors={["#A60044","#200959","#20095B"]}
           start={{x: 1, y: 0}} end={{x: 0, y: 0.9}}
          style={{
            width: `100%`,
            height: `100%`,
            borderRadius: 3,
            padding: 16,
          }}
        
        >
          <View style={styles.row}>
            <View style={styles.center}>
              <Image
                source={{ uri: data?.hostTeam?.logoUrl }}
                style={{ width: 50, height: 50 }}
              />
              <McText
                align={"center"}
                bold
                size={15}
                color={"#fff"}
                style={{ marginTop: 9 }}
              >
                {data?.hostTeam?.name}
              </McText>
            </View>
            <View style={styles.center}>
              <Image
                source={{ uri: data?.logoUrl }}
                style={{ width: 50, height: 50, marginBottom: 15 }}
              />

              <View style={{ marginBottom: 15 }} />
              <McText black color={"#fff"} align="center" size={13} style={{width:500}}>
                {new Date(data?.startTime).toDateString()}
              </McText>
              {<CheckTime />}
            </View>
            <View style={styles.center}>
              <Image
                source={{ uri: data?.guestTeam?.logoUrl }}
                style={{ width: 50, height: 50 }}
              />
              <McText
                align={"center"}
                bold
                size={15}
                color={"#fff"}
                style={{ marginTop: 9 }}
              >
                {data?.guestTeam?.name}
              </McText>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </View>
  );
};
import { differenceInSeconds, format, parse, parseISO } from 'date-fns';
import { DateTime } from 'luxon';
import { ImageBackground } from "react-native";
import TimeDisplayBack from "@/Components/timer/TimeDisplayBack";
export const LiveEventUi = ({ data, timer }) => {
  const [timeCheck, setTimeCheck] = useState(true);
  const { currentTime, flagEnterScreen } = useContext(EventContext);

  useEffect(() => {
    setTimeCheck(flagEnterScreen);
  }, [flagEnterScreen]);

  return (
    <View style={[{ height: 340, width: `100%`, }]}>
      <View style={[{ height: 280, width: `100%`, }]}>
        <LinearGradient
        colors={["#E90144","#903959","#50395B"]}
        start={{x: 0, y: 1}} end={{x: 1, y: 0.9}}
          style={{
            width: `100%`,
            height: 250,
            position:"absolute",
            // borderBottomRightRadius:10,
            // borderBottomLeftRadius:10,
            padding: 16,
            paddingTop:40
          }}
        
        >
          {/* <View style={styles.row}>
            <Image
              source={{ uri: data?.hostTeam?.logoUrl }}
              resizeMode="center"
              style={{ width: 50, height: 50 }}
            />
            <View
              style={{
                width: 110,
                height: 40,
                backgroundColor: "#fff",
                alignSelf: "flex-end",
                borderRadius: 50,
                marginBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 5,
                alignItems: "center",
              }}
            >
              <Text>12500</Text>
              <View
                style={{
                  backgroundColor: "#D92FAA",
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
              >
                <Icon size={20} name="rocket1" color={"#fff"} />
              </View>
            </View>
          </View> */}
          </LinearGradient>
          <Card style={{height:210,top:95,width:`95%`,alignSelf:"center",
            backgroundColor:"#fff",
            borderRadius:10,
            paddingTop:30
          }}>

          <View style={styles.row}>
            <View style={styles.center}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: data?.hostTeam?.logoUrl }}
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                
                />
              </View>
              <McText
                align={"center"}
                bold
                size={15}
                color={"#000"}
                style={{ marginTop: 9 }}
              >
                {data?.hostTeam?.name}
              </McText>
            </View>
            <View style={styles.center}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 5,
                  borderRadius: 15,
                }}
                source={{ uri: data?.logoUrl }}
              />
             
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  height: 30,
                  width: 80,
                  marginTop:10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <McText color={"#000"} size={25}>
                  {data?.hostTeamPoint + " - " + data?.guestTeamPoint}
                </McText>
              </View>
              <McText
              black
              color={"#000"}
              align="center"
              size={10}
              style={{ width: 500 ,marginTop:8}}
            >
              {new Date(data?.startTime).toDateString()}
            </McText>
            </View>
            <View style={styles.center}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                resizeMode="contain"
                  source={{ uri: data?.guestTeam?.logoUrl }}
                  style={{ width: 60, height: 60 }}
                />
              </View>
              <McText
                align={"center"}
                bold
                size={15}
                color={"#000"}
                style={{ marginTop: 9 }}
              >
                {data?.guestTeam?.name}
              </McText>
            </View>
          </View>
          <View
            style={{
              bottom: 20,
             
              width: `100%`,
              alignItems: "center",
              alignSelf:"center"
            }}
          >
            <TimeDisplayBack
              totalSeconds={new Date(data?.startTime).getTime()}
              finishSeconds={new Date(data?.endTime).getTime()}
              flagStop={timeCheck}
            />
          </View>
          </Card>
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: `100%`,
    justifyContent: "space-between",
  },
  center: {
    width: 100,
    alignItems: "center",
   
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",

    width: widthFull - 30,
    height: 200,

    // Add gradient background here using LinearGradient (optional)
  },
  full: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: "transparent",

    width: widthFull,
    alignItems: "center",
    justifyContent: "center",
    // Add gradient background here using LinearGradient (optional)
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  caption: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  timeContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  h5: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  h4: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  timeUnitContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
});

// Rest of the code remains the same as in the original.
 