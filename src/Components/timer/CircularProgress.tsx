import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ size, strokeWidth, progress }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />
        <AnimatedCircle
          stroke="#3b5998"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          {...{ strokeWidth }}
        />
      </Svg>
      <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
  },
});

export default CircularProgress;
