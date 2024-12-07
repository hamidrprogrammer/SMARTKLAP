import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save the token globally
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
      
  } catch (error) {
      
  }
};
export const getAlldely = async () => {
  try {
    const dely1 = await AsyncStorage.getItem('DelyFirst');
    const dely2 = await AsyncStorage.getItem('DelyTwo');
    const deley3 = await AsyncStorage.getItem('DelyThree');
    const dely4 = await AsyncStorage.getItem('DelyFure');
    const num1 = dely1 !== null ? parseFloat(dely1) : 0;
    const num2 = dely2 !== null ? parseFloat(dely2) : 0;
    const num3 = deley3 !== null ? parseFloat(deley3) : 0;
    const num4 = dely4 !== null ? parseFloat(dely4) : 0;
    


    // Sum the numbers
    const totalSum = num1 + num2 + num3 + num4;
    return totalSum;
  } catch (error) {
      
  }
};
export const saveUser = async (token) => {
  try {
    await AsyncStorage.setItem('user', token + "");
      
  } catch (error) {
      
  }
};
export const saveUserApple = async (token) => {
  try {
    await AsyncStorage.setItem('userApple', token + "");
      
  } catch (error) {
      
  }
};
export const getUserApple = async (token) => {
  try {
    const token = await AsyncStorage.getItem('userApple');
    if (token !== null) {
      const parsedData = JSON.parse(token);

        
      return parsedData;
    }
  } catch (error) {
      
    return null
  }
};
export async function removeAllDataFromAsyncStorage() {
  try {
    const keyToKeep = 'userApple';

    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Filter the keys array to remove the key you want to keep
    const keysToRemove = keys.filter(key => key !== keyToKeep);

    // Use AsyncStorage.multiRemove to remove the filtered keys
    await AsyncStorage.multiRemove(keysToRemove);
      
  } catch (error) {
    console.error('Error removing data from AsyncStorage:', error);
  }
}
// Function to retrieve the token from storage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
        
      return token;
    }
  } catch (error) {
      
    return null
  }
};
export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem('user');

    if (token !== null) {
        
      return token;
    }
  } catch (error) {
      
    return null
  }
};


export function millisecondsToTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}