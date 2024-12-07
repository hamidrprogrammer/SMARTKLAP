import React, { useCallback, useEffect, useState } from "react";
import Root from "./src/root";
import { AthContextProvider } from "./src/Servise/Ath/athContaxt";
import { EventContextProvider } from "./src/Servise/Events/eventContaxt";
import { SignalRProvider } from "./src/Servise/Sinal/SignalRContext";
import { RootSiblingParent } from 'react-native-root-siblings';
import { useKeepAwake } from "expo-keep-awake";

import { Vibration } from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";

export default function App() {
  const [loaded, error] = useFonts({
    'Poppins-Black': require('./assets/fonts/ExpletusSans-VariableFont_wght.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
   
  
    <RootSiblingParent>  
    <Root />

    </RootSiblingParent>


 
  
  );
}
