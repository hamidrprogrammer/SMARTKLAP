import { McText } from '@/Components';
import { EventContext } from '@/Servise/Events/eventContaxt';
import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Switch, Button, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
const widthFull = Dimensions.get("window").width;
import Lottie from "lottie-react-native";


import aiProgress from "./1prpvqeFx1.json";
import { Text } from 'react-native';
export const NullScreen = ({ navigation }) => {
    const {
        
        events,
        
      } = useContext(EventContext);

      return (
        <View style={{width:`100%`,height:`100%`,
          alignSelf:"center",alignItems:'center',justifyContent:'center'
        }}>
           <Text style={{fontSize:40,color:"#000"}}>{"AR"}</Text>
            <Lottie
                            source={aiProgress}
                            autoPlay
                            loop
                            style={{
                              height: 400,
                              width: 400,
                            
                            }}
                          />
                          <Text>{"Developing this part of the app"}</Text>
    
         
        </View>
      );
}
const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      width: `100%`,
      justifyContent: "space-between",
    },
    center: {
      width: 100,
      alignItems: "center",
     
    },
    card: {
      padding: 16,
      borderRadius: 15,
      backgroundColor: "#fff",
  
      width: widthFull - 30,
      height: 200,
  
      // Add gradient background here using LinearGradient (optional)
    },
    full: {
      padding: 16,
      borderRadius: 15,
     alignSelf:"center",
      backgroundColor: "#fff",
    
  
      width: widthFull-30,
      alignItems: "center",
      justifyContent: "center",
      // Add gradient background here using LinearGradient (optional)
    },
    teamContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      alignItems: "center",
    },
    logoImage: {
      width: 70,
      height: 70,
    },
    caption: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#000",
    },
    timeContainer: {
      width: "100%",
      alignItems: "center",
      marginTop: 16,
    },
    h5: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
    },
    h4: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#000",
    },
    timeUnitContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 8,
    },
  });
  