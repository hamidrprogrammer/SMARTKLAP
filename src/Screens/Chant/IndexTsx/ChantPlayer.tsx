import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator, 
  BackHandler
} from "react-native";
import Lyrics from "../../../Components/chantc/Lyrics";
import PlayButton from "../../../Components/chantc/PlayButton";
import ProgressBar from "../../../Components/chantc/ProgressBar";
import TimeStamps from "../../../Components/chantc/TimeStamps";
import LyricsData from "../../../Components/chantc/lyricsData.json";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Audio, InterruptionModeIOS } from 'expo-av';
import Torch from "react-native-torch";


import { ALBUM_ART, SONG_BG_COLOR, SONG_LENGTH, THRESHOLD } from "../../../Components/chantc/constants";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import BackButton from "../../../Components/BackButton";
import { Colors } from "../../../Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashBar from "../../../Components/chantc/FlashBar";
import ProgressBarTwo from "../../../Components/chantc/ProgressBarTwo";
import ProgressBarTree from "../../../Components/chantc/ProgressBarTree";
import { Platform } from "react-native";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
import ProgressBarOffline from "../../../Components/chantc/ProgressChantOffline";
import { ImageBackground } from "react-native";

export default function LyricsPage({navigation}) {

  const { height } = useWindowDimensions();
  const seekTime = useSharedValue(0);
  
  const isPlaying = useSharedValue(false);
  const halfScrollComponentHeight = 0.3 * height;
  const [durationMillis, setDurationMillis] = useState(0)
  const [heights, setHeights] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(true);
  const [playLight, setPlayLight] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const {fetchgetChantContent,chantContent} = useContext(EventContext)
  const updateProgress = async (status) => {
    setIsLoading(true)

    // Calculate the progress as a percentage (0 to 1)
    if (status.didJustFinish) {
      isPlaying.value =false ;
      await sound.stopAsync();
    }
    if(status.durationMillis>1){
      setIsLoading(false)
    }else{
      
    }
    const progress = status.positionMillis / status.durationMillis;
    setDurationMillis(status.durationMillis);
  };
  const playAudio = async () => {
    try {
      
      // Load the audio file (provide the correct URL or local file path)
      
      // Play the audio
      await sound.setIsMutedAsync(false);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  const StopAudio = async () => {
    try {
      
      // Load the audio file (provide the correct URL or local file path)
      
      // Play the audio
       await sound.pauseAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  useEffect(() => {
    const backAction = () => {
      setPlayLight(false);
      if (Platform.OS!= "ios") {
        Torch.switchState(false);
      }
      clearPlaying()
      navigation.goBack()
      

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
  const loadAudio = async () => {
      
    
    setIsLoading(true)

    try {
      // Load the audio file (provide the correct URL or local file path)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });
      const audioUrl = chantContent?.chant_Audio_List[0]?.fileUrl;
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        updateProgress
      );
      setSound(sound)
    } catch (error) {
      console.error('Error playing audio:', error);
     
  
      setIsLoading(true)

    }
  };
  useEffect( () => {

    const fetchData = async () => {

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        interruptionModeIOS:1,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: true
      })
    }
    fetchData();
    if(chantContent?.chant_Audio_List){
      setHeights(  new Array(chantContent?.chant_Lyric_List.length).fill(65))
      loadAudio();

    }

  
 
  }, [])
  
  
  

  const lyricsScrollValue = useDerivedValue(() => {
    const sumOfHeights = (index: number) => {
      let sum = 0;
      for (let i = 0; i < index; ++i) {
        sum += heights[i];
      }
      return sum;
    };
  
    if (!chantContent?.chant_Lyric_List || chantContent.chant_Lyric_List.length === 0) {
      return 0;
    }
  
    const firstLyricStartTime = chantContent.chant_Lyric_List[0].startTime_ms;
    if (seekTime.value < firstLyricStartTime - THRESHOLD) {
      return 0;
    }
  
    // Don't go till last or the screen would be left empty
    for (let index = 1; index < chantContent.chant_Lyric_List.length - 1; index++) {
      const currTime = chantContent.chant_Lyric_List[index].startTime_ms;
      const lastTime = chantContent.chant_Lyric_List[index - 1].startTime_ms;
  
      if (seekTime.value > lastTime && seekTime.value < currTime - THRESHOLD) {
        return sumOfHeights(index - 1);
      } else if (seekTime.value < currTime) {
        return withTiming(sumOfHeights(index), {
          duration: THRESHOLD,
          easing: Easing.quad,
        });
      }
    }
  
    return sumOfHeights(chantContent.chant_Lyric_List.length - 1);
  }, [heights, chantContent]);

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

  const startPlaying = () => {
    "worklet";
    isPlaying.value = true;
    setPlayLight(true);
    seekTime.value = withTiming(durationMillis, {
      duration: durationMillis,
      easing: Easing.linear,
    });
  };
  // Function to stop song from playing
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
    // Check if all the heights are greater than zero or else quit early;
    for (let i = 0; i < heights.length; ++i) {
      if (heights[i] === 0) {
        return;
      }
    }
      
  }, [heights]);

  return (
    
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/backchant.png")}
    >
      <StatusBar style="auto" />
     

      <View style={styles.songDetailsContainer}>
        {/* <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Image
            source={{ uri: chantContent?.file }}
            style={{
              height: 0.12 * height,
              width: 0.12 * height
            }}
          />
        </View> */}
        <View style={styles.songNameContainer}>
          
          <Text style={styles.songAuthor}>{chantContent?.title}</Text>
          <Image style={{width:60,height:60,borderRadius:15}} source={{uri:chantContent?.file}}/>
        </View>
      </View>
      
      <Animated.ScrollView
        style={styles.scrollvView}
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Animated.View style={scrollViewStyle}>
          {chantContent?.chant_Lyric_List?.map((line, index) => {
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
      {/* <FlashBar seekTime={seekTime} songLength={durationMillis} data={chantContent}/> */}

        <ProgressBarOffline  seekTime={seekTime} isPlaying={playLight} songLength={durationMillis} data={chantContent}/>
        <ProgressBarTree seekTime={seekTime} isPlaying={playLight} songLength={durationMillis} data={chantContent}/>

        <TimeStamps seekTime={seekTime} dir={durationMillis}/>
        <View style={styles.buttonContainer}>
          {isLoading?        <ActivityIndicator size="large" color="white" />
:
          <PlayButton
            isPlaying={isPlaying}
            
            onPress={() => {
              if (isPlaying.value) {
                stopPlaying();
                StopAudio();
                setPlayLight(false);
              } else {
                playAudio();
                startPlaying();
               
              }
            }}
          />
        }
        </View>
      </View>
      <View style={{width:`100%`,position:'absolute',top:8}}>
        <View style={{top:20}}>
      <BackButton goBack={()=>{
        setPlayLight(false);
        navigation.goBack()
        clearPlaying()
      }} />
</View>
      </View>
    </ImageBackground>
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SONG_BG_COLOR,
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
    flexDirection:'row',
    width:`100%`,
    justifyContent:'space-between',
    alignItems:'center'
  },
  songAuthor: {
    color: "white",
    paddingTop: 10,
    fontSize:22

  },
  songName: {
    color: "white",
    fontSize: 22,
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