import React, { useContext, useEffect, useState } from 'react'
import * as Apple from 'expo-apple-authentication';
import { View, StyleSheet, Text } from 'react-native';
import { AthContext } from '../../../Servise/Ath/athContaxt';
import { useNavigation } from '@react-navigation/native';
import { getUserApple, saveToken, saveUserApple } from '../../../core/save';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have FontAwesome installed
import { Button } from 'react-native-paper';
import { Colors } from '../../../Constants';
import Service from "../../../Servise/api";
import { StackActions } from "@react-navigation/native";

export default function AppleAuthentication() {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const { fnSignUpApiGoogle,setLoginBody ,fnSignInApiGoogle,fnSignInApi,fnCodeApi} = useContext(AthContext);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
      
      if(userInfo?.user!=null){
        setTimeout(()=>{
          onLoginPressedGoogle()
        },3000)
      }
  
     
    }, [userInfo]);
    const onSignUpPressedGoogle = () => {
    
      
      fnSignUpApiGoogle( "abcdefg",userInfo?.user,userInfo?.fullName?.givenName,"1990/08/12").then((res) => {
        // fnCodeApi({ActivationCode:res?.activationCode,clubToken:"abcdefg",userId:res?.id});
        saveToken(res?.token)
        Service.api.defaults.headers.common.Authorization = `Bearer ${res?.token}` ;
        setTimeout(() => {
          navigation.dispatch(
            StackActions.replace('SplashScreen')
          )
        }, 1000);
  
      });
    };
    const onLoginPressedGoogle = () => {
     
      fnSignInApiGoogle("abcdefg",userInfo?.user,userInfo?.user,2).then(res => {
        if(res?.fullName!=null){
          saveToken(res?.token)
          Service.api.defaults.headers.common.Authorization = `Bearer ${res?.token}` ;
          setTimeout(() => {
            navigation.dispatch(
              StackActions.replace('SplashScreen')
            )
          }, 1000);
        }else{
          onSignUpPressedGoogle();
        }
      });
    };
    
    const navigation =useNavigation()
    const onLoginPressed = () => {
       
        fnSignInApi().then(res => {
          if(res ==true){
            navigation.navigate("CodeCheck")
    
          }
        });
      };
      const GoogleSignInButton = ({  }) => {
        return (
          <>
            <Button
              mode="contained"
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.transparentBlack, // Google's brand color
                padding: 5,
                justifyContent: "space-around",
              }}
              onPress={async () => {
                try {
                  const credential = await Apple.signInAsync({
                    requestedScopes: [
                      Apple.AppleAuthenticationScope.FULL_NAME,
                      Apple.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                    
                    
                    
                  if(credential?.user!=null){
                    const jsonData = JSON.stringify(credential);
                    saveUserApple(jsonData)
                    setUserInfo(credential);
                  }else{
                   const userApple = await getUserApple();
                     
                     
                     
                   if(userApple?.user!=null){
                   setUserInfo(userApple);
  
                   }
  
                  }
                  // signed in
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED') {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            >
              <Icon
                name="apple"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
              <View style={{ width: 20 }} />
              <Text style={{ color: "white", fontWeight: "bold" }}>
               Continue with Apple
              </Text>
            </Button>
          </>
        );
      };

      return (
       
          <GoogleSignInButton />
        
      );
    }
    
    const styles = StyleSheet.create({
      container: {
       
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: 300,
        height: 50,
      },
    });
    

