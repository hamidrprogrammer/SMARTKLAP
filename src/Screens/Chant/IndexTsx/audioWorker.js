
import { self } from 'react-native-threads';
import { Audio, InterruptionModeIOS } from 'expo-av';

self.onmessage = async (message) => {
  const { audioUrl, retryAttempts } = message;

  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      shouldDuckAndroid: false,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });

    const { sound, status } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: false }
    );

    // Post the sound and status back to the main thread
    self.postMessage({
      success: true,
      sound,
      durationMillis: status.durationMillis || 0,
    });

    // Handle mute toggle after 5 seconds
    setTimeout(() => {
      self.postMessage({ toggleMute: true });
    }, 5000);
  } catch (error) {
    console.error("Error loading audio:", error);
    if (retryAttempts < 50) {
      setTimeout(() => {
        self.postMessage({
          success: false,
          retry: true,
          retryAttempts: retryAttempts + 1,
        });
      }, 3000);
    } else {
      self.postMessage({ success: false, retry: false });
    }
  }
};
