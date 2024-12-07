import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useEffect, useRef, useState } from "react";
import { Vibration,Text } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ProgressBarProps {
  seekTime: Animated.SharedValue<number>;
  songLength: number;
  data: any;
  isPlaying:boolean;
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

export default function ProgressBarTree({
  seekTime,
  songLength,
  data,
  isPlaying,
}: ProgressBarProps) {
  const progress = useDerivedValue(() => {
    return (seekTime.value / songLength) * 100;
  }, []);
  const [currentTime, setCurrentTime] = useState(0);

  const TotalTime = Math.floor(songLength / 1000);
  const hasCameraPermission = useSharedValue(false);
  const [hasCameraPermissionTime,setHasCameraPermissionTime] = useState(false);
  const flagRef = useRef(false);
    const [repet,setRepet] = useState(0);
    const PATTERN = [
      1 * 1000,
      2 * 1000,
    ];
  let duration_ms=3000;
  let currentTimeLight = data?.chant_Vibrate_List;
  useEffect(() => {
      
    if (data?.chant_Vibrate_List.length > 0 && !flagRef.current&&isPlaying) {
        const intervals = [];
        
        const runTimeouts = () => {
            let totalDuration = 0; // Initialize total duration
            currentTimeLight.forEach((element,index) => {
                  
                
                if(element?.repeatCount==0){
                const intervalTrue = setTimeout(() => {
                   
                  
                  if (isPlaying) {
                    Vibration.vibrate(PATTERN);
                  }
                      
                }, element?.startTime_ms);
                intervals.push(intervalTrue);
            }else{
                const intervalTrue = setTimeout(() => {
                      
                   
                  
                    for (let i = 1; i <=element?.repeatCount; i++) {
                          
                          
                        const intervalTrueRe = setTimeout(() => {
               
              if (isPlaying) {
                Vibration.vibrate(PATTERN);
              }

                              
                        },120*i);
                        intervals.push(intervalTrueRe);
                        
                    
                    }
                      
                }, element?.startTime_ms);
                intervals.push(intervalTrue);
            }
                

            });
              


            flagRef.current = true;
        };
        runTimeouts();

        // Assuming you want to clear the intervals at some point, you can clear them like this:
        // Uncomment the line below if needed.
        // setTimeout(() => intervals.forEach(clearInterval), totalDuration);
   
    
    }
}, [isPlaying]);
  useEffect(() => {
      
    
  }, [isPlaying])
  
  
  

  return (
    <View >
      {/* <Animated.View
        style={[styles.progressBar, progressBarStyles]}
      ></Animated.View> */}
       
     
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
    borderRadius: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
