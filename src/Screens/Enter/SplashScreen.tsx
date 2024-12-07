import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Colors } from "../../Constants";
import { getToken } from "../../core/save";
import Service from "../../Servise/api";
import { EventContext } from "../../Servise/Events/eventContaxt";
import { ActivityIndicator } from "react-native-paper";
import Lottie from "lottie-react-native";


import aiProgress from "./splashs.json";

const SplashScreen = ({ navigation }) => {
  const {
    fetchChantEventsData,
    fetchEventData,
    fetchDataShopCategories,
    fetchUserAllOrders,
    fetchDataShopProducts,
    fetchActiveVideo,
    fetchGetUserRank,
    fetchgetAllChants,
    fetchGetUserPoints,
    fetchNews,
    fnSetUserID,
    fetchClubInfo
  } = useContext(EventContext);
  let screenEnther =true;
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    fnSetUserID();
    getToken().then((res) => {
      if (res != null) {
        Service.api.defaults.headers.common.Authorization = `Bearer ${res}`;

        // Service.api.interceptors.request.use(
        //   (config) => {
        //     config.headers["Authorization"] = `Bearer ${res}`;

        //     return config;
        //   },
        //   (error) => {
        //     return Promise.reject(error);
        //   }
        // );

      
          fetchEventData();
          fetchChantEventsData();
          fetchgetAllChants();
          fetchClubInfo();
          fetchNews();
         
        setTimeout(() => {
          if(screenEnther){
            screenEnther= false;
            if (!hasNavigated) {
              setHasNavigated(true);
              navigation.replace("Tabs");
              setTimeout(() => {
                setHasNavigated(false);
              }, 5000);
            }
          

          }
        }, 3000); 
      } else {
        if (!hasNavigated) {
          setHasNavigated(true);
          navigation.replace("Onbordeing");
          setTimeout(() => {
            setHasNavigated(false);
          }, 5000);
        }
       
      }
    });
  }, []);

  return (
    <View style={styles.container}>
        <Lottie
                        source={aiProgress}
                        autoPlay
                        loop
                        style={{
                          height: 300,
                          width: 300,
                        }}
                      />

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: `100%`, // Customize the logo size according to your app's branding
    height: `100%`,
  },
});

export default SplashScreen;
