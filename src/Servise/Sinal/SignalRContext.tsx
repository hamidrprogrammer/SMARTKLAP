import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { EventContext } from "../Events/eventContaxt";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import { Subject, interval, timer } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
const targetDateTime = "2023/07/26 18:23:00";
import ntpSync from "@ruanitto/react-native-ntp-sync";
import { StackActions, useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
const SignalRContext = createContext();
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { getToken, getUser } from "../../core/save";
const hub_endpoint = "http://192.168.1.100:5055/SyncHubConnect";
import Service from "../../Servise/api";
import ntpClient from "react-native-ntp-client";

import axios from "axios";
import { activateKeepAwakeAsync } from "expo-keep-awake";
import { DateTime } from "luxon";
import { differenceInSeconds, getTime } from "date-fns";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  runTransaction,
  serverTimestamp,
} from "firebase/database";
import { initializeApp } from "firebase/app";

import { getFirestore, doc, setDoc, onSnapshot, disableNetwork, clearIndexedDbPersistence, enableNetwork } from "firebase/firestore";
import dayjs from "dayjs";
// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyCx9EC4GSUTunyDI5fG2ocWKyhTf_DeaPA",

  authDomain: "club-socket.firebaseapp.com",

  databaseURL: "https://club-socket-default-rtdb.firebaseio.com",

  projectId: "club-socket",

  storageBucket: "club-socket.appspot.com",

  messagingSenderId: "631323259370",

  appId: "1:631323259370:web:baace9ad8f53326b1b0293",
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Platform } from "react-native";
export const SignalRProvider = ({ children }) => {
  const navigation = useNavigation();
  const {
    remainingMilliseconds,
    fetchDataShopCategories,
    fetchgetChantContent,
    fetchChantEventsData,
    fetchEventData,
    chantContentLive,
    chantContent,
    setTimer,
    fetchTime,
    currentTime,
    flagEnterScreen,
    setFlagEnterScreen,
  } = useContext(EventContext);
  const [user, onChangeUserText] = React.useState("");
  const [message, onChangeMessageText] = React.useState("");
  const [conn, setConn] = React.useState(null);
  const [messageLog, setMessageLog] = React.useState([]);
  const [connectionState, setConnectedStateText] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(true);
  const [reconnectMessage, setReconnectMessage] = useState("");
  const [runTime, setRunTime] = React.useState(false);
  const [loadingSocket, setLoadingSocket] = React.useState(false);
  const [runTimeer, setRunTimeer] = React.useState(0);
  const [rnPlay, setRnPlay] = React.useState(false);
  const [repPlay, setREPPlay] = React.useState(false);
  const [showPlay, setShowPlay] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false);
  const [enterToTimer, setEnterToTimer] = React.useState(false);
  const [countFlagEnter, setCountFlagEnter] = React.useState(false);
  const [ntpTimer, setNtpTimernter] = React.useState(0);
  const [ntpTimerDate, setNtpTimernterDate] = React.useState(0);
  const [historicalLatencyData, setHistoricalLatencyData] = useState([]);
  const [dataChantReturns, setDataChantReturns] = React.useState();
  const [testTime, setTestTime] = React.useState(0);
  const [uriMp3, setUriMp3] = React.useState("");
  const [hasNavigated, setHasNavigated] = useState(false);

  let checkTime = true;
  let defTime = 0;

  const appState = useRef(AppState.currentState);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      const elapsed = await getElapsedTime();
      setElapsed(elapsed);
    }
    appState.current = nextAppState;
  };

  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem("@start_time");
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      console.warn(err);
    }
  };

  // const getServerTime = async (data: any, time, timeStart,dataTime,dely,start) => {
  //   console.log("diff==========>")
  //   const startDely = performance.now();
  //   const elapsedTime =Math.floor(start- startDely);
  //   const delyLat =Math.floor(elapsedTime+ dely);

  //   const lightshowStart = dayjs.unix(time).add(10, "s");

  //   // runChant(data, da
  //   const startChant = Math.floor(timeStart / 1000);
  //   const lightshowStartChant = dayjs.unix(startChant).add(10, "s");
  //   let ntpTimeStartChant = dayjs(dataTime);
  //   let ntpTime = dayjs(dataTime);
  //   const diff = lightshowStart.diff(ntpTime);
  //  console.log("diff==========>"+diff)
  //   const diffStartChant = lightshowStartChant.diff(ntpTimeStartChant);
  //   console.log("diffStartChant", diffStartChant);
  //   console.log("diff", diff);
  //   const dateT = dataTime;
  //   if(diff < 1 && diffStartChant > 9000 && !hasNavigated){
  //     hasNavigated = true;

  //     const start = data?.chantStartTime - dateT;
  //     const timerNumber = Math.floor(start / 1000);
  //     const roundedNumber = Math.round(diff);
  //     setTimeout(() => {
  //       navigation.navigate("LyricsPageAuto", {
  //         data: {
  //           dataChantReturn: data,
  //           contDown: 10,
  //           timeStart: timerNumber,
  //           dateEnter: 100,
  //         },
  //       });
  //     },9000);
  //     setTimeout(() => {
  //       hasNavigated = false;
  //     }, 15000);

  //   }else{
  //     if (diff > 100 || diffStartChant > 200&& !hasNavigated) {
  //       hasNavigated = true;
  //       const start = data?.chantStartTime - dateT;
  //       const timerNumber = Math.floor(start / 1000);
  //       const roundedNumber = Math.round(diff);
  //       setTimeout(() => {
  //         navigation.navigate("LyricsPageAuto", {
  //           data: {
  //             dataChantReturn: data,
  //             contDown: 10,
  //             timeStart: timerNumber,
  //             dateEnter: 100,
  //           },
  //         });
  //         setTimeout(() => {
  //           hasNavigated = false;
  //         }, 15000);
  //       },(diff-10000)-delyLat);
       
  //     }
  //   }
   
  //   // Complete the subject

  //   // BackgroundTimer.runBackgroundTimer(() => {
  //   //   //code that will be called every 3 seconds
  //   //   navigation.navigate("LyricsPageAuto", {
  //   //     data: {
  //   //       dataChantReturn: data,
  //   //       contDown: 10,
  //   //       timeStart: 60,
  //   //       dateEnter: 100,
  //   //     },
  //   //   });
  //   // }, );

  //   // BackgroundTimer.stopBackgroundTimer();
  // };
  useEffect(() => {
    // let constData = fetchChantEventsData().then((data) => {
    //   // runChant(data, dataTime);
    //   return data
    // });
    // const fetchNtpTime = async () => {
    //   try {
    //     getTimeGMT().then((dataTime) => {
    //       console.log("TEEEEEEEEEEEEEEEEs" + constData?.chantStartTime);

          
           
    //         // console.log("dataChantReturns",dataChantReturns);
           
    //           getServerTime(
    //             constData,
    //             Math.floor(constData?.chantTimerTime / 1000),
    //             constData?.chantStartTime,
    //             dataTime
    //           );
        
          
    //     });
    //   } catch (error) {
    //     console.error("Error fetching NTP time:", error);
    //   }
    // };

    // // Fetch NTP time initially
    // fetchNtpTime();
    // if (enterToTimer == true) {
    //   setEnterToTimer(false);
    // // Set interval to fetch and update time every minute
    // setInterval(fetchNtpTime, 20000);
    
    // } // 60,000 milliseconds = 1 minute

    // Clean up interval on component unmount

  }, [enterToTimer]);
  useEffect(() => {
    // if (enterToTimer == true) {
    //   setEnterToTimer(false);
    //   // console.log("dataChantReturns",dataChantReturns);
    //   fetchChantEventsData().then((data) => {
    //     // runChant(data, dataTime);

    //     getServerTime(
    //       data,
    //       Math.floor(data?.chantTimerTime / 1000),
    //       data?.chantStartTime
    //     );
    //   });
    // }
  }, [enterToTimer, testTime]);
  const collectionName = "playback";
  const documentId = "main";
  const docRef = doc(firestoreDB, collectionName, documentId);
  useEffect(() => {
    getTimeGMT();
  }, []);
  const getTimeGMT = async () => {
    const pingStart = new Date().getTime();
    const response = await axios.get(
      "https://timeapi.io/api/Time/current/zone?timeZone=Universal",
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const { year, month, day, hour, minute, seconds, milliSeconds, timeZone } =
      response.data;

    // Create a new Date object with the provided components
    const utcDate = new Date(
      Date.UTC(year, month - 1, day, hour, minute, seconds, milliSeconds)
    );

    const newEnd = new Date().getTime();
    const pingEnd = new Date().getTime();
    const roundTripTime = pingEnd - pingStart;
    const estimatedLatency = roundTripTime / 2;
    console.log("estimatedLatency", estimatedLatency);

    return utcDate.getTime() - estimatedLatency;
  };
  const calculateNtpDifference = async (lightShowStartTime) => {
    const ntpTime = await getTimeGMT();

    const difference = ntpTime - lightShowStartTime;
    console.log("calculateNtpDifference", difference);

    setNtpTimernter(difference);
    return difference;
  };
  const clearAppCache = async () => {
    try {
      // Clear cache directory
      await FileSystem.deleteAsync(FileSystem.cacheDirectory);

      // Optionally, clear other directories if needed
      // await FileSystem.deleteAsync(FileSystem.documentDirectory);

      console.log("Cache cleared successfully");
    } catch (error) {
      console.error("Error clearing cache:" - error);
    }
  };
  const runChant = async (data, timeGMT) => {
    console.log("chantContent?.chantTimerTime", data?.chantTimerTime);
    const deviceTime = new Date().getTime();
    const offset = timeGMT - deviceTime;
    const timeSTN = data?.chantTimerTime + offset;
    // const timeTims = new Date().getTime()-ntpTimerDate;
    let startTimer = timeSTN - new Date().getTime();

   

    if (startTimer > 1 && startTimer < 1000000 && data?.chantTimerTime > 500) {
      const cn = data;
      if (flagEnterScreen) {
        clearTimeout(timerOutId);
        timerOutId = setTimeout(async () => {
          try {
            const dateEnterNew = new Date().getTime();

            setRnPlay(false);
            setREPPlay(false);
            setShowPlay(false);
            setStartTimer(true);
            setTimeout(() => {
              // startTimerOnServer(parseInt(chantContent?.chantStartTime));
            }, 4000);
            flagEnter = true;
            // const timeTimsNew = new Date().getTime()-ntpTimerDate;

            getTimeGMT().then((dataTimeN) => {
              const deviceTimeT = new Date().getTime();
              const offsetT = dataTimeN - deviceTimeT;
              const timeSTNT = data?.chantStartTime + offsetT;
              let startTimerC = timeSTNT - new Date().getTime();
              const parsInst = startTimerC;
              if (data && parsInst) {
                if (!hasNavigated) {
                  setHasNavigated(true);
                  navigation.navigate("LyricsPageAuto", {
                    data: {
                      dataChantReturn: data,
                      contDown: 10,
                      timeStart: parsInst,
                      dateEnter: ntpTimerDate,
                    },
                  });
                  setTimeout(() => {
                    setHasNavigated(false);
                  }, 5000);
                }
               
              }
            });
            
            setStartTimer(false);
          } catch (error) {
            console.error("Error fetching time:", error);
          }
        }, startTimer);

        console.log("تایمر در حال اجراست");

        
      }
    }
  };
  const fetchAndScheduleEvent = async (chantData) => {
    try {
      const chantTimerTime = Math.floor(chantData?.chantTimerTime / 1000) * 1000;
      const chantStartTime = chantData?.chantStartTime;
  
      await getServerTime(chantData, chantTimerTime, chantStartTime);
      

    } catch (error) {
      console.error('Error in fetchAndScheduleEvent:', error);
    }
  };
  const [downloadProgress, setDownloadProgress] = useState(null);

  const downloadFile = async (mpt3) => {
    const uri = mpt3; // Replace with your MP3 URL
    const fileUri = FileSystem.documentDirectory + 'your.mp3';
    
    const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      fileUri,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      setUriMp3(uri)
      // alert('Download complete!');
    } catch (e) {
      console.error(e);
      // alert('Download failed.');
    }
  };
  const scheduleEvent =  (dely,chantData,chantTimerTime) => {
    const fi=  new Date().getTime()
    const timesss =fi-dely 
    const estimatedLatency =timesss ;
    const time =chantTimerTime -(dely-estimatedLatency)
    if (dely) {
     
      console.log("========>"+time);
      const check = Math.round(10000-(time/10)); 
      console.log("======check==>"+check);
      setTimeout(() => {
        if (!hasNavigated) {
          setHasNavigated(true);
          navigation.navigate('LyricsPageAuto', {
          data: {
            dataChantReturn: chantData,
            contDown: 10,
            timeStart: 0,
            dateEnter: 100,
          },
        });
          setTimeout(() => {
            setHasNavigated(false);
          }, 5000);
        }
        
        
      }, (check-5000));
    }
  
    
  };

 

  const getServerTime = async (chantData, chantTimerTime, chantStartTime) => {
    
  
    setTimeout(async () => {
        
    
      
      const dely  = new Date().getTime()
    
      // Fetch the NTP time and calculate the offset
      const [ntpTime, offset] = await fetchNtpTime();
      if (ntpTime) {
      
        const adjustedEventTime =chantTimerTime - offset;
        const adjustedEventTimeReEnter =chantData?.chantStartTime-offset ;

        
        
        const timeLeft = adjustedEventTime - ntpTime;
        const timeLeftReEnter = adjustedEventTimeReEnter - ntpTime;
        console.log("adjustedEvesntTime"+timeLeft);
        
       
        if (timeLeft > 0) {
          downloadFile(chantData?.chant_Audio_List[0]?.fileUrl)
     
         setTimeout(() => {
          console.log("FINISHHHHHHHHHHHHHHHHHHHHHHH");
          scheduleEvent(dely,chantData,chantTimerTime)
           
         }, timeLeft-3000);
      
      
        }else{
          if(timeLeftReEnter>35000){
            setTimeout(() => {
              if (!hasNavigated) {
                setHasNavigated(true);
                navigation.navigate('LyricsPageAuto', {
                  data: {
                    dataChantReturn: chantData,
                    contDown: 10,
                    timeStart: 0,
                    dateEnter: 100,
                  },
                });
                setTimeout(() => {
                  setHasNavigated(false);
                }, 5000);
              }
             
            }, 9000);
          
          }

        }
      }
    }, 1000);
    // const chantStartTimeInMs = new Date(chantStartTime).getTime();
  
    // const diff = chantTimerTime - ntpTime;
    // const diffStartChant = chantStartTimeInMs - ntpTime;
    // console.log('chantTimerTime Difference:', chantTimerTime);
    // console.log('ntpTimet Difference:', ntpTime);
    // console.log('Event Start Difference:', diff);
    // console.log('Chant Start Difference:', diffStartChant);
  
    // if (diff > 10000 && diffStartChant > 9000 && !hasNavigated) {
    //   console.log('Chant Start Difference:', "BOOOOOOOOOOOOOOOOOOOOOO");

    //   hasNavigated = true;
    //   scheduleEvent(diff + 2000, chantData);
    // } 
    // else if ((diff < 100 || diffStartChant > 20000) && !hasNavigated) {
    //   console.log('Chant Start Difference:', "FOOOOOOOOOOOOOOOOOOOOOO");

    //   hasNavigated = true;
    //   scheduleEvent(ntpTime + (diff - 10000), chantData);
    // }
    // setTimeout(() => {
    //   hasNavigated = false
    // }, 10000);
  };
  const fetchNtpTime = async () => {
    try {
      // Use an NTP time API endpoint to get the current time
      const response = await axios.get('https://timeapi.io/api/Time/current/zone?timeZone=Universal');
      console.log(response);
      
      
      const { datetime } = response.data;
      const { year, month, day, hour, minute, seconds, milliSeconds, timeZone } =
      response.data;

    // Create a new Date object with the provided components
    const ntpTime = new Date(
      Date.UTC(year, month-1 , day, hour, minute, seconds, milliSeconds)
    ).getTime();
    console.log(ntpTime);
    

    
      return [ntpTime, 0];
    } catch (error) {
      console.error("Failed to fetch NTP time:", error);
      return [null, null];
    }
  };

  useEffect(() => {
    const unsubscribeSubject = new Subject();
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: true },
      async (doc) => {
        if (doc.exists()) {
          const startTime = Date.now();
        
          const { time: newPlaybackTime, timestamp } = doc.data();
          if (newPlaybackTime == "Refreshh") {
            setLoadingSocket(true);
            fetchEventData();
            setTimeout(() => {
              fetchChantEventsData();
              setLoadingSocket(false);
            }, 3000);
          } else {
            if (newPlaybackTime == "Chant") {
              // setLoadingSocket(false);
              // setRnPlay(false);

              // // calculateNtpDifference(clientTimestamp);

              // setREPPlay(false);
              // setShowPlay(false);
              // setEnterToTimer(false);
              // // Set interval to fetch and update time every minute
              
              
             
              // const clientTimestamp = await getTimeGMT();
              // // const timeDifference =
              // //   clientTimestamp.toMillis() - timestamp.toMillis();

              // // const timeDifference =
              // //   clientTimestamp.toMillis() - timestamp.toMillis();

              // const timeDifference: number =
              //   clientTimestamp - timestamp.toMillis();

              // // Perform synchronized actions here
              // setLoadingSocket(true);
              // setRnPlay(false);

              // calculateNtpDifference(clientTimestamp);

              // setREPPlay(false);
              // setShowPlay(false);

              // const endEN = new Date().getTime();
              // const difference: number = (endEN - newEN) / 2;
              // fetchEventData();
              // fetchChantEventsData();

              // setTimeout(() => {
              //   fetchChantEventsData();
              //   setLoadingSocket(false);
              // }, 3000);

              // fetchEventData();
              // fetchChantEventsData();
        const initialDelay = performance.now();
        const chantData = await fetchChantEventsData();
        await fetchAndScheduleEvent(chantData)
             
             
          
              // Fetch NTP time initially
            
             
              
    
    
            }
          }
        }
      }
    );
    return () => {
      unsubscribeSubject.next(undefined); // Emit signal to complete the observable
      unsubscribeSubject.complete(); // Complete the subject

      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   // reConnect(() => {
  //   //   // Handle PhoneConnected event
  //   //   alert("hi")

  //   // });
  //   setTimeout(() => {
  //     handleReconnect();
  //   }, 3000);
  // }, []);

  const handleReconnectSwich = () => {
    setLoadingSocket(true);
    setTimeout(() => {
      setLoadingSocket(false);
    }, 3000);
    // Handle the reconnection message received from the serve
    fetchEventData();
    fetchChantEventsData();

    fetchDataShopCategories();
  };
  const handleReconnect = () => {
    fetchDataShopCategories();
    enableKeepAwake();
  };
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });
      return () => unsubscribe();
    }, 20000);
  }, []);
  useEffect(() => {
    if (!isConnected) {
      alert("Please check your internet connection and try again.");
    }
  }, [isConnected]);

  let flagEnter = true;
  useEffect(() => {
    if (chantContent?.chantTimerTime > 500) {
      const cn = chantContent;

      setDataChantReturns(chantContent);
    } else {
    }
  }, [chantContent, remainingMilliseconds]);
  let timerOutId;

  const executeFunction = () => {
    console.log("Function executed at targetDateTime:", targetDateTime);
  };
  const enableKeepAwake = async () => {
    await activateKeepAwakeAsync();
  };
  return (
    <SignalRContext.Provider
      value={{
        showPlay,
        repPlay,
        rnPlay,
        setRunTime,
        runTimeer,
        loadingSocket,
        handleReconnectSwich,
        isConnected,
        testTime,
        uriMp3
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export default SignalRContext;