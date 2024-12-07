import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { AthContext } from "../../../Servise/Ath/athContaxt";
import OTPInput from "../otoInp";
import { ImageBackground } from "react-native";
import { McText } from "../../../Components";
import { TouchableOpacity } from "react-native";
const OTPScreen = ({ navigation }) => {
  const { setCode, user, fnCodeApi } = useContext(AthContext);
  const [isLoading, setIsLoading] = useState(false);

  const resendOTP = () => {};

  return (
    <KeyboardAvoidingView behavior="height" style={styles.mainCon}>
      <Image
        source={require("../../../../assets/LogoSmart.png")}
        resizeMode="contain"
        style={{ width: `100%`, height: 200, marginTop: 5, marginBottom: 15 }}
      />
    
      <View style={{ position: "relative"}}>
       
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>
              We have successfully transmitted the code to the email address
              associated with your account.
            </Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>
              An 4 digit code has been sent to
            </Text>
          </View>
          <View style={styles.formCon}>
            <OTPInput
              onComplete={(otp) => {
                  
                  
                  
                setIsLoading(true)
                fnCodeApi({
                  ActivationCode: parseInt(otp),
                  clubToken: "abcdefg",
                  userId: user?.id,
                });
                setIsLoading(false)

                  
              }}
            
            />
            <Pressable onPress={() => resendOTP()}>
              <Text style={styles.registerLbl}>Resend OTP</Text>
            </Pressable>
          </View>
        </View>
      
      </View>
      {!isLoading? null:
        <TouchableOpacity style={{width:`100%`,height:`100%`,alignItems:"center",justifyContent:"center",position:"absolute"
          ,backgroundColor:"rgba(0,0,0,0.3)"
        }}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </TouchableOpacity>
      }
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    backgroundColor:"#fff"
  },
  loginIcon: {
    alignSelf: "center",
  },
  formCon: {
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: "relative",
    bottom: 40,
  },
  loginLbl: {
    color: "#bbb",
    marginTop: 20,
    fontSize: 18
    ,fontFamily:"Poppins-Black"
  },
  forgotDes: {
    position: "relative",
    bottom: 35,
  },
  forgotDesLbl: {
    color: "#bbb"
    ,fontFamily:"Poppins-Black"
  },
  registerLbl: { color: "#000", marginTop: 15,fontFamily:"Poppins-Black" },
});

export default OTPScreen;
