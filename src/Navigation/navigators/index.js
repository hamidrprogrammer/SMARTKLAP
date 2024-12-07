import React, { useEffect, useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';


import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import Stacks from './Stacks';
import TabStacks from './TabStacks';
import { useTheme } from '../../Themes';
import { LoginScreen } from '../../Screens/Enter';
import { SignalRProvider } from '../../Servise/Sinal/SignalRContext';
import { AthContextProvider } from '../../Servise/Ath/athContaxt';
import { EventContextProvider } from '../../Servise/Events/eventContaxt';
import NetInfo from '@react-native-community/netinfo';
import { Provider, Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const navigationRef = createNavigationContainerRef();

export function navigateMain(name, params) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export default function AppNavigator() {
  const theme = useTheme();
  const [isConnected, setIsConnected] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reStart, setReStart] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setVisible(true);
        setReStart(true)
      } else {
        setVisible(false);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
   if(reStart&& visible == false ){
    handleRestart();
    setReStart(false)
   }

    
  }, [reStart,visible]);
  const handleRestart = async () => {
    try {
      // await Updates.reloadAsync();
    } catch (e) {
      console.error('Failed to reload the app:', e);
    }
  };
  return (
      <SafeAreaProvider
      style={{paddingTop:15}}>
    <Provider>
    <NavigationContainer ref={navigationRef}>
      <AthContextProvider>
    <EventContextProvider>
       <SignalRProvider>
      <Stacks/>
      {/* Use TabStacks or Stacks below to display the bottom tabs or not */}
      {/* <Stacks /> */}
      {/* <TabStacks /> */}
      </SignalRProvider>
      </EventContextProvider>
      </AthContextProvider>
    </NavigationContainer>
     <Portal>
     <Dialog visible={visible}>
       <Dialog.Title>No Internet Connection</Dialog.Title>
       <Dialog.Content>
         <Paragraph>Please check your internet settings.</Paragraph>
       </Dialog.Content>
       <Dialog.Actions>
         <Button onPress={() => setVisible(false)}>OK</Button>
       </Dialog.Actions>
     </Dialog>
   </Portal>
 </Provider>
 </SafeAreaProvider>
  );
}

