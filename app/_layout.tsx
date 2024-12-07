import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useColorScheme } from '@/hooks/useColorScheme';
import {AppNavigator} from '../src/Navigation/index'; 

import ThemeManager from './src/Themes';
import { AthContextProvider } from './src/Servise/Ath/athContaxt';
import { EventContextProvider } from './src/Servise/Events/eventContaxt';
import { SignalRProvider } from './src/Servise/Sinal/SignalRContext';
import Stacks from './src/Navigation/navigators/Stacks';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
 

  return (
    <RootSiblingParent> 
     <ThemeManager>
      <AthContextProvider>
    <EventContextProvider>
       <SignalRProvider>
       <Stacks>
       
      </Stacks>
     </SignalRProvider>
      </EventContextProvider>
      </AthContextProvider>
    </ThemeManager>
    </RootSiblingParent>
  );
}
