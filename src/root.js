import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

import {AppNavigator} from './Navigation'; 
import ThemeManager from './Themes';
import { Fonts } from './Constants';

const App = () => {


    /* Loading custom fonts in async */
    // const _loadAssetsAsync = async () => {
    //   await Font.loadAsync(Fonts.customFonts);
    //   setAssetsLoaded(true);
    // };
  
   

  return (
    <ThemeManager>
      <AppNavigator />
    </ThemeManager>
  ) 
};

export default App;
