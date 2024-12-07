import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import axios from "axios";
import dayjs from "dayjs";
import BackgroundTimer from "react-native-background-timer";

const TimeDisplayIntsall = ({ totalSeconds, onFinish, data }) => {
 
  useEffect(() => {
    finish()
  }, []);
  const finish= async ()=>{
  
    
  
     
    

      setTimeout(() => {
        onFinish()
      }, (5000));
    

 
}
 

  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 40,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textDecorationStyle: "solid",
    textShadowRadius: 3,
  },
});

export default TimeDisplayIntsall;
