import { ReactNode, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ntpSync from "@ruanitto/react-native-ntp-sync";
import { NetInfo } from "react-native";
import { AppState, Platform } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import SignalRContext from "../../../Servise/Sinal/SignalRContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
interface StartChantTsxProps {
  navigation: any
}

export function StartChantTsx() {
  const {
    fetchEventData,
    events,
    fetchNews,
    news,
    fetchChantEventsData,
    eventsChant,
    timer,
    setTimer,
    setTimerToStart,
        timerToStart,
        liveEvent,
        chantContentLive,
        fetchSetUserChantLog,
        chantContent
  } = useContext(EventContext);
  const SignalRClient = useContext(SignalRContext);
  const navigation = useNavigation();

  const checkAndPlayChant = async (item: any) => {
    if (!item?.countDownStartTime) {
      return;
    }
    const dateTimeString = "2023-07-24T17:19:19+00:00";
    const startTime = new Date(item?.countDownStartTime).getTime();
    const timestamp = 1690219159000;

    //   
    // درخواست زمان دقیق از سرور NTP
    var options = { server: "0.pool.ntp.org", port: 123 };

    // create a new instance
    var clock = (ntp = new ntpSync(options));

    // get the current unix timestamp
    var currentTime = clock.getTime();

    const dateObjt = new Date(currentTime);
    const datet = dateObjt.toDateString();
    const timet = dateObjt.toTimeString()?.slice(0, 8);

      
      
    const dateObj = new Date(startTime);
    const date = dateObj.toDateString();
    const time = dateObj.toTimeString()?.slice(0, 8);

      
      
    
    var dateEntryLive = dateObjt;
    //Getting the current date-time with required formate and UTC
    var expirydateLive = liveEvent?.startTime; //You can set your own date-time
    //Let suppose we have to show the countdown for above date-time
    var diffrLive = moment.duration(moment(expirydateLive).diff(moment(dateEntryLive)));
    //difference of the expiry date-time given and current date-time
    var hoursLive = parseInt(diffrLive.asHours());
    var minutesLive = parseInt(diffrLive.minutes());
    var secondsLive = parseInt(diffrLive.seconds());
    var e= hoursLive * 60 * 60 + minutesLive * 60 + secondsLive;
    setTimerToStart(e)
   
      
    if (`${date}${time}` == `${datet}${timet}`) {
      var dateEntry = item?.countDownStartTime;
      //Getting the current date-time with required formate and UTC
      var expirydate = item?.startTime; //You can set your own date-time
      //Let suppose we have to show the countdown for above date-time
      var diffr = moment.duration(moment(expirydate).diff(moment(dateEntry)));
      //difference of the expiry date-time given and current date-time
      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());
      var d = hours * 60 * 60 + minutes * 60 + seconds;
      setTimer(d);
      
      // انجام عملیات مورد نظر، مثلاً پخش صدا
        
     
      setTimeout(() => {
        navigation.navigate("TimerTsx");
      }, 3000);
    }
  };
  useEffect(() => {
    fetchChantEventsData();
 

  }, []);

 
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     checkAndPlayChant(chantContentLive);
  //   }, 100);
  //   AppState.addEventListener("change", (nextAppState) => {
  //     if (nextAppState === "active") {
      
         
  //           checkAndPlayChant(chantContentLive);
         
       
  //     }
  //   });
  //   return () => clearInterval(intervalId);
  // }, [eventsChant]);
  return (
    <View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});
