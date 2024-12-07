import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { DARK_LYRICS_COLOR, SONG_BG_COLOR } from "./constants";

export interface LyricsProps {
  data: {
    time: number;
    words: {
      string: string;
    }[];
  };
  seekTime: Animated.SharedValue<number>;
}

export default function Lyrics({ data, seekTime }: LyricsProps) {
  const lyricsColor = useDerivedValue(() => {
    if (seekTime.value < data?.startTime_ms - 100 || seekTime.value === 0) {
      return DARK_LYRICS_COLOR;
    } else if (seekTime.value < data?.startTime_ms) {
      return withTiming("white", {
        duration: 100,
      });
    } else {
      return "white";
    }
  });
  const lyricsStyle = useAnimatedStyle(() => {
    return {
      color: lyricsColor.value,
    };
  }, []);

  return (
    <>
     
          <Animated.Text
            style={[styles.text, lyricsStyle]}
            
          >
            {data?.lyric_Sentence}
          </Animated.Text>
      
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    paddingBottom: 5,
  },
});
