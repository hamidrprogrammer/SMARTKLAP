import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { runOnJS, useDerivedValue } from "react-native-reanimated";
import { SONG_LENGTH } from "./constants";

interface TimeStampsProps {
  seekTime: Animated.SharedValue<number>;
  dir: number;
}

const secondToMinute = (seconds: number) => Math.floor(seconds / 60);

const formattedSeconds = (seconds: number) => {
  const onlySeconds = seconds % 60;
  return onlySeconds.toString().padStart(2, '0');
};

export default function TimeStamps({ seekTime, dir }: TimeStampsProps) {
  const currentTimeRef = useRef(0);
  const TotalTime = useMemo(() => Math.floor(dir / 1000), [dir]);

  const setCorrectTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds !== currentTimeRef.current) {
      currentTimeRef.current = seconds;
    }
  };

  useDerivedValue(() => {
    runOnJS(setCorrectTime)(seekTime.value);
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.text}>
        {`${secondToMinute(seekTime.value / 1000)}:${formattedSeconds(Math.floor(seekTime.value / 1000))}`}
      </Animated.Text>
      <Text style={styles.text}>
        {`${secondToMinute(TotalTime)}:${formattedSeconds(TotalTime)}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  text: {
    color: "white",
    fontSize: 13,
    opacity: 0.5,
  },
});
