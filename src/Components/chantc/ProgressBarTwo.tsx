import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, FlashMode } from 'expo-camera/legacy';
import React, { useEffect, useRef, useState } from "react";
import { Vibration,Text, Platform } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Torch from "react-native-torch";

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

export default function ProgressBarTwo({
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

  let duration_ms=3000;
  let currentTimeLight = data?.chant_Light_List;
  useEffect(() => {
      
    if (data?.chant_Light_List?.length > 0 && !flagRef.current&&isPlaying) {
        const intervals = [];
        
        const runTimeouts = () => {
            let totalDuration = 0; // Initialize total duration
            currentTimeLight.forEach((element,index) => {
                  
                let time =0 
                if(Platform.OS!="ios"){
                  time = 100
                }
                if(element?.repeatCount==0){
                const intervalTrue = setTimeout(async () => {
                  const startDley = new Date().getTime()
                  if(Platform.OS!="ios"){
                    
                    Torch.switchState(true); // Turn ON
                  }

                    setHasCameraPermissionTime(true);
                      
                    const endtDley = new Date().getTime()
                    const result = endtDley-startDley
                    await AsyncStorage.setItem('DelyThree', result.toString());
                }, element?.startTime_ms-time);
                intervals.push(intervalTrue);
            }else{
                const intervalTrue = setTimeout(() => {
                      
                   
                  
                    for (let i = 1; i <=element?.repeatCount; i++) {
                          
                          
                        const intervalTrueRe = setTimeout(() => {
                          if(Platform.OS!="ios"){
                            
                            Torch.switchState(true); // Turn ON
                           }

                            setHasCameraPermissionTime(true);
                              
                        },(200*i)-time);
                        intervals.push(intervalTrueRe);
                        const intervalFalseRe = setTimeout(() => {
                          if(Platform.OS!="ios"){
                            Torch.switchState(false); // Turn ON
                           }

                            setHasCameraPermissionTime(false);
                              
                        }, (180*(i+1))-time);
                        intervals.push(intervalFalseRe);
                    }
                      
                }, element?.startTime_ms-time);
                intervals.push(intervalTrue);
            }
                let intervalFalse ;
                if(element?.repeatCount==0){
                    intervalFalse = setTimeout(() => {
                   if(Platform.OS!="ios"){
                    Torch.switchState(false); // Turn ON
                   }
                     // Turn ON

                        setHasCameraPermissionTime(false);
                          
                    }, (element?.startTime_ms+element?.duration_ms)-time);
                }else{
                    

                        
                        
                        
                   
                }
                intervals.push(intervalFalse);

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
      {Platform.OS === "ios"?
        <Camera style={{ width: 0 }} flashMode={hasCameraPermissionTime?FlashMode.torch:FlashMode.off} type={'back'}>
          {/* Your camera component */}
        </Camera>
       :null }
     
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
