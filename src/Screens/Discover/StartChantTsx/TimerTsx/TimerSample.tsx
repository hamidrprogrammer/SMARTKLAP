import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import moment from "moment";
import { Subject } from "rxjs";
import { timer as rxjsTimer } from "rxjs";

import { takeUntil } from "rxjs/operators";
import { EventContext } from "../../../../Servise/Events/eventContaxt";
const targetDateTime = "2023/07/26 18:23:00";
import ntpSync from "@ruanitto/react-native-ntp-sync";
import { useNavigation } from "@react-navigation/native";
const DateTimeComponent = ({}) => {
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
  } = useContext(EventContext);
  
  
  return (
    <View>
      {chantContentLive?.startTime == null ? null : (
        <Text>{chantContentLive?.startTime}</Text>
      )}
    </View>
  );
};

export default DateTimeComponent;
