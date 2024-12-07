import { McText } from "@/Components";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  View,
  Switch,
  Button,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
const widthFull = Dimensions.get("window").width;

export const Gamedetail = ({ navigation, route }) => {
  const [selectedButton, setSelectedButton] = useState(0);
  const receivedData = route.params?.data || null;
  const handlePress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };
  const PendinghUi = ({ data }) => {

    return (
      <View style={styles.full}>
        <View style={{width:340,height:150,paddingTop:15,paddingLeft:8,paddingRight:8}}
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
      <SafeAreaView style={{ height: `100%`, width: `100%` ,paddingTop:8}}>
        <ScrollView>
          <View style={{ height: `100%`, width: `100%` }}>
            <ImageBackground
              resizeMode="contain"
              style={{ height: 380, width: `100%` ,paddingTop:80}}
              source={require("../../../assets/gamedetail.png")}
            >
                 <PendinghUi data={receivedData}/>
            </ImageBackground>
              
            <View
              style={{
                flexDirection: "row",
                height: 100,
                width: `100%`,
                paddingLeft:18,
                paddingRight:18,
                justifyContent: "space-around",
                zIndex: 1,
                bottom: 80,
              }}
            >
              {["Statistics", "Timeline", "Players"].map(
                (buttonTitle, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderRadius: 20,
                      width: 90,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        selectedButton === index ? "#0AD19D" : "#F5F5F5",
                    }}
                    onPress={() => handlePress(index)}
                  >
                    <Text style={{ color:  selectedButton === index ? "#fff" : "#000",
                        fontWeight:'bold',
                        fontSize:12,
                     }}>{buttonTitle}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
           
            {selectedButton == 2 ? (
              <Image
                resizeMode="contain"
                style={{ height: 1300, width: `100%`, bottom: 165 }}
                source={require("../../../assets/gamedetail3.png")}
              />
            ) : null}
            {selectedButton == 0 ? (
              <Image
                resizeMode="contain"
                style={{ height: 500, width: `100%`, bottom: 110 }}
                source={require("../../../assets/v2-gamedetail.png")}
              />
            ) : null}
            {selectedButton == 1 ? (
              <Image
                resizeMode="contain"
                style={{ height: 900, width: `100%`, bottom: 180 }}
                source={require("../../../assets/v1-gamedetail.png")}
              />
            ) : null}
          </View>
        </ScrollView>
        <TouchableOpacity 
        style={{position:"absolute",top:0,left:0,width:130,height:90}}
        onPress={()=>{navigation.goBack()}}>

        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
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
  