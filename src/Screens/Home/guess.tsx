import { McText } from '@/Components';
import { EventContext } from '@/Servise/Events/eventContaxt';
import React, { useContext, useState } from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Switch, Button, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
const widthFull = Dimensions.get("window").width;

export const Guess = ({ navigation }) => {
    const {
        
        events,
        
      } = useContext(EventContext);

      const PendinghUi = ({ data }) => {

        return (
          <View style={styles.full}>
            <View style={{width:340,height:210,paddingTop:15,paddingLeft:8,paddingRight:8}}
        >
              <View style={styles.row}>
              <View style={[styles.center,{ backgroundColor:"#fff"}]}>
                  <Image
                    source={{ uri: data?.hostTeam?.logoUrl }}
                    resizeMethod="resize"
                    
                    style={{ width: 50, height: 50 }}
                  />
                  <McText
                    align={"center"}
                    bold
                    size={13}
                    color={"#000"}
                    style={{ marginTop: 9 }}
                  >
                    {data?.hostTeam?.name}
                  </McText>
                </View>
                <View style={[styles.center,{ backgroundColor:"#fff"}]}>
                  <Image
                    source={{ uri: data?.logoUrl }}
                    style={{ width: 50, height: 50, marginBottom: 15 }}
                  />
      
                  <View style={{ marginBottom: 15 }} />
                  <McText black color={"#000"} align="center" size={13} style={{width:500}}>
                    {new Date(data?.startTime).toDateString()}
                  </McText>
                </View>
                <View style={[styles.center,{ backgroundColor:"#fff"}]}>
                  <Image
                    source={{ uri: data?.guestTeam?.logoUrl }}
                    style={{ width: 50, height: 50 }}
                  />
                  <McText
                    align={"center"}
                    bold
                    size={13}
                    color={"#000"}
                    style={{ marginTop: 9 }}
                  >
                    {data?.guestTeam?.name}
                  </McText>
                </View>
              </View>
            </View>
          </View>
        );
      };
return (
    <>
        <SafeAreaView
         style={{height:`100%`,width:`100%`,paddingTop:8}}>
    <ScrollView>
        <View
         style={{height:`100%`,width:`100%`}}>
        <ImageBackground
        resizeMode='contain'
        style={{height:70,width:`100%`}}
        source={require('../../../assets/gusshaser.png')}>
<TouchableOpacity 
        style={{position:"absolute",top:0,left:0,width:130,height:90}}
        onPress={()=>{navigation.goBack()}}>

        </TouchableOpacity>
        </ImageBackground>
        <PendinghUi data={events[0]}/>
      
        <ImageBackground
        resizeMode='contain'
        style={{height:610,width:`100%`,top:20}}
        source={require('../../../assets/guss.png')}>
         
        </ImageBackground>
        </View>

    </ScrollView>
    </SafeAreaView>
    </>
)
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
  