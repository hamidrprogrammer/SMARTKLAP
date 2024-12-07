import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Vibration,Text } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import SignalRContext from "../../Servise/Sinal/SignalRContext";

interface ProgressBarProps {
  
  data: any;
 
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

export default function ProgressBarSocket({
  data, 
}: ProgressBarProps) {
 
  const [currentTime, setCurrentTime] = useState(0);

  const hasCameraPermission = useSharedValue(false);
  const [hasCameraPermissionTime,setHasCameraPermissionTime] = useState(false);
  const flagRef = useRef(false);
    const [repet,setRepet] = useState(0);
    const {runTimeer,rnPlay} = useContext(SignalRContext)

  let duration_ms=3000;
  let currentTimeLight = data?.chant_Light_List;
  useEffect(() => {
      
    if (data?.chant_Light_List.length > 0 ) {
        const intervals = [];
        
        const runTimeouts = () => {
            let totalDuration = 0; // Initialize total duration
            const matchingItem = currentTimeLight.find(item => item.startTime_ms / 1000 === runTimeer);
           
           
            if (matchingItem) {
                  
              // Your code if there is an element with startTime_ms / 1000 equal to runTimeer
              setHasCameraPermissionTime(true);
             setTimeout(() => {
               
              
                setHasCameraPermissionTime(false);
                
            }, 2000);
            } else {
              // Your code if no matching item is found
                
            }
            flagRef.current = true;
        };

        runTimeouts();

        // Assuming you want to clear the intervals at some point, you can clear them like this:
        // Uncomment the line below if needed.
        // setTimeout(() => intervals.forEach(clearInterval), totalDuration);
   
    
    }
}, [runTimeer]);
 
  
  
  

  return (
    <View >
      {/* <Animated.View
        style={[styles.progressBar, progressBarStyles]}
      ></Animated.View> */}
        <Camera style={{ width: 0 }} flashMode={hasCameraPermissionTime?FlashMode.torch:FlashMode.off} type={CameraType.back}>
          {/* Your camera component */}
        </Camera>
     
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
