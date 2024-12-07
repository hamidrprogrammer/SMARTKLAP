import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Modal,
  AppState,
  BackHandler,
  Platform,
  ActivityIndicator,
} from "react-native";
import Lyrics from "../../../Components/chantc/Lyrics";
import ProgressBar from "../../../Components/chantc/ProgressBar";
import TimeStamps from "../../../Components/chantc/TimeStamps";
import LyricsData from "../../../Components/chantc/lyricsData.json";
import {
  SendDelay,
  SendPlayMusic,
  addStartPlaybackListener,
  phoneConnected,
  readyConnect,
  startConnection,
  startConnectionCheck,
  stopConnection,
} from "../../../core/SignalRClient";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../../Constants";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import {
  KeepAwake,
  activateKeepAwake,
  activateKeepAwakeAsync,
  deactivateKeepAwake,
  useKeepAwake,
} from "expo-keep-awake";

import { SONG_BG_COLOR, THRESHOLD } from "../../../Components/chantc/constants";
import { ImageBackground } from "react-native";
import TimerComponent from "../../../Components/timer/TimerComponent";
import { Audio, InterruptionModeIOS } from "expo-av";
import ProgressBarTwo from "../../../Components/chantc/ProgressBarTwo";
import ProgressBarTree from "../../../Components/chantc/ProgressBarTree";
import SignalRContext from "../../../Servise/Sinal/SignalRContext";
import TimeDisplay from "../../../Components/timer/TimeDisplay";
import BackButton from "../../../Components/BackButton";
import PlayButton from "../../../Components/chantc/PlayButton";
import ProgressBarOffline from "../../../Components/chantc/ProgressChantOffline";

