import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function VideoPlayFull({ uri }) {
  const [status, setStatus] = useState({});
  const video = React.useRef(null);
  const route = useRoute();
  const { data } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = React.useRef(null);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seekToTime = async (time) => {
    await videoRef.current.setPositionAsync(data.time * 1000); // Convert seconds to milliseconds
    setCurrentTime(data.time);
  };

  const onPlaybackStatusUpdate = (status) => {
    setCurrentTime(status.positionMillis / 1000); // Convert milliseconds to seconds
  };

  const onLoad = () => {
    setIsLoaded(true);
  };

 
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={togglePlayPause} style={styles.iconContainer}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="white" />
      </TouchableOpacity>
      <Text style={styles.currentTimeText}>Current Time: {currentTime.toFixed(2)} seconds</Text>
      {isLoaded && (
        <TouchableOpacity onPress={() => seekToTime(30)} style={styles.setTimeButton}>
          <Text style={styles.buttonText}>Set Time to 30s</Text>
        </TouchableOpacity>
      )}
       <Video
       
        style={styles.video}
        source={{
          uri: data.uri,
        }}
        ref={videoRef}

        resizeMode={ResizeMode.CONTAIN}
        isLooping
        useNativeControls={true}

        onPlaybackStatusUpdate={onPlaybackStatusUpdate}

      />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    width: '100%',
    borderRadius: 15,
  }
  ,
  currentTimeText: {
    position: 'absolute',
    bottom: 80,
    zIndex: 1,
    color: 'white',
  },
  setTimeButton: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily:"Poppins-Black"
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,

    right: 20,
  },
    iconContainerT: {
      position: 'absolute',
      bottom: 20,
 
      left: 20,
   },
  video: {
    width: '100%',
    height: '100%',
  },
});
