import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { Discover, Explore, Standings, More } from "@/Screens";
import VideoListComponent from "../../Screens/Video/VideoList";
import OrderScreen from "../../Screens/shop/FoodList";
import { Profile } from "../../Screens";
import { ChantScreen } from "../../Screens/Chant/IndexTsx";
import CategoryScreen from "../../Screens/shop/Category";
import TabIcon from "../../Components/McTabIcon/IconTab";
import { useNavigation } from "@react-navigation/native";
import { EventContext } from "../../Servise/Events/eventContaxt";
import SignalRContext from "../../Servise/Sinal/SignalRContext";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../Constants";
import { Image } from "react-native";
import { Card } from "react-native-paper";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { NullScreen } from "@/Screens/Home/NULL";

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "#fff",
   
  },
  tabBarContainerTwo: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    
  },
  tabBarItem: {
    flex: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const onPressHome = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[2].key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(state.routes[2].name);
    }
  };
  return (
    <View style={styles.tabBarContainer}>
   
      <LinearGradient
        colors={[
          Colors.white,
          Colors.white,
          Colors.white,
        ]}
        style={styles.tabBarContainerTwo}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const icon = options.tabBarIcon;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
         
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabBarItem,
                {
                  borderBottomWidth: isFocused ? 0 : 0,
                 
                  backgroundColor: route.name == "Discover" ? "#fff" : "",
                  borderEndEndRadius:20,
                  borderEndStartRadius:20
                },
              ]}
            >
              {route.name == "Discover" ? (
              
                null
            
              ) : (
                icon &&
                icon({ color: isFocused ? Colors.platform.android.primary : "#707070", size: 15 })
              )}

              {/* <Text style={{ color: isFocused ? "#3a5ffe" : "gray" }}>{label}</Text> */}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
      <TouchableOpacity
       onPress={onPressHome}
    style={{position:"absolute",alignSelf:"center"
    ,bottom:20}}>
      <View style={{borderRadius:25,backgroundColor:Colors.platform.android.primary,
        width:55,height:55,
        alignItems:"center",
        justifyContent:"center"
      }}>
    <Image source={require("../../../assets/iconMenu.png")}
                style={{width:30,height:30,top:0}} />
                </View>
    </TouchableOpacity>
    </View>
  );
};
const Tabs = ({ params }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { fetchTime, liveEventId } = useContext(EventContext);
  return (
    <Tab.Navigator
      initialRouteName={"Discover"}
      tabBar={(props) => <CustomTabBar {...props} />}
      tabBarOptions={{
        style: {
          backgroundColor: "#fff",
        },
      }}
     
    >
      <Tab.Screen
        name="Chant"
        component={Discover}
        options={{cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
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
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../../assets/Group 768.png')}
            style={{width:18,height:18,tintColor:color}} />
          ),
          headerShown: false,
        }}
      />
       <Tab.Screen
        name="Explore"
        component={Discover}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../../assets/Group 778.png')}
            style={{width:18,height:18,tintColor:color}} 
            resizeMode="contain"/>
          ),
          headerShown: false,
        }}
      />
     
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../../assets/Group 768.png')}
            style={{width:18,height:18,tintColor:color}} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Standings"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../../assets/sandwich.png')}
           
            style={{width:18,height:18,tintColor:color}} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="More"
        component={NullScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require('../../../assets/Path 1463.png')}
            style={{width:18,height:18,tintColor:color}} 
            resizeMode="contain"/>
          ),
          headerShown: false,
        }}
      />
      
    </Tab.Navigator>
  );
};
export default Tabs;
