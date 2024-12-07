
import { EventContext } from '../../../../Servise/Events/eventContaxt';
import TextTimeComponent from '../../../../Components/TextTimeComponent';
import moment from 'moment';
import React, {useState, useEffect, useContext} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CountDownTimer from "react-native-countdown-timer-hooks";
// import CountDown to show the timer

import ntpSync from "@ruanitto/react-native-ntp-sync";
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface TimerTsxProps {
  children: ReactNode;
}

export function TimerTsx({ navigation }: TimerTsxProps) {
  const {timer,fetchgetChantContent,chantContent,chantContentLive} = useContext(EventContext);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTimeState, setCurrentTimeState] = useState(100);

  const [timeC, setTimeC] = useState(100);
  
  useEffect(() => {
   
    // درخواست زمان دقیق از سرور NTP
    var options = { server: "0.pool.ntp.org", port: 123 };

    // create a new instance
    var clock = (ntp = new ntpSync(options));
    

    // get the current unix timestamp
    var currentTime = clock.getTime();

    const dateObjt = new Date(currentTime);
    const datet = dateObjt.toDateString();
    const timet = dateObjt.toTimeString()?.slice(0, 8);

      
      

    var dateEntryLive = dateObjt;
    //Getting the current date-time with required formate and UTC
    var expirydateLive = new Date(chantContentLive?.startTime).getTime(); //You can set your own date-time
    //Let suppose we have to show the countdown for above date-time
    var diffrLive = moment.duration(
      moment(expirydateLive).diff(moment(currentTime))
    );
    //difference of the expiry date-time given and current date-time
    var hoursLive = parseInt(diffrLive.asHours());
    var minutesLive = parseInt(diffrLive.minutes());
    var secondsLive = parseInt(diffrLive.seconds());
    var e = hoursLive * 60 * 60 + minutesLive * 60 + secondsLive;
    setTimeC(e)
    setCurrentTimeState(currentTime)
    
  }, [])
  const setTimerFinish = (time) => {
   
    
  };
  return (
    <>
   <SafeAreaView style={styles.container}>
   <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: `100%`,
              height: `100%`,
              backgroundColor:  "#fff" 
            }}
          >
      <CountDownTimer
              timestamp={timeC}
              containerStyle={{
                height: 110,
                width: 500,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 35,
              }}
              timerCallback={()=> setTimerFinish(currentTimeState)}
              textStyle={{
                fontSize: 100,
                color:  Colors.purpleA700 ,
                fontWeight: "500",
                letterSpacing: 0.25,
              }}
            />
      </View>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});