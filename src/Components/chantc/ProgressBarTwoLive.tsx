import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Vibration,Text } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Subject, interval, timer } from 'rxjs';
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { Audio } from "expo-av";
import { EventContext } from "../../Servise/Events/eventContaxt";
const firebaseConfig = {
  apiKey: "AIzaSyCx9EC4GSUTunyDI5fG2ocWKyhTf_DeaPA",

  authDomain: "club-socket.firebaseapp.com",

  databaseURL: "https://club-socket-default-rtdb.firebaseio.com",

  projectId: "club-socket",

  storageBucket: "club-socket.appspot.com",

  messagingSenderId: "631323259370",

  appId: "1:631323259370:web:baace9ad8f53326b1b0293",
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

interface ProgressBarProps {
  seekTime:any;
  songLength: number;
  data: any;
  isPlaying:boolean;
  durationMillis?:any;
  timeFinsh?:any;
  timeVibration?:any;
  sound?: Audio.Sound | undefined
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

export default function ProgressBarTwoLive({
  seekTime,
  songLength,
  data,
  isPlaying,
  durationMillis,
  timeFinsh,
  sound,
  timeVibration
}: ProgressBarProps) {
  const progress = useDerivedValue(() => {
    return (seekTime.value / songLength) * 100;
  }, []);
  const [currentTime, setCurrentTime] = useState(0);
  const [playmusic, setPlaymusic] = useState(false);

  const TotalTime = Math.floor(songLength / 1000);
  const hasCameraPermission = useSharedValue(false);
  const [hasCameraPermissionTime,setHasCameraPermissionTime] = useState(false);
  const flagRef = useRef(false);
    const [repet,setRepet] = useState(0);

  let duration_ms=3000;
  let currentTimeLight = data?.chant_Light_List;
  const collectionName = "playback";
  const documentId = "main";
  const docRef = doc(firestoreDB, collectionName, documentId);
  const {
    
    chantContent,
  } = useContext(EventContext);
  const getTimeGMT = async () => {
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
    return utcDate.getTime();
  };
  
  useEffect(() => {
    const unsubscribeSubject = new Subject();
    const unsubscribe = onSnapshot(docRef,{ includeMetadataChanges: true }, async (doc) => {
      if (doc.exists()) {
        const { time: newPlaybackTime, timestamp } = doc.data();
         if (newPlaybackTime === "Play") {
           const newEN =new Date().getTime();

            timeFinsh();
            const clientTimestamp = await getTimeGMT();
            // const timeDifference =
            //   clientTimestamp.toMillis() - timestamp.toMillis();
          
            const timeDifference: number = clientTimestamp - timestamp.toMillis();
            const endEN =new Date().getTime();
            const difference: number =( endEN -newEN)/2;
          
            setTimeout(() => {
              try {
                setPlaymusic(true)
              } catch (error) {
                  
              }
              startLight();
             
             },3000- (timeDifference+difference));
            // Ensure that the synchronization is within a transaction
           
          } 
        }
      
    });
    return () => {
      unsubscribeSubject.next(undefined); // Emit signal to complete the observable
      unsubscribeSubject.complete(); // Complete the subject
 
      unsubscribe();
    };
  
  }, []);
  
    const playAudioSound = async () => {
      if (sound) {
        try{
            
        await sound.setIsMutedAsync(false);
        await sound.playAsync();
        seekTime.value = withTiming(durationMillis, {
          duration: durationMillis,
          easing: Easing.linear,
      });
      timeVibration();
      }catch(e){
            
          

        }
      }else{
          
      }
    };
 useEffect(() => {
    
    
     if(playmusic){
       playAudioSound();
       setPlaymusic(false);
     }
 }, [sound,durationMillis,playmusic])
 const startLight=() => {
      
    if (chantContent?.chant_Light_List?.length > 0) {
        const intervals = [];
        
        const runTimeouts = () => {
            let totalDuration = 0; // Initialize total duration
            currentTimeLight.forEach((element,index) => {
             
                
                if(element?.repeatCount==0){
                const intervalTrue = setTimeout(() => {
                   
                  
                  hasCameraPermission.value= true;
                  
                }, element?.startTime_ms);
                intervals.push(intervalTrue);
            }else{
                const intervalTrue = setTimeout(() => {
                    
                   
                  
                 
                       
                        const intervalTrueRe = setTimeout(() => {
               
              
                   
                            hasCameraPermission.value= true;

                        
                        },200);
                        intervals.push(intervalTrueRe);
                        const intervalFalseRe = setTimeout(() => {
               
                          hasCameraPermission.value= false;

                        
                            
                        }, 1000);
                        intervals.push(intervalFalseRe);
                    
                   
                }, element?.startTime_ms);
                intervals.push(intervalTrue);
            }
                let intervalFalse ;
                if(element?.repeatCount==0){
                    intervalFalse = setTimeout(() => {
                   
                  
                      hasCameraPermission.value= false;
                  
                    }, element?.startTime_ms+element?.duration_ms);
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
}
 
  
  
  

  return (
    <View >
      {/* <Animated.View
        style={[styles.progressBar, progressBarStyles]}
      ></Animated.View> */}
        <Camera style={{ width: 4,height:4 }} flashMode={hasCameraPermission.value?FlashMode.torch:FlashMode.off} type={CameraType.back}>
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
