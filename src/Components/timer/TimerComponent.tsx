import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Image } from "react-native";
import { View, Text } from "react-native";

const TimerComponent = ({ duration, onComplete }) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  const startTimer = () => {
    const startTime = performance.now();

    const updateTimer = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const newRemainingTime = Math.max(0, duration - elapsed);

      setRemainingTime(newRemainingTime);

      if (newRemainingTime > 0) {
        requestAnimationFrame(updateTimer);
      } else {
        // Timer ended, execute the onComplete callback
        onComplete();
      }
    };

    requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    // Cleanup function to reset the timer when the component unmounts
    return () => {
      setRemainingTime(0);
    };
  }, [duration, onComplete]);

  const formattedTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View>
     
        <Text style={{ fontSize: 50 ,color:"white"}}>{formattedTime(remainingTime)}</Text>
      
    </View>
  );
};

export default TimerComponent;
