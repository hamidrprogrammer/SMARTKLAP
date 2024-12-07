import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Animated } from "react-native";
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
import { nameValidator } from "../../helpers/nameValidator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { AthContext } from "../../Servise/Ath/athContaxt";
import { McText } from "../../Components";
import Icon from "react-native-vector-icons/FontAwesome"; // You can use any Google icon library you prefer
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import AppleAuthentication from "./AppleAuthentication";
import { ImageBackground } from "react-native";
import { Colors } from "../../Constants";
import { Image } from "react-native";
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [birthday, setBirthday] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const datePickerRef = useRef(null);
  const {
    setLoginBody,
    fnSignInApiGoogle,
    fnSignUpApi,
    fnCodeApi,
    fnSignUpApiGoogle,
  } = useContext(AthContext);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "276139328972-i2ca5nabtvlbkotf32lq5sp4mviaeut1.apps.googleusercontent.com",
      iosClientId:
        "276139328972-88dbtkhl617unm9mkcqt8un0ud58602p.apps.googleusercontent.com",
      webClientId:
        "276139328972-i2ca5nabtvlbkotf32lq5sp4mviaeut1.apps.googleusercontent.com",
      androidClientId: '631323259370-e8i1fnndhccvblfo789tfutc62uqgi8b.apps.googleusercontent.com',

    },
    {
      projectNameForProxy: "@hamidrprogrammer/FootballClub",
    }
  );

  useEffect(() => {
    handleEffect();
  }, [response, token]);
  useEffect(() => {
    if (userInfo?.email != null) {
      setTimeout(() => {
        onSignUpPressedGoogle();
      }, 1000);
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
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);

    if (emailError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      return;
    }
    fnSignUpApi(
      "abcdefg",
      email.value,
      name.value,
      birthday.toISOString()
    ).then((res) => {
      if (res == true) {
        navigation.navigate("CodeCheck");
      }
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
        }
      }
    );
  };
  const onSignUpPressedGoogle = () => {
    fnSignUpApiGoogle(
      "abcdefg",
      userInfo?.email + "",
      userInfo?.name + "",
      "1990/08/12"
    ).then((res) => {
      if (res?.fullName != null) {
        fnCodeApi({
          ActivationCode: res?.activationCode,
          clubToken: "abcdefg",
          userId: res?.id,
        });
      } else {
        setTimeout(() => {
          onLoginPressedGoogle();
        }, 1000);
      }
    });
  };
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
    setShowPicker(false);
  };
  const showDatepicker = () => {
    setShowPicker(true);
  };
  const GoogleSignInButton = ({ onPress }) => {
    return (
      <>
        <Button
          mode="contained"
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#4285F4", // Google's brand color
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
        <AppleAuthentication />
      </>
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
        {"Create your own Club Football account"} 
      </McText>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
        style={{ backgroundColor: "#fff", borderRadius: 10 }}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={{ backgroundColor: "#fff", borderRadius: 10 }}
      />

      {/* {true && (
        <View
          style={{
            flexDirection: "row",
            width: `100%`,
            height: 50,
            paddingLeft: 15,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth:1,
            borderColor:'#ccc',
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <McText style={{ color: "#fff" }}>Birthday</McText>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode={"date"}
            display="default"
            onChange={onChangeDate}
          />
        </View>
      )} */}

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ backgroundColor: "#000" ,   borderRadius: 10,}}
      >
        Sign Up
      </Button>
      
      
      <AnimatedTouchableOpacity 
        cstyle={{position:"absolute",top:15,left:15,height:50,width:50}}
        onPress={() => navigation.replace("ScreenEnter")}>
          <Icon name="arrow-left" size={20} color="#000"/>
        </AnimatedTouchableOpacity>
     
    </KeyboardAvoidingView>
  );
}
const AnimatedTouchableOpacity = ({ cstyle, children ,onPress}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    onPress()
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[cstyle,{ transform: [{ scale: scaleValue }], opacity: opacityValue }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: Colors.platform.android.primary,
    fontFamily:"Poppins-Black",
    fontSize:25
  },
});
