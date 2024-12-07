import React from 'react';
import { Text, View } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen } from '../../Screens/Enter';
import OTPScreen from '../../Screens/Enter/CodeCheck';
import { getToken } from '../../core/save';
import Tabs from './Tabs';
import VideoUploader from '../../Screens/Video/Video';
import VideoListComponent from '../../Screens/Video/VideoList';
import FoodList from '../../Screens/shop/FoodList';
import CategoryScreen from '../../Screens/shop/Category';
import OrderScreen from '../../Screens/shop/FoodList';
import LyricsPage from '../../Screens/Chant/IndexTsx/ChantPlayer';
import { ChantScreen } from '../../Screens/Chant/IndexTsx';
import { StartChantTsx } from '../../Screens/Discover/StartChantTsx';
import { TimerTsx } from '../../Screens/Discover/StartChantTsx/TimerTsx';
import LyricsPageAuto from '../../Screens/Chant/IndexTsx/ChantPlayAuto';
import SplashScreen from '../../Screens/Enter/SplashScreen';
import DateTimeComponent from '../../Screens/Discover/StartChantTsx/TimerTsx/TimerSample';
import { Onbordeing } from '../../Screens/Enter/Onbordeing';
import { ArticleDetail, Home } from '../../Screens';
import { VideoPlay } from '../../Screens/Video/VideoPlay';
import ProductDetail from '../../Screens/shop/Product';
import { AllListEventTsx } from '../../Screens/Discover/AllListEventTsx';
import LyricsPageTest from '../../Screens/Chant/IndexTsx/ChantPlayMatic';
import ScreenEnter from '../../Screens/Enter/ScreenEnter';
import { VideoPlayFull } from '../../Screens/Video/fullScreen';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Provider, Dialog, Portal, Button, Paragraph } from 'react-native-paper';
import LyricsPageInstall from '@/Screens/Chant/IndexTsx/ChantInstall';
import { Gamedetail } from '@/Screens/Home/gamedetail';
import { Guess } from '@/Screens/Home/guess';
import { Profile } from "../../Screens";
import { AllNews } from '@/Screens/Discover/AllListEventTsx/AllNews';

const Stack = createStackNavigator();
const checkLogin= ()=>{
  getToken().then((res)=>{
      
      
      
   if(res.length>20){
    
    return true
    
   }else{
    return false
   }
  })
}

const Stacks = ({ params }) => (

  <Stack.Navigator initialRouteName={"SplashScreen"}
   screenOptions={{
    
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
        },
      }}
  >
  <Stack.Screen name="ScreenEnter" component={ScreenEnter}
    options={{
        headerShown: false,
      }}
     />
  <Stack.Screen name="AllListEventTsx" component={AllListEventTsx}
    options={{
        headerShown: false,
      }}
     />
      <Stack.Screen name="AllNews" component={AllNews}
    options={{
        headerShown: false,
      }}
     />


   <Stack.Screen name="Onbordeing" component={Onbordeing}
    options={{
        headerShown: false,
      }}
     />
  <Stack.Screen name="VideoPlayFull" component={VideoPlayFull}
    options={{
        headerShown: false,
      }}
     />

     <Stack.Screen name="ProductDetail" component={ProductDetail}
     options={{
        headerShown: false,
      }}
     />
     
      <Stack.Screen name="ArticleDetail" component={ArticleDetail}
    options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Profile" component={Profile}
    options={{
        headerShown: false,
      }} />
      
     <Stack.Screen name="Register" component={RegisterScreen}
    options={{
        headerShown: false,
      }} />
  <Stack.Screen name="DateTimeComponent" component={DateTimeComponent}
    options={{
        headerShown: false,
      }} />
   <Stack.Screen name="SplashScreen" component={SplashScreen}
    options={{ 
        headerShown: false,
      }} />
      <Stack.Screen name="Guess" component={Guess}
    options={{ 
        headerShown: false,
      }} />
      <Stack.Screen name="Information" component={Gamedetail}
    options={{ 
        headerShown: false,
      }} />
       <Stack.Screen name="VideosScreen" component={VideoListComponent}
    options={{
        headerShown: false,
      }} />
  <Stack.Screen name="TimerTsx" component={TimerTsx}
    options={{
        headerShown: false,
      }} />
      <Stack.Screen name="LyricsPageAuto" component={LyricsPageTest}
    options={{
        headerShown: false,
      }} />
  <Stack.Screen name="StartChantTsx" component={StartChantTsx}
    options={{
        headerShown: false,
      }} />
   <Stack.Screen name="ChantPlayer" component={LyricsPageAuto}
    options={{
        headerShown: false,
      }} />
      <Stack.Screen name="ChantScreen" component={ChantScreen}
    options={{
        headerShown: false,
      }} />
  <Stack.Screen name="Video" component={VideoUploader}
    options={{
        headerShown: false,
      }} />
  <Stack.Screen name="VideoList" component={VideoListComponent} options={{
        headerShown: false,
      }} />
  <Stack.Screen name="OrderScreen" component={OrderScreen} options={{
        headerShown: false,
      }} />

  <Stack.Screen name="FoodList" component={CategoryScreen}

   options={{
        headerShown: false,
      }} />
  <Stack.Screen name="Enter" component={LoginScreen}
   options={{
        headerShown: false,
      }} />
        <Stack.Screen name="CodeCheck" component={OTPScreen }
   options={{
        headerShown: false,
      }} />
   <Stack.Screen name="LyricsPageInstall" component={LyricsPageInstall }
   options={{
        headerShown: false,
      }} />

<Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
      }}
    /> */}
  </Stack.Navigator>
);

export default Stacks;
