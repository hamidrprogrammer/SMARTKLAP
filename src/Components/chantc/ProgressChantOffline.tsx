import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useEffect, useRef, useState } from "react";
import { Vibration, Text, Platform } from "react-native";
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
  seekTime:boolean;
  songLength: boolean;
  data: any;
  isPlaying: boolean;
  finish: boolean;
}




export default function ProgressBarOffline({
  seekTime,
  songLength,
  data,
  isPlaying,
  finish
}: ProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0);

  const hasCameraPermission = useSharedValue(false);
  const [hasCameraPermissionTime, setHasCameraPermissionTime] = useState(false);
  const flagRef = useRef(false);
  const [repet, setRepet] = useState(0);
  const [repetVibrate, setRepetVibrate] = useState(0);

  let duration_ms = 3000;
  let currentTimeLight = data?.chant_Light_List;
  let currentTimeVibrate= data?.chant_Vibrate_List;
  useEffect(() => {
if(finish){
  setRepet(0);
  setRepetVibrate(0)
}

  }, [finish]);
  useEffect(() => {
      

    const intervals = [];

    const runTimeouts = () => {
        

      if (seekTime) {
     

      
            
          if(currentTimeVibrate[repetVibrate]?.repeatCoun==1){
            Vibration.vibrate(200);
          }else{
            for (let i =0; i <=currentTimeVibrate[repetVibrate]?.repeatCount; i++) {

            
              setTimeout(() => {
               Vibration.vibrate(100);
 
              }, 250*i);
               
              
             
             
             
           }
          }
         
        
        // Turn on flashlight
      
        setRepetVibrate(repet + 1);
      } 
    };

    runTimeouts();

    // Assuming you want to clear the intervals at some point, you can clear them like this:
    // Uncomment the line below if needed.
    // setTimeout(() => intervals.forEach(clearInterval), totalDuration);
  }, [seekTime]);
  useEffect(() => {
      

    const intervals = [];

    const runTimeouts = () => {
        

      if (songLength) {
     

        if(currentTimeLight[repet]?.duration_ms== null){
            

          for (let i = 1; i <=currentTimeLight[repet]?.repeatCount; i++) {

            
             setTimeout(() => {
                if(Platform.OS!="ios"){
                  
                  Torch.switchState(true); // Turn ON
                 }

                  setHasCameraPermissionTime(true);
                    
              },(200*i));
             
             setTimeout(() => {
                if(Platform.OS!="ios"){
                  Torch.switchState(false); // Turn ON
                 }

                  setHasCameraPermissionTime(false);
                    
              }, (180*(i+1)));
            
            
          }
          // setRepet(repet + 1);
        }else{
          if (Platform.OS != "ios") {
            Torch.switchState(true); // Turn ON
          }
          setHasCameraPermissionTime(true);
        }
        // Turn on flashlight
      
        setRepet(repet + 1);
      } else {
        // Turn off flashlight
        if (Platform.OS != "ios") {
          Torch.switchState(false); // Turn ON
        }
        setHasCameraPermissionTime(false);
      }
    };

    runTimeouts();

    // Assuming you want to clear the intervals at some point, you can clear them like this:
    // Uncomment the line below if needed.
    // setTimeout(() => intervals.forEach(clearInterval), totalDuration);
  }, [songLength]);
  useEffect(() => {
      
  }, [isPlaying]);

  return (
    <View>
      {/* <Animated.View
        style={[styles.progressBar, progressBarStyles]}
      ></Animated.View> */}
      {Platform.OS === "ios" ? (
        <Camera
          style={{ width: 0 }}
          flashMode={hasCameraPermissionTime ? FlashMode.torch : FlashMode.off}
          type={CameraType.back}
        >
          {/* Your camera component */}
        </Camera>
      ) : null}
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
