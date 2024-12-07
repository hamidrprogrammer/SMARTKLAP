import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useEffect, useState } from "react";
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

export default function ProgressBar({
  seekTime,
  songLength,
  data,
}: ProgressBarProps) {
  const progress = useDerivedValue(() => {
    return (seekTime.value / songLength) * 100;
  }, []);
  const [currentTime, setCurrentTime] = useState(0);

  const TotalTime = Math.floor(songLength / 1000);
  const hasCameraPermission = useSharedValue(false);
  const [hasCameraPermissionTime,setHasCameraPermissionTime] = useState(0);
  const [flag,setFlag] = useState(false);
  const [repet,setRepet] = useState(0);

  let duration_ms=3000;
  let currentTimeLight = data?.chant_Light_List;
  useEffect(() => {
      

    if(flag){
      if(hasCameraPermissionTime>100){

     
      setTimeout(() => {
             
           hasCameraPermission.value =false;
           setFlag(false)

         }, hasCameraPermissionTime);
        }else{
            

          for(let i = 1; i < repet+1; i++){
            setFlag(true)
                
              // hasCameraPermission.value = FlashMode.on;
   
            
            setTimeout(() => {
                
              setFlag(false)
              hasCameraPermission.value = true;
              setTimeout(() => {
              hasCameraPermission.value =false;
        
            }, 10*i);

   
            }, 500*i);
          }
        }
   }
  
    
  }, [hasCameraPermissionTime])
  
  const setCorrectTime = (milliseconds: number) => {
    const seconds = (milliseconds / songLength) * 100;
    //   

    if (seconds !== currentTime) {
      setCurrentTime(seconds);

      data?.chant_Light_List?.forEach((item,index) => {
        const itemStartTime = item?.startTime_ms / 1000; // Convert to seconds
        let  currentTimeSeconds =
          (seconds * TotalTime) / 100; // Convert to seconds
          
          
          if (currentTimeSeconds >= itemStartTime && currentTimeSeconds <= itemStartTime + 0.019&&flag==false) {
              
            setFlag(true)
          
           

          if(item.duration_ms!=null||item.duration_ms>0&&item?.repeatCount==0){
              
          hasCameraPermission.value = true;

            setHasCameraPermissionTime(item.duration_ms+index);

          }else{
              
            setRepet(item?.repeatCount)
            setHasCameraPermissionTime(index+1);

          }
         
        }
      //   if ( item.repeatCount	>0) {
      //   if (seconds >= itemStartTime && seconds <= itemStartTime + 1) {
      //     hasCameraPermission.value = FlashMode.torch;
      //     setTimeout(() => {
      //       hasCameraPermission.value = FlashMode.off;
      //     }, item.duration_ms);
      //   }
      // }
      });
      data?.chant_Vibrate_List?.forEach((item,index) => {
        const itemStartTime = item?.startTime_ms / 1000; // Convert to seconds
        let  currentTimeSeconds =
          (seconds * TotalTime) / 100; // Convert to seconds
          
          
          if (currentTimeSeconds >= itemStartTime && currentTimeSeconds <= itemStartTime + 0.019&&flag==false) {
              
           
          
           

          if(item.duration_ms!=null||item.duration_ms>0&&item?.repeatCount==0){
            Vibration.vibrate();

          }else{
            const ONE_SECOND_IN_MS = 1000;

            const PATTERN = [
              1 * ONE_SECOND_IN_MS,
              2 * ONE_SECOND_IN_MS,
              3 * ONE_SECOND_IN_MS,
            ];            
            Vibration.vibrate(PATTERN);

          }
         
        }
      //   if ( item.repeatCount	>0) {
      //   if (seconds >= itemStartTime && seconds <= itemStartTime + 1) {
      //     hasCameraPermission.value = FlashMode.torch;
      //     setTimeout(() => {
      //       hasCameraPermission.value = FlashMode.off;
      //     }, item.duration_ms);
      //   }
      // }
      });
     
      
     
    
     
      // Update the shared value
    }
  };
  useDerivedValue(() => {
    runOnJS(setCorrectTime)(seekTime.value);
  });
  // const progressBarStyles = useAnimatedStyle(() => {
  //     
  //     
  //     
 

  //   return {
  //     width: `${currentTime}%`,
  //   };
  // });

  return (
    <View >
      {/* <Animated.View
        style={[styles.progressBar, progressBarStyles]}
      ></Animated.View> */}
        <Camera style={{ width: 0 }} flashMode={hasCameraPermission.value?FlashMode.torch:FlashMode.off} type={CameraType.back}>
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
