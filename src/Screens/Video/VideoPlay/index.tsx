import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
interface VideoPlayProps {
  uri: string;
}
import { Ionicons } from '@expo/vector-icons';

export function VideoPlay({ uri ,navigation}) {
  const [status, setStatus] = useState({});
  const video = React.useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = React.useRef(null);
  
  const togglePlayPause = async () => {
    const playbackStatus = await videoRef.current.getStatusAsync();
  if (playbackStatus.isPlaying) {
    await videoRef.current.pauseAsync();
  } else {
    await videoRef.current.playAsync();
  }
  setIsPlaying(!playbackStatus.isPlaying);
  };

  const toggleFullScreen = async () => {
    await videoRef.current.presentFullscreenPlayer();


   
  };

  const exitFullScreen = async () => {

  };
  const onPlaybackStatusUpdate = (status) => {
    setCurrentTime(status.positionMillis / 1000); // Convert milliseconds to seconds

    if(status.didJustFinish){
      setIsPlaying(false);
      videoRef.current.stopAsync();
    }

  };

  return (
    <View style={styles.container}>
    
       <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri,
        }}
        isLooping={false} // Add this line to prevent looping

        ref={videoRef}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}

      />
      <View style={{backgroundColor:"rgba(0,0,0,0.5)",position:"absolute",bottom:0,height:30,width:`100%`}}>
        <TouchableOpacity onPress={()=>{togglePlayPause()}} style={styles.iconContainer}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={isFullScreen ? exitFullScreen : toggleFullScreen} style={styles.iconContainerT}>
        <Ionicons name={isFullScreen ? 'contract' : 'expand'} size={18} color="white" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

export function VideoPlayFile({ uri }: VideoPlayProps) {
  const [status, setStatus] = useState({});
  const video = React.useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = React.useRef(null);
  
  const togglePlayPause = async () => {
    const playbackStatus = await videoRef.current.getStatusAsync();
  if (playbackStatus.isPlaying) {
    await videoRef.current.pauseAsync();
  } else {
    await videoRef.current.playAsync();
  }
  setIsPlaying(!playbackStatus.isPlaying);
  };

  const toggleFullScreen = async () => {
    await videoRef.current.presentFullscreenPlayer();


   
  };

  const exitFullScreen = async () => {

  };
  const onPlaybackStatusUpdate = (status) => {
    setCurrentTime(status.positionMillis / 1000); // Convert milliseconds to seconds

    if(status.didJustFinish){
      setIsPlaying(false);
      videoRef.current.stopAsync();
    }

  };
  return (
    <View style={[styles.container, { height: 250, width: '100%' }]}>
   <Video
        ref={video}
        style={{borderRadius:30,width:`98%`,height:`100%`}}
        source={{
          uri: uri,
        }}
        isLooping={false} // Add this line to prevent looping

        ref={videoRef}
        resizeMode={ResizeMode.STRETCH}
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
    height: 270,
    borderRadius: 15,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 5,
    width:50,
    height:50,
    justifyContent:"flex-end",
    right: 20,
    alignItems:"flex-end"
  },
    iconContainerT: {
      position: 'absolute',
      bottom: 5,
      width:50,
      height:50,
      left: 20,
      justifyContent:"flex-end"
   },
  video: {
    width: '100%',
    height: '100%',
  },
});
