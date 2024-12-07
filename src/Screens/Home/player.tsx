import React from 'react';
import { View, Switch, Button, ImageBackground, ScrollView } from 'react-native';
export const Plyaer = ({ navigation }) => {


return (
    <>
        <View
         style={{height:`100%`,width:`100%`}}>
    <ScrollView>
        <View
         style={{height:`100%`,width:`100%`}}>
        <ImageBackground
        resizeMode='contain'
        style={{height:1100,width:`100%`}}
        source={require('../../../assets/screenplayer.png')}>

        </ImageBackground>
        </View>

    </ScrollView>
    </View>
    </>
)
}