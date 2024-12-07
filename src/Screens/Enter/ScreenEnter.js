import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import Background from "../../Components/Background";
import Logo from "../../Components/Logo";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import BackButton from "../../Components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { AthContext } from "../../Servise/Ath/athContaxt";
import { getToken } from "../../core/save";

import AppleAuthentication from "./AppleAuthentication";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you have FontAwesome installed
import { Colors } from "../../Constants";
import { McText } from "../../Components";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin'
export default function ScreenEnter({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const {
    fnSignUpApiGoogle,
    setLoginBody,
    fnSignInApi,
    fnSignInApiGoogle,
    fnCodeApi,
  } = useContext(AthContext);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  // GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //   webClientId: '98767528626-gtmq6vo9f3bokmafcc06etq6n510qu2l.apps.googleusercontent.com',
  
  // })
  

  useEffect(() => {
    handleEffect();
  }, [ token]);
  useEffect(() => {
    if (userInfo?.email != null) {
      setTimeout(() => {
        onLoginPressedGoogle();
      }, 2000);
    }
  }, [userInfo]);

  async function handleEffect() {
    const user = await getLocalUser();
      

    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
        
    }
  }

  const getLocalUser = async () => {
    const data = null;
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      getToken().then((res) => {
          
          
          
        if (res.length > 20) {
          navigation.navigate("Tabs");
        } else {
          return false;
        }
      });
    };

    checkLogin();
  }, []);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);

    const passwordError = passwordValidator(password.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });

      return;
    }
    fnSignInApi().then((res) => {
      if (res == true) {
        navigation.navigate("CodeCheck");
      }
    });
  };
  const onSignUpPressedGoogle = () => {
    fnSignUpApiGoogle(
      "abcdefg",
      userInfo?.email,
      userInfo?.name,
      "1990/08/12"
    ).then((res) => {
      fnCodeApi({
        ActivationCode: res?.activationCode,
        clubToken: "abcdefg",
        userId: res?.id,
      });
    });
  };
  const onLoginPressedGoogle = () => {
    fnSignInApiGoogle("abcdefg", userInfo?.email, userInfo?.id, 2).then(
      (res) => {
        if (res?.fullName != null) {
          fnCodeApi({
            ActivationCode: res?.activationCode,
            clubToken: "abcdefg",
            userId: res?.id,
          });
        } else {
          onSignUpPressedGoogle();
        }
      }
    );
  };
  const GoogleSignInButton = ({ onPress }) => {
    return (
      <>
        <Button
          mode="contained"
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.platform.android.primary, // Google's brand color
            padding: 10,
            justifyContent: "space-around",
          }}
          onPress={() => navigation.navigate("Enter")}
        >
          <Icon
            name="send"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View style={{ width: 20 }} />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Login with Email
          </Text>
        </Button>
      </>
    );
  };
  const GoogleSignInButtonEmail = ({ onPress }) => {
    return (
      <>
        <Button
          mode="contained"
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.blueA400, // Google's brand color
            padding: 10,
            justifyContent: "space-around",
          }}
          onPress={onPress}
        >
          <Icon
            name="google"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View style={{ width: 20 }} />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Sign in with Google
          </Text>
        </Button>
      </>
    );
  };
  const GoogleSignInButtonEmailRegister = ({ onPress }) => {
    return (
      <>
        <Button
          mode=""
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.indigo200, // Google's brand color
            padding: 10,
            justifyContent: "space-around",
          }}
          onPress={() => navigation.replace("Register")}
        >
          <Icon
            name="file-text-o"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View style={{ width: 20 }} />
          <Text style={{ color: "white", fontWeight: "bold",fontFamily:"Poppins-Black" }}>
            Register With Email
          </Text>
        </Button>
      </>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        padding: 50,
        backgroundColor:"#fff"
      }}
    >
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Image
        source={require("../../../assets/LogoSmart.png")}
        resizeMode="contain"
        style={{ width: `100%`, height: 200 ,marginTop:5,marginBottom:15}}
      />
      <McText
      bold
      size={20}
       style={{color:"#060047",marginBottom:30}}>
        {"On Click sign-up saves your own match and team experience "}
      </McText>
      {/* <GoogleSignInButtonEmail 
         onPress={async () => {
        try {
            
          await GoogleSignin.hasPlayServices()
          const userInfo = await GoogleSignin.signIn()
            
          setUserInfo(userInfo?.user);
          if (userInfo.idToken) {
          
          } else {
            throw new Error('no ID token present!')
          }
        } catch (error) {
            
            
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }} */}
      
      {Platform.OS != "ios" ? null : <AppleAuthentication />}
   
      <GoogleSignInButton 
      
      />
      <GoogleSignInButtonEmailRegister />

      {/* Adjust size and color as needed */}

      {/* <Text style={{ color: theme.colors.secondary }}>
          Don’t have an account?{" "}
        </Text> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: Colors.platform.android.primary,
    fontFamily: "Poppins-Black",
    fontSize: 25,
  },
});