export default function LyricsPageButton({ navigation, route }) {
  const { setFlagEnterScreen, chantContentOffline } = useContext(EventContext);

  const receivedData = route.params?.data || null;
  const [isTime, setTime] = useState(true);
  const { data } = route.params || {};

  const [durationMillis, setDurationMillis] = useState(0);
  const [position, setPosition] = useState(false);
  const [positionVibrate, setPositionVibrate] = useState(false);

  const [playLight, setPlayLight] = useState(false);
  const [timeToPlayMusic, setTimeToPlayMusic] = useState(false);

  const { height } = useWindowDimensions();
  const seekTime = useSharedValue(0);
  const halfScrollComponentHeight = 0.3 * height;

  const [heights, setHeights] = useState<number[]>(
    new Array(chantContentOffline?.chant_Lyric_List.length).fill(30)
  );
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const isPlaying = useSharedValue(false);
  const [inActive, setIsInActive] = useState("");
  const [finish, setFinish] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [delayPlayMusic, setDelayPlayMusic] = useState(0);

  let isPlayNew = false;

  useEffect(() => {
    const backAction = () => {
      // Your custom function or logic here
      // For example, you can navigate to another screen, show a confirmation dialog, etc.
      // Return true to prevent default behavior (exiting the app)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    async function loadAudio() {
      try {
          
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          shouldDuckAndroid: false,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: true,
        });
        const audioUrl = chantContentOffline?.chant_Audio_List[0]?.fileUrl;
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          updatePlaybackStatus
        );

        setSound(sound);
        setDurationMillis(status.durationMillis || 0);
        setTimeout(() => {
          toggleMute();
        }, 5000);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading audio:", error);

        // Retry loading audio after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setRetryAttempts(retryAttempts + 1);
          loadAudio();
        }, 3000);
      }
    }

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  const toggleMute = async () => {
    if (sound) {
      const dateStartIsMutedAsync = new Date().getTime();
      await sound.setIsMutedAsync(true);
      await sound.playAsync();
      const dateEndIsMutedAsync = new Date().getTime();
      setDelayPlayMusic(dateEndIsMutedAsync - dateStartIsMutedAsync);
      setTimeout(async () => {
        await sound.stopAsync();
      }, 10000);
    }
  };
  useEffect(() => {
    async function loadAudio() {
      try {
        setIsLoading(true);
          
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          shouldDuckAndroid: false,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: true,
        });
        const audioUrl = chantContentOffline?.chant_Audio_List[0]?.fileUrl;
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          updatePlaybackStatus
        );

        setSound(sound);
        setDurationMillis(status.durationMillis || 0);
        setTimeout(() => {
          toggleMute();
        }, 5000);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading audio:", error);
        if (retryAttempts < 50) {
          // Retry loading audio after a delay (e.g., 3 seconds)
          setTimeout(() => {
            setRetryAttempts(retryAttempts + 1);
            loadAudio();
          }, 3000);
        } else {
          // Display an error message or handle the failure as needed
          setIsLoading(false);
        }
      }
    }

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [retryAttempts]);

  const updatePlaybackStatus = async (status) => {
    if (status) {
  

      if (status.didJustFinish) {
        setFinish(true);
        // Audio has finished playi 0--0] y 0ng, navigate back
        if (Platform.OS != "ios") {
          Torch.switchState(false);
        }
       setPosition(false)
       setPositionVibrate(false)

          isPlaying.value =false ;
       setDurationMillis(0)
          seekTime.value = 0
        isPlaying.value = false;
    const audioUrl = chantContentOffline?.chant_Audio_List[0]?.fileUrl;
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: false },
      updatePlaybackStatus
    );
    setSound(sound);
    setFinish(false);
        // setFlagEnterScreen(true);
        // setPlayLight(false);
      }else{
        setDurationMillis(status?.durationMillis);
      }
    }
  };
  let checkLight = true;
  const lyricsScrollValue = useDerivedValue(() => {
    const sumOfHeights = (index: number) => {
      let sum = 0;
      for (let i = 0; i < index; ++i) {
        sum += heights[i];
      }
      return sum;
    };

    if (
      !chantContentOffline?.chant_Lyric_List ||
      chantContentOffline.chant_Lyric_List.length === 0
    ) {
      return 0;
    }

    const firstLyricStartTime = chantContentOffline.chant_Lyric_List[0].startTime_ms;
    if (seekTime.value < firstLyricStartTime - THRESHOLD) {
      return 0;
    }

    // Don't go till last or the screen would be left empty

    for (
      let index = 1;
      index < chantContentOffline.chant_Lyric_List.length - 1;
      index++
    ) {
      const currTime = chantContentOffline.chant_Lyric_List[index].startTime_ms;
      const lastTime = chantContentOffline.chant_Lyric_List[index - 1].startTime_ms;

      if (seekTime.value > lastTime && seekTime.value < currTime - THRESHOLD) {
        return sumOfHeights(index - 1);
      } else if (seekTime.value < currTime) {
        return withTiming(sumOfHeights(index), {
          duration: THRESHOLD,
          easing: Easing.quad,
        });
      }
    }

    return sumOfHeights(chantContentOffline.chant_Lyric_List.length - 1);
  }, [heights]);
  const setShowComponentWithDelay = (value,i) => {
    setTimeout(() => {
      setPosition(value);
    }, i); // Adjust the delay time as needed
  };
  const vibrateScrollValue = useDerivedValue(() => {
    if (chantContentOffline?.chant_Vibrate_List?.length >= 1) {
     
      for (let i = 0; i < chantContentOffline.chant_Vibrate_List.length; i++) {
        const event =chantContentOffline?.chant_Vibrate_List[i];
          

          if (
            seekTime.value >= event.startTime_ms &&
            seekTime.value < event.startTime_ms + 3000
          ) {
      
           
            
            return event.startTime_ms ;
          } 
         
        
        
      }
    }
    return 0;
  }, [heights]);
  const lightScrollValue = useDerivedValue(() => {
    if (chantContentOffline?.chant_Light_List?.length > 0) {
      for (let i = 0; i < chantContentOffline.chant_Light_List.length; i++) {
        const event = chantContentOffline.chant_Light_List[i];
        //   
        if(event.duration_ms==0||event.duration_ms==null){
          if (
            seekTime.value >= event.startTime_ms &&
            seekTime.value < event.startTime_ms + 3000
          ) {
      
           
            
            return event.startTime_ms ;
          } 
         
        }else{
          if (
            seekTime.value >= event.startTime_ms &&
            seekTime.value < event.startTime_ms + event.duration_ms
          ) {
      
            return event.startTime_ms;
          } 
        }
        
      }
    }
    return 0;
  }, [heights]);
  const [showComponent, setShowComponent] = useState(false);

  useAnimatedReaction(
    () => lightScrollValue.value, // The value to react to
    (newValue, oldValue) => {
      if (newValue > 0) {
        runOnJS(setPosition)(true);
      } else {
        runOnJS(setPosition)(false);
      }
    },
    [lightScrollValue], // Dependencies to track changes
  );
  useAnimatedReaction(
    () => vibrateScrollValue.value, // The value to react to
    (newValue, oldValue) => {
      if (newValue > 0) {
          
        
        runOnJS(setPositionVibrate)(true);
      } else {
        runOnJS(setPositionVibrate)(false);
      }
    },
    [vibrateScrollValue], // Dependencies to track changes
  );
  const scrollViewStyle = useAnimatedStyle(() => {
    // In spotify the scroll happens only after half of the screen
    return {
      transform: [
        {
          translateY:
            lyricsScrollValue.value > halfScrollComponentHeight
              ? -lyricsScrollValue.value + halfScrollComponentHeight
              : 0,
        },
      ],
    };
  });

  const topGradientStyle = useAnimatedStyle(() => {
    if (lyricsScrollValue.value > halfScrollComponentHeight) {
      return {
        opacity: withTiming(1, {
          duration: 300,
        }),
      };
    }
    return {
      opacity: 0,
    };
  });

  // Function to stop song from playing

  useEffect(() => {
    // Check if all the heights are greater than zero or else quit early;
    for (let i = 0; i < heights.length; ++i) {
      if (heights[i] === 0) {
        return;
      }
    }
      
  }, [heights]);
  const repPlayAudio = async () => {
    if (sound) {
      await sound.playAsync();
      await sound.pauseAsync();
      seekTime.value = withTiming(durationMillis, {
        duration: durationMillis,
        easing: Easing.linear,
      });
    }
  };
  const playAudio = async () => {
    if (sound) {
      try {
          
        setPlayLight(true);
        isPlaying.value = true;
        await sound.setIsMutedAsync(false);
        await sound.playAsync();
        seekTime.value = withTiming(durationMillis, {
          duration: durationMillis,
          easing: Easing.linear,
        });
      } catch (e) {
          
      }
    } else {
        
    }
  };

  const handleReconnect = () => {
    let timeout = null;
  };
  // useEffect(() => {
  //   if(rnPlay){
  //    setTime(false)
  //   }

  // }, [rnPlay])
  const setTimerFinish = () => {
    setTimeToPlayMusic(true);
  };
  const CheckTime = ({ data }) => {
    return <></>;
  };
  const StopAudio = async () => {
    try {
      // Load the audio file (provide the correct URL or local file path)

      // Play the audio
      await sound.pauseAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  const stopPlaying = () => {
    "worklet";
    // TODO add logic for pausing the animation
    isPlaying.value = false;
    setPlayLight(false);
    cancelAnimation(seekTime);
  };
  const clearPlaying = async () => {
    await sound.stopAsync();
    setPlayLight(false);
  };
  useEffect(() => {
    const backAction = () => {
      setPlayLight(false);
      if (Platform.OS!= "ios") {
        Torch.switchState(false);
      }
      setPositionVibrate(false);
      setPosition(false);
      clearPlaying();
      navigation.goBack();
      

      // Your custom function or logic here
      // For example, you can navigate to another screen, show a confirmation dialog, etc.
      // Return true to prevent default behavior (exiting the app)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []); 
  
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/backchant.png")}
    >
      <StatusBar style="auto" />
      <View style={styles.songDetailsContainer}>
        <View style={styles.songNameContainer}>
          <Text style={styles.songName}>Club Football</Text>
          <Text style={styles.songAuthor}>{chantContentOffline?.title}</Text>
        </View>
      </View>
      {/* <AnimatedLinearGradient
        colors={[SONG_BG_COLOR, "transparent"]}
        style={[styles.topGradientStyle, topGradientStyle]}
      /> */}
      <Animated.ScrollView
        style={styles.scrollvView}
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Animated.View style={scrollViewStyle}>
          {chantContentOffline?.chant_Lyric_List.map((line, index) => {
            return (
              <View
                key={`${line.startTime_ms}`}
                onLayout={(event) => {
                  const { height: layoutHeight } = event.nativeEvent.layout;
                  setHeights((prevHeights) => {
                    if (
                      !prevHeights[index] ||
                      prevHeights[index] !== layoutHeight
                    ) {
                      prevHeights[index] = layoutHeight;
                      return [...prevHeights];
                    } else {
                      return prevHeights;
                    }
                  });
                }}
              >
                <Lyrics data={line} seekTime={seekTime} />
              </View>
            );
          })}
          <View style={{ height: 0.3 * height }} />
        </Animated.View>
      </Animated.ScrollView>

      <View style={styles.bottomContainer}>
        <ProgressBarOffline
          seekTime={positionVibrate}
          isPlaying={playLight}
          songLength={position}
          data={chantContentOffline}
          finish={finish}
        />
        {/* 
        <ProgressBarTwo
          seekTime={seekTime}
          isPlaying={playLight}
          songLength={position}
          data={chantContentOffline}
        /> */}

        <TimeStamps seekTime={seekTime} dir={durationMillis} />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <PlayButton
              isPlaying={isPlaying}
              onPress={() => {
                if (isPlaying.value) {
                  stopPlaying();
                  StopAudio();
                  setPlayLight(false);
                } else {
                  playAudio();
                }
              }}
            />
          )}
        </View>
      </View>
      <View style={{ width: `100%`, position: "absolute", top: 8 }}>
        <View style={{ top: 20 }}>
          <BackButton
            goBack={() => {
              setPlayLight(false);
              navigation.goBack();
              clearPlaying();
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  scrollvView: {
    width: "100%",
    paddingHorizontal: "5%",
  },
  songDetailsContainer: {
    height: "20%",
    padding: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  bottomContainer: {
    height: "20%",
    padding: "5%",
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: 1,
  },
  songNameContainer: {
    marginLeft: "5%",
    display: "flex",
  },
  songAuthor: {
    color: "white",
    paddingTop: 10,
    fontFamily: "Poppins-Black",
  },
  songName: {
    color: "white",
    fontFamily: "Poppins-Black",
    fontSize: 18,
  },
  bottomGradientStyle: {
    height: "7%",
    position: "absolute",
    left: "5%",
    right: "5%",
    top: "76%",
  },
  topGradientStyle: {
    height: "7%",
    position: "absolute",
    left: "5%",
    right: "5%",
    top: "22%",
    zIndex: 2,
  },
});
