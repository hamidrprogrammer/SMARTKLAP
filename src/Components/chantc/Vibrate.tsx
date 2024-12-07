import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { Camera, CameraType } from 'expo-camera/legacy';

interface VibrateProps {
  seekTime: Animated.SharedValue<number>;
  songLength: number;
  Vibrate:any;
}

const secondToMinute = (seconds: number) => {
  return Math.floor(seconds / 60);
};

const formattedSeconds = (seconds: number) => {
  const onlySeconds = seconds % 60;
  if (onlySeconds < 10) {
    return `${0}${onlySeconds}`;
  }
  return onlySeconds;
};
import * as Haptics from 'expo-haptics';
import { Vibration } from "react-native";

export default function Vibrate({
  seekTime,
  songLength,
  Vibrate
}: VibrateProps) {
 
  const [currentTime, setCurrentTime] = useState(0);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  
  const TotalTime = Math.floor(songLength / 1000);
  const setCorrectTime = (milliseconds: number) => {
    const seconds =((milliseconds) / songLength) * 100;
    if (seconds !== currentTime) {
      setCurrentTime(seconds);
    }
  };
  useDerivedValue(() => {
    runOnJS(setCorrectTime)(seekTime.value);
  });
  const vibrate = () => {
    if (Platform.OS === "ios") {
        Vibration.vibrate()
      setTimeout(() =>{Vibration.cancel()}, 3000);
      
    } else {
    
      Vibration.vibrate(2000);
    }
  };
  useEffect(() => {
    const itemFound = Vibrate?.some(item => {
      const itemStartTime = (item?.startTime_ms / 1000); // Convert to seconds
      const currentTimeSeconds = currentTime * TotalTime / 100; // Convert to seconds
      
      return (
        itemStartTime <= currentTimeSeconds &&
        currentTimeSeconds <= itemStartTime + 2
      );
    });
    if(itemFound){
      vibrate()
    }
    
  }, [currentTime]);
  return (
    <View style={styles.VibrateContainer}>
  
    </View>
  );
}

const styles = StyleSheet.create({
  VibrateContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
    borderRadius: 2,
  },
  Vibrate: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
