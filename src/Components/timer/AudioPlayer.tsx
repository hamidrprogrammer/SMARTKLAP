import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

const AudioPlayer = () => {
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const downloadAndPlayAudio = async () => {
    const fileUri = `${FileSystem.cacheDirectory}example.mp3`;
  
    // Download the MP3 file
    const downloadObject = FileSystem.createDownloadResumable(
      'https://download.samplelib.com/mp3/sample-3s.mp3',
      fileUri
    );
  
    try {
      const { uri } = await downloadObject.downloadAsync();
  
      // Play the downloaded audio file
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.error('Error downloading or playing audio:', error);
      if (error.code === 'ABORT_ERR') {
        // Handle abort error
      } else if (error.message.includes('AVPlayerItem')) {
        console.error('AVPlayerItem error:', error.message);
      }
    }
  };

  return (
    <View>
      <Button title="Download and Play Audio" onPress={downloadAndPlayAudio} />
    </View>
  );
};

export default AudioPlayer;
