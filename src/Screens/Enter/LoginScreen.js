import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-paper";
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
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import AppleAuthentication from "./AppleAuthentication";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you have FontAwesome installed
import { Colors } from "../../Constants";
import { McText } from "../../Components";
import { Image } from "react-native";

export default function LoginScreen({ navigation }) {
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
  //   webClientId: '631323259370-f1kut2b2gje3lhb7nctsmiunb207ffuc.apps.googleusercontent.com',
  // })
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "631323259370-f1kut2b2gje3lhb7nctsmiunb207ffuc.apps.googleusercontent.com",
      iosClientId:
        "276139328972-88dbtkhl617unm9mkcqt8un0ud58602p.apps.googleusercontent.com",
      webClientId:
        "631323259370-f1kut2b2gje3lhb7nctsmiunb207ffuc.apps.googleusercontent.com",
      androidClientId:
        "98767528626-ldss0puip1pehc6jn9nklr09vanvugp9.apps.googleusercontent.com",
      redirectUrl: `${AuthSession.OAuthRedirect}:/oauth2redirect/google`,
          scopes: ['profile', 'email']
    },
    {
      projectNameForProxy: "@hamidrprogrammer/SMARTKLAP",
    }
  );

  useEffect(() => {
    handleEffect();
  }, [response, token]);
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
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      getToken().then((res) => {
          
          
          
        if (res.length > 20) {
          if (!hasNavigated) {
            setHasNavigated(true);
            navigation.replace("Tabs");
            setTimeout(() => {
              setHasNavigated(false);
            }, 5000);
          }
        
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
    // alert("This account does not exist")

    fnSignInApi().then((res) => {
      if (res == true) {
        if (!hasNavigated) {
          setHasNavigated(true);
          navigation.navigate("CodeCheck");
          setTimeout(() => {
            setHasNavigated(false);
          }, 5000);
        }
       
      }else{
        alert("This account does not exist")
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
 

  return (
    <KeyboardAvoidingView behavior="height" style={{
   
      flex: 1,
      backgroundColor:"#fff",
      padding:50
    }}>
    
   
    <Image
        source={require("../../../assets/LogoSmart.png")}
        resizeMode="contain"
        style={{ width: `100%`, height: 200 ,marginTop:5,marginBottom:15}}
      />
      <McText
      bold
      size={15}
       style={{color:"#000",marginBottom:10}}>
        {"Login your own Club Football account"} 
      </McText>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => {
          setEmail({ value: text, error: "" });
          setLoginBody({
            mail: text,
            clubToken: "abcdefg",
            AccountId: 103606869190927349793,
            AccountId: 2,
          });
        }}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
        <McText
      bold
      size={11}
       style={{color:"#ccc",marginBottom:30}}>
        {"Please provide your email address"} 
      </McText>
     
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Button
        mode="contained"
        onPress={onLoginPressed}
        
        style={{ backgroundColor: "#000" ,   borderRadius: 10,}}
        
      >
        Login
      </Button>
     

      {/* Adjust size and color as needed */}
    
        {/* <Text style={{ color: theme.colors.secondary }}>
          Don’t have an account?{" "}
        </Text> */}
        <TouchableOpacity 
        style={{position:"absolute",top:15,left:15,height:50,width:50}}
        onPress={() => navigation.replace("ScreenEnter")}>
          <Icon name="arrow-left" size={20} color="#000"/>
        </TouchableOpacity>
    

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
    fontFamily:"Poppins-Black",
    fontSize:25
  },
});
