import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  goToCallScreen: () => void;
};

export const HomeScreen = ({ goToCallScreen }: Props) => {
  return (
    <View>
      <Text style={styles.text}>Welcome to Audio Room Tutorial</Text>
      <Button title='Join Audio Room 🎧' onPress={goToCallScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});