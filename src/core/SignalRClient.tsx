// import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// import moment from "moment";

// import * as FileSystem from "expo-file-system";
// import { Subject, interval, timer } from "rxjs";
// import { takeUntil, take } from "rxjs/operators";
// const targetDateTime = "2023/07/26 18:23:00";
// import ntpSync from "@ruanitto/react-native-ntp-sync";
// import { StackActions, useNavigation } from "@react-navigation/native";
// import NetInfo from "@react-native-community/netinfo";
// const SignalRContext = createContext();
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { setJSExceptionHandler } from "react-native-exception-handler";
// import { getToken, getUser } from "../../core/save";
// const hub_endpoint = "http://192.168.1.100:5055/SyncHubConnect";
// import Service from "../../Servise/api";
// import ntpClient from "react-native-ntp-client";

// import axios from "axios";
// import { activateKeepAwakeAsync } from "expo-keep-awake";
// import { DateTime } from "luxon";
// import { differenceInSeconds, getTime } from "date-fns";
// import {
//   getDatabase,
//   ref,
//   onValue,
//   set,
//   push,
//   runTransaction,
//   serverTimestamp,
// } from "firebase/database";
// import { initializeApp } from "firebase/app";

// import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
// import dayjs from "dayjs";
// // Initialize Firebase with your config
// const firebaseConfig = {
//   apiKey: "AIzaSyCx9EC4GSUTunyDI5fG2ocWKyhTf_DeaPA",

//   authDomain: "club-socket.firebaseapp.com",

//   databaseURL: "https://club-socket-default-rtdb.firebaseio.com",

//   projectId: "club-socket",

//   storageBucket: "club-socket.appspot.com",

//   messagingSenderId: "631323259370",

//   appId: "1:631323259370:web:baace9ad8f53326b1b0293",
// };

// const app = initializeApp(firebaseConfig);a
// const firestoreDB = getFirestore(app);
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AppState } from "react-native";
// import { EventContext } from "../Servise/Events/eventContaxt";
// export const SignalRProvider = ({ children }) => {
//   const navigation = useNavigation();
//   const {
//     remainingMilliseconds,
//     fetchDataShopCategories,
//     fetchgetChantContent,
//     fetchChantEventsData,
//     fetchEventData,
//     chantContentLive,
//     chantContent,
//     setTimer,
//     fetchTime,
//     currentTime,
//     flagEnterScreen,
//     setFlagEnterScreen,
//   } = useContext(EventContext);
//   const [user, onChangeUserText] = React.useState("");
//   const [message, onChangeMessageText] = React.useState("");
//   const [conn, setConn] = React.useState(null);
//   const [messageLog, setMessageLog] = React.useState([]);
//   const [connectionState, setConnectedStateText] = React.useState("");
//   const [isConnected, setIsConnected] = React.useState(false);
//   const [reconnectMessage, setReconnectMessage] = useState("");
//   const [runTime, setRunTime] = React.useState(false);
//   const [loadingSocket, setLoadingSocket] = React.useState(false);
//   const [runTimeer, setRunTimeer] = React.useState(0);
//   const [rnPlay, setRnPlay] = React.useState(false);
//   const [repPlay, setREPPlay] = React.useState(false);
//   const [showPlay, setShowPlay] = React.useState(false);
//   const [startTimer, setStartTimer] = React.useState(false);
//   const [enterToTimer, setEnterToTimer] = React.useState(false);
//   const [countFlagEnter, setCountFlagEnter] = React.useState(false);
//   const [ntpTimer, setNtpTimernter] = React.useState(0);
//   const [ntpTimerDate, setNtpTimernterDate] = React.useState(0);
//   const [historicalLatencyData, setHistoricalLatencyData] = useState([]);
//   const [dataChantReturns, setDataChantReturns] = React.useState();

//   let checkTime = true;
//   let defTime = 0;

//   const appState = useRef(AppState.currentState);
//   const [elapsed, setElapsed] = useState(0);

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', handleAppStateChange);
//     return () => subscription.remove();
//   }, []);

//   const handleAppStateChange = async (nextAppState) => {
//     if (
//       appState.current.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       const elapsed = await getElapsedTime();
//       setElapsed(elapsed);
//     }
//     appState.current = nextAppState;
//   };

//   const getElapsedTime = async () => {
//     try {
//       const startTime = await AsyncStorage.getItem('@start_time');
//       const now = new Date();
//       return differenceInSeconds(now, Date.parse(startTime));
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   const getServerTime = async (data: any, time,timeStart) => {
//     const unsubscribeSubject = new Subject();

//     const lightshowStart = dayjs.unix(time).add(10, "s");

//     getTimeGMT().then((dataTime) => {
//       // runChant(data, da
//       const startChant =Math.floor(timeStart / 1000)
//       const lightshowStartChant = dayjs.unix(startChant).add(10, "s");
//       let ntpTimeStartChant = dayjs(dataTime);
//       let ntpTime = dayjs(dataTime);
//       const diff = lightshowStart.diff(ntpTime);
//       const diffStartChant = lightshowStartChant.diff(ntpTimeStartChant);
//       if(diff>10000||diffStartChant>1000){
      
      
//       interval(diff-10000)
//       .pipe(take(1), takeUntil(unsubscribeSubject))
//       .subscribe(() => {
        
//         const start  = data?.chantStartTime -dataTime;
//        const timerNumber = Math.floor(start / 1000);
//         navigation.navigate("LyricsPageAuto", {
//               data: {
//                 dataChantReturn: data,
//                 contDown: 10,
//                 timeStart: timerNumber,
//                 dateEnter: 100,
//               },
//             });;
//             unsubscribeSubject.next(undefined); // Emit signal to complete the observable
//       unsubscribeSubject.complete(); 
//       });
//     }
//       // Complete the subject


//       // BackgroundTimer.runBackgroundTimer(() => {
//       //   //code that will be called every 3 seconds
//       //   navigation.navigate("LyricsPageAuto", {
//       //     data: {
//       //       dataChantReturn: data,
//       //       contDown: 10,
//       //       timeStart: 60,
//       //       dateEnter: 100,
//       //     },
//       //   });
//       // }, );

//       // BackgroundTimer.stopBackgroundTimer();
//     });
//   };
//   useEffect(() => {
//     if (enterToTimer == true) {
//       //   
//       fetchChantEventsData().then((data) => {
//         // runChant(data, dataTime);
//         const intervalId = setInterval(() => {
//           getServerTime(data, Math.floor(data?.chantTimerTime / 1000),data?.chantStartTime);
          
//         }, 3500);

        
//         setTimeout(() => {
//           setEnterToTimer(false);
//           if (intervalId) {
//             clearInterval(intervalId);
//           }
//         }, 20000);
//       });
//     }
//   }, [enterToTimer]);
//   const collectionName = "playback";
//   const documentId = "main";
//   const docRef = doc(firestoreDB, collectionName, documentId);
//   useEffect(() => {
//     getTimeGMT();
//   }, []);
//   const getTimeGMT = async () => {
//     const pingStart = new Date().getTime();
//     const response = await axios.get(
//       `https://timeapi.io/api/Time/current/zone?timeZone=Universal`,
//       {
//         headers: {
//           accept: "application/json",
//         },
//       }
//     );
//     const { year, month, day, hour, minute, seconds, milliSeconds, timeZone } =
//       response.data;

//     // Create a new Date object with the provided components
//     const utcDate = new Date(
//       Date.UTC(year, month - 1, day, hour, minute, seconds, milliSeconds)
//     );

//     const newEnd = new Date().getTime();
//     const pingEnd = new Date().getTime();
//     const roundTripTime = pingEnd - pingStart;
//     const estimatedLatency = roundTripTime / 2;
//     
  
//     return utcDate.getTime() - estimatedLatency;
//   };
//   const calculateNtpDifference = async (lightShowStartTime) => {
//     const ntpTime = await getTimeGMT();

//     const difference = ntpTime - lightShowStartTime;
//       

//     setNtpTimernter(difference);
//     return difference;
//   };
//   const clearAppCache = async () => {
//     try {
//       // Clear cache directory
//       await FileSystem.deleteAsync(FileSystem.cacheDirectory);

//       // Optionally, clear other directories if needed
//       // await FileSystem.deleteAsync(FileSystem.documentDirectory);

//         
//     } catch (error) {
//       console.error("Error clearing cache:" - error);
//     }
//   };
 

//   useEffect(() => {
//     const unsubscribeSubject = new Subject();
//     const unsubscribe = onSnapshot(
//       docRef,
//       { includeMetadataChanges: true },
//       async (doc) => {
//         if (doc.exists()) {
//           const { time: newPlaybackTime, timestamp } = doc.data();
//           if (newPlaybackTime =="Refreshh") {
//             setLoadingSocket(true);
//             fetchEventData();
//             setTimeout(() => {
//               setLoadingSocket(false);
//             }, 3000);
//           } else {
//             if (newPlaybackTime == "Chant") {
//               const newEN = new Date().getTime();

//               const clientTimestamp = await getTimeGMT();
//               // const timeDifference =
//               //   clientTimestamp.toMillis() - timestamp.toMillis();

//               // const timeDifference =
//               //   clientTimestamp.toMillis() - timestamp.toMillis();

//               const timeDifference: number =
//                 clientTimestamp - timestamp.toMillis();

//               // Perform synchronized actions here
//               setLoadingSocket(true);
//               setRnPlay(false);
//               getTimeGMT();
//               calculateNtpDifference(clientTimestamp);

//               setREPPlay(false);
//               setShowPlay(false);

//               const endEN = new Date().getTime();
//               const difference: number = (endEN - newEN) / 2;
//               interval(1000)
//                 .pipe(take(1), takeUntil(unsubscribeSubject))
//                 .subscribe(() => {
//                   fetchEventData();
//                   fetchChantEventsData();
//                   setLoadingSocket(false);
//                 });
                
//               interval(1000)
//                 .pipe(take(1), takeUntil(unsubscribeSubject))
//                 .subscribe(() => {
//                   setEnterToTimer(true);
//                 });
//             }
//           }
//         }
//       }
//     );
//     return () => {
//       unsubscribeSubject.next(undefined); // Emit signal to complete the observable
//       unsubscribeSubject.complete(); // Complete the subject

//       unsubscribe();
//     };
//   }, []);
//   useEffect(() => {
//     // reConnect(() => {
//     //   // Handle PhoneConnected event
//     //   alert("hi")

//     // });
//     setTimeout(() => {
//       handleReconnect();
//     }, 3000);
//   }, []);

//   const handleReconnectSwich = () => {
//     setLoadingSocket(true);
//     setTimeout(() => {
//       setLoadingSocket(false);
//     }, 3000);
//     // Handle the reconnection message received from the serve
//     fetchEventData();
//     fetchChantEventsData();

//     fetchDataShopCategories();
//   };
//   const handleReconnect = () => {
//     fetchDataShopCategories();
//     enableKeepAwake();
//   };
//   // useEffect(() => {
//   //   const unsubscribe = NetInfo.addEventListener((state) => {
//   //     setIsConnected(state.isConnected);
//   //   });

//   //   return () => unsubscribe();
//   // }, []);

//   let flagEnter = true;
//   useEffect(() => {
//     if (chantContent?.chantTimerTime > 500) {
//       const cn = chantContent;

//       setDataChantReturns(chantContent);
//     } else {
//     }
//   }, [chantContent, remainingMilliseconds]);
//   let timerOutId;

//   const executeFunction = () => {
//       
//   };
//   const enableKeepAwake = async () => {
//     await activateKeepAwakeAsync();
//   };
//   return (
//     <SignalRContext.Provider
//       value={{
//         showPlay,
//         repPlay,
//         rnPlay,
//         setRunTime,
//         runTimeer,
//         loadingSocket,
//         handleReconnectSwich,
//       }}
//     >
//       {children}
//     </SignalRContext.Provider>
//   );
// };

// export default SignalRContext;
