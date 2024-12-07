import React, { useEffect, useState , useCallback } from "react";
import Timer from "./index";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import { useFocusEffect } from "@react-navigation/native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from "../../Constants";
import { CircleProgressBar } from "../react-native-circular-progress/ProgressBar";
import {
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";

import Svg, { Circle, Rect } from "react-native-svg";

const BACKGROUND_COLOR = "#fff";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = Colors.platform.android.primary;

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Rect);
const TimeDisplayBack = ({ totalSeconds, flagStop, finishSeconds }) => {
  const [seconds, setSeconds] = useState(0);
  const [finishSecondsTime, setFinishSecondTime] = useState(0);

  const [flagStopDelay, setFlagStopDelay] = useState(true);

  // const newEnd = new Date().getTime()-dely;
  const getTimeGMT = async () => {
    const pingStart = new Date().getTime();
    const response = await axios.get(
      `https://timeapi.io/api/Time/current/zone?timeZone=Universal`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const { year, month, day, hour, minute, seconds, milliSeconds, timeZone } =
      response.data;

    // Create a new Date object with the provided components
    const utcDate = new Date(
      Date.UTC(year, month - 1, day, hour, minute, seconds, milliSeconds)
    );

    const newEnd = new Date().getTime();
    const pingEnd = new Date().getTime();
    const roundTripTime = pingEnd - pingStart;
    const estimatedLatency = roundTripTime / 2;

    const change = utcDate.getTime() - estimatedLatency;

    return change;
  };
  let diffInterval = null;
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen gains focus
      getTimeGMT().then((dataTime) => {
        let ntpTime = dayjs(totalSeconds);
        const time = Math.floor(dataTime / 1000);
        const lightshowStart = dayjs.unix(time).add(10, "s");

        const diff = lightshowStart.diff(ntpTime);
        const timeLive = Math.floor(diff / 1000);
        setSeconds(timeLive);
        getTimeGMT().then((dataTime) => {
          let ntpTime = dayjs(totalSeconds);
          const time = Math.floor(dataTime / 1000);
          const lightshowStart = dayjs.unix(time).add(10, "s");

          const diff = lightshowStart.diff(ntpTime);
          const timeLive = Math.floor(diff / 1000);
          setSeconds(timeLive);
        });
        getTimeGMT().then((dataTime) => {
          let ntpTime = dayjs(totalSeconds);
          const time = Math.floor(dataTime / 1000);
          const lightshowStart = dayjs.unix(time).add(10, "s");

          const diff = lightshowStart.diff(ntpTime);
          const timeLive = Math.floor(diff / 1000);
          setSeconds(timeLive);
        });
      });

      // Specify a cleanup function
      return () => {
        // Cleanup logic, if needed
      };
    }, [])
  );
  useEffect(() => {
    let diff = 0;

    const fetchData = () => {
      getTimeGMT().then((dataTime) => {
        let ntpTime = dayjs(totalSeconds);
        const time = Math.floor(dataTime / 1000);
        const lightshowStart = dayjs.unix(time).add(10, "s");

        diff = lightshowStart.diff(ntpTime);
        const timeLive = Math.floor(diff / 1000);
        setSeconds(timeLive);
      });
    };

    if (!flagStopDelay) {
      clearInterval(diffInterval);
    } else {
      clearInterval(diffInterval);

      fetchData(); // Fetch data immediately
      diffInterval = setInterval(fetchData, 8000);
    }

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(diffInterval);
    };
  }, []);
  let intervalId = false;
  let interval = null;
  useEffect(() => {
    if (!flagStopDelay) {
      clearInterval(interval);
    } else {
      clearInterval(interval);
      setTimeout(() => {
        interval = setInterval(fetchData, 1000);
      }, 4000);
    }

    intervalId = true;
    const fetchData = () => {
      setSeconds((seconds) => {
        if (seconds <= 0) {
          return 0;
        } else {
          return seconds + 1;
        }
      });
    };
  }, []);
  useEffect(() => {
    const timeDifferenceInMilliseconds = finishSeconds - totalSeconds;
    const timeDifferenceInSeconds = Math.floor(
      timeDifferenceInMilliseconds / 1000
    );

    // Convert milliseconds to seconds
    // Calculate fill percentage based on elapsed time

    const fill = (seconds / timeDifferenceInSeconds) * 100;
    progress.value = 0.1;

    setFinishSecondTime(fill);
  }, [seconds]);
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 200000 });
  }, []);
 
  return (
    <View
      style={{
       
        width: 300,
        height: 60,
        borderRadius: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      

     
      
          {/* {days > 0 ?
          <View style={{backgroundColor:"#000",borderRadius:8,width:25,height:25,alignItems:"center",justifyContent:"center"}}>
            
           
          <Text style={{color:"#fff"}}>
          {days > 0 && days.toString().padStart(2, "0") + "d "}
          </Text>
          </View>
          :null} */}
          {/* <View style={{backgroundColor:"#000",borderRadius:8,width:25,height:25,alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"#fff"}}>
          {remainingHours.toString().padStart(2, "0")}
          </Text>
          </View> */}
          <View style={{width:`100%`,alignItems:"center",alignSelf:"center"}}> 
          <View style={styles.time}>
   
   <Text style={{color:"#000",fontWeight:"bold",fontSize:15}}>
   {remainingMinutes.toString().padStart(2, "0")+" :"}
   </Text>
 
  

   <Text style={{color:"#000",fontWeight:"bold",fontSize:15}}>
   {remainingSeconds.toString().padStart(2, "0")}
   </Text>
   
   </View>
    
</View>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    justifyContent: "center",
  },

  time: {
   
   flexDirection:"row",
   justifyContent:"center",

   borderRadius:20,
   borderWidth:1,
   alignItems:"center",

   top:5,
   width:80,
   borderColor:Colors.platform.android.primary,

  
   height:30
  },
});

export default TimeDisplayBack;
