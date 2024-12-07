/**
  TODO:

  [x] Clone the mcrn-expo-easy-starter project.
  [x] Rename the project.
  [x] Install dependencies
  [x] Start the app (yarn ios)
  [x] Study the UI Design and prepare the Fonts, Images, Colors, Dummy data.
  [x] Bottom tabs navigation (4 screens)
  [x] Discover Screen
      [x] Header Section
      [x] Banner Section
      [x] Teams Section
      [x] Matches Section
      [x] News Section
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  StatusBar,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  ImageBackground,
  Modal,
  TouchableOpacity,
  NativeModules,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Fonts, Images } from "@/Constants";
import { McText, McImage } from "@/Components"
import styled from "styled-components/native";
import { PageIndicator } from "react-native-page-indicator";

import { dummyData } from "@/Mock";

import { EventContext } from "../../Servise/Events/eventContaxt";
import COLORS from "../shop/consts/colors";

import { Colors } from "../../Constants";
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from "react-native-elements";
import { StartChantTsx } from "./StartChantTsx";
import moment from "moment";
import MedalsAndRankUi from "./MedalsUi";
import { Button, Card } from "react-native-paper";
import {
  FinishUi,
  LiveEventUi,
  PendinghUi,
  PreStartUi,
} from "../Home/PreStartUi";
import { Image } from "react-native";
const widthFull = Dimensions.get("window").width;

const _renderTeamsItem = ({ item, index }) => {
  return (
    <TeamItemBox
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === dummyData.Teams.length - 1 ? 0 : 10,
      }}
    >
      <BigTeamLogo source={item.logo} />
    </TeamItemBox>
  );
};
const NewsItemTwo = ({ item, index }) => (
  <Card
    style={{
      backgroundColor: "#fff",
      height: 100,
    }}
  >
    <View style={{ flexDirection: "row", width: `100%` }}>
      <Image
        source={{ uri: item?.thumbnail?.content?.url }}
        style={{
          width: 113,
          height: 100,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          marginRight: 15,
        }}
      />
      <View
        style={{
          width: `60%`,
          justifyContent: "space-between",
          paddingRight: 8,
        }}
      >
        <McText medium size={12} numberOfLines={5} color={"#000"}>
          {item?.title}
        </McText>

        <McText regualr color="#000" size={10}>
          {new Date(item?.created_date).toISOString()}
        </McText>
      </View>
    </View>
  </Card>
);
const NewsItem = ({ item, index }) => (
  <Card
    style={{
      padding: 10,
      backgroundColor: "#fff",
      height: 180,
      borderRadius:5
    }}
  >
    <View style={{ flexDirection: "row-reverse", width: `100%` }}>
      <McImage
        source={{ uri: item?.thumbnail?.content?.url }}
        style={{
          width: `40%`,
          height: 120,
          borderRadius: 25,
        }}
      />
      <View
        style={{
          width: `55%`,
          justifyContent: "space-between",
          paddingRight: 8,
        }}
      >
        <McText medium size={13} numberOfLines={5} color={"#000"}>
          {item?.title}
        </McText>

        <McText regualr color="#000" size={8}>
          {new Date(item?.created_date).toISOString()}
        </McText>
      </View>
    </View>
  </Card>
);

import ntpSync from "@ruanitto/react-native-ntp-sync";
import axios from "axios";
import SignalRContext from "../../Servise/Sinal/SignalRContext";
import { ActivityIndicator } from "react-native";
import {
  activateKeepAwake,
  activateKeepAwakeAsync,
  deactivateKeepAwake,
  useKeepAwake,
} from "expo-keep-awake";
import SoundPlayer from "react-native-sound-player";
import { Vibration } from "react-native";
import { AppState } from "react-native";
import KeepAwake from "expo-keep-awake";
import { Camera } from "expo-camera/legacy";
import { useFocusEffect } from "@react-navigation/native";
import LyricsModal from "./LyricsModal";
import { ChantsComponent } from "./ChantsComponent";
import CustomProgressBar from "./CustomProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAlldely } from "@/core/save";
import MIC from "../mic/App";
let appStateCheck = true;
const Discover = ({ navigation }) => {
  useKeepAwake();
  const [modalVisible, setModalVisible] = useState(false);
  const lyrics = "These are the lyrics of the song..."; // Replace with actual lyrics

  const {
    fetchEventData,
    events,
    chantAll,
    fetchNews,
    news,
    fetchChantEventsData,
    eventsChant,
    liveEvent,
    timerToStart,
    fetchDataShopCategories,
    fetchUserAllOrders,
    handleAddProductToOrder,
    fetchDataShopProducts,
    fetchActiveVideo,
    fetchGetUserRank,
    fetchgetAllChants,
    fetchGetUserPoints,
    liveEventId,
    clubInfo,
    fetchTime,
    currentTime,
    dataCategory,
    dataShop,
    setShowTabrik,
    showTabrik,
    setOrderItems,
    orderItems,
    userAllOrder,
  } = useContext(EventContext);
  const [dataS, setDataS] = useState([]);

  const { loadingSocket, handleReconnectSwich, isConnected } =
    useContext(SignalRContext);
  const addToOrder = useCallback(
    async (item) => {
      // setVisableAdd(true)
      if (orderItems?.length > 0) {
        setOrderItems(
          orderItems.map((re) =>
            re.id === item.id ? { ...re, flag: true } : re
          )
        );
      } else {
        setOrderItems(
          dataS.map((re) => (re.id === item.id ? { ...re, flag: true } : re))
        );
      }

      await handleAddProductToOrder(item.id);

      fetchUserAllOrders(1);
      // setVisableAdd(false)
      if (orderItems?.length > 0) {
        setOrderItems(
          orderItems.map((re) =>
            re.id === item.id ? { ...re, flag: false } : re
          )
        );
      } else {
        setOrderItems(
          dataS.map((re) => (re.id === item.id ? { ...re, flag: false } : re))
        );
      }
    },
    [dataShop, handleAddProductToOrder, fetchUserAllOrders, setOrderItems]
  );
  const ShopItem = ({ item, index }) => (
    <Card
      style={{
        padding: 10,
        backgroundColor: "#fff",
        height: 200,
        width: 150,
      }}
    >
      <View style={{ width: `100%`, alignItems: "center", height: `100%` }}>
        <McImage
          source={{ uri: item?.picture }}
          style={{
            width: 140,
            height: 100,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: `55%`,
            justifyContent: "space-between",
            paddingRight: 8,
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10,fontFamily:"Poppins-Black" }}>
              {item.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            width: `100%`,
            paddingLeft: 30,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold",fontFamily:"Poppins-Black" }}>
            ${item.price?.toFixed(2)}
          </Text>
          <Icon
            name={"pluscircleo"}
            color={Colors.platform.android.primary}
            size={30}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: 70,
          width: `100%`,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{ height: 70, width: `100%`, opacity: 0.9 }}
          onPress={() => {
            addToOrder(item);
          }}
        ></TouchableOpacity>
      </View>
    </Card>
  );
  const [tabrik, setTabrik] = useState(false);

  const ChantItem = ({ item, index }) => {
      

    const dataCheck = new Date(item.startTime).getTime() > new Date().getTime();
    return (
      <View
        style={{
          height: 50,
          width: `100%`,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <View style={{ width: `15%`, height: `100%`, justifyContent: "center" }}>
            <McText
              medium
              size={10}
              numberOfLines={5}
              color={"#000"}
            >
              {"."+new Date(item?.startTime).toUTCString()}
            </McText>
          </View>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginRight:10,
             
              backgroundColor: item?.userChantDone ? Colors.green400 : Colors.red400,
            }}
          >
            <Icon
              name={item?.userChantDone ? "check" : "close"}
              color={"#fff"}
            />
          </View> */}

        {dataCheck ? (
          <>
            <Card
              style={{
                flexDirection: "row",
                marginBottom: 8,
                justifyContent: "space-between",
                width: `70%`,
                height: 70,
                backgroundColor: Colors.platform.ios.warning,

                borderRadius: 15,
                padding: 8,
              }}
            >
              <View
                style={{ flexDirection: "row", width: 200, height: `100%` }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <McText
                    medium
                    size={14}
                    numberOfLines={2}
                    style={{ color: "#000" }}
                  >
                    {item.title}
                  </McText>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: -15,
                    backgroundColor: "#000",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <McText
                    medium
                    size={13}
                    numberOfLines={2}
                    style={{ color: "#fff" }}
                  >
                    {"Show Lyrics"}
                  </McText>
                </View>
              </View>
            </Card>
          </>
        ) : (
          <>
            {item?.userChantDone ? (
              <>
                <View
                  style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                    width: `40%`,
                    height: 40,
                    backgroundColor: item?.userChantDone
                      ? Colors.green400
                      : Colors.red400,

                    borderRadius: 15,
                    padding: 8,
                  }}
                >
                  <View
                    style={{ flexDirection: "row", width: 200, height: `100%` }}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      <McText
                        medium
                        size={14}
                        numberOfLines={2}
                        style={{ color: "#fff" }}
                      >
                        {item.title}
                      </McText>
                    </View>
                    {/* <View
                      onPress={()=>{setModalVisible(true)}}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: -15,
                          backgroundColor: "#000",
                          padding: 5,
                          borderRadius: 10,
                        }}
                      >
                        <McText
                          medium
                          size={13}
                          numberOfLines={2}
                          style={{ color: "#fff" }}
                        >
                          {"Show Lyrics"}
                        </McText>
                      </View> */}
                  </View>
                </View>
              </>
            ) : (
              <>
                <Card
                  style={{
                    flexDirection: "row",
                    marginBottom: 8,
                    justifyContent: "space-between",
                    width: `70%`,
                    height: 70,
                    backgroundColor: "#fff",

                    borderRadius: 15,
                    padding: 8,
                  }}
                >
                  <View
                    style={{ flexDirection: "row", width: 200, height: `100%` }}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      <McText
                        medium
                        size={14}
                        numberOfLines={2}
                        style={{ color: "#000" }}
                      >
                        {item.title}
                      </McText>
                    </View>
                    <View
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: -15,
                        backgroundColor: "#000",
                        padding: 5,
                        borderRadius: 10,
                      }}
                    >
                      <McText
                        medium
                        size={13}
                        numberOfLines={2}
                        style={{ color: "#fff" }}
                      >
                        {"Show Lyrics"}
                      </McText>
                    </View>
                  </View>
                </Card>
              </>
            )}
          </>
        )}
      </View>
    );
  };
  const vibrate = () => {
    if (Platform.OS === "ios") {
      // this logic works in android too. you could omit the else statement
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      // it will vibrate for 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };
  const [timeCheck, setTimeCheck] = useState("2023-08-17T06:02:27.5102539");
  useEffect(() => {
    fetchDataShopCategories();
  }, []);
  useEffect(() => {
    if (dataCategory?.length > 0) {
      fetchDataShopProducts(dataCategory[1].id);
    }
  }, [dataCategory]);


  useFocusEffect(
    React.useCallback(() => {


      // Do something when the screen gains focus
      setTimeout(() => {
        fetchChantEventsData();
      }, 2000);

      // Specify a cleanup function
      return () => {
        // Cleanup logic, if needed
      };
    }, [])
  );
  let flagEnterToIntsall = false;
  useEffect(() => {
    const runCalibration = async () => {
      try {
          
        // const result = await CalibrationModule.startCalibration();
          
      } catch (error) {
          
          
      }
    };


  }, []);
  useEffect(() => {
    fetchChantEventsData();

    enableKeepAwake();
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
    })();
  }, []);
  const enableKeepAwake = async () => {
    deactivateKeepAwake();
    await activateKeepAwakeAsync();
  };
  const handleAppStateChange = () => {
    enableKeepAwake();
    // startConnectionCheck();

    handleReconnectSwich();
  };
  const handleAppStateChangetest = (newState) => {
    if (newState === "active" && appStateCheck == false) {
      handleAppStateChange();
      appStateCheck = true;
      // App is in the foreground
    } else if (newState === "background") {
      appStateCheck = false;
      // App is in the background
    } else if (newState === "inactive") {
      // App is transitioning between foreground and background
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchTime();
    }, 10000);
  }, []);
  const _renderMatchesItem = ({ item, index }) => {
    let content;

    switch (item?.status) {
      case 1:
        content = <PendinghUi data={item} />;
        break;
      case 2:
        content = <PreStartUi data={item} />;
        break;

      case 4:
        content = <FinishUi data={item} />;
        break;
    }
    return (
      <>
        <TouchableOpacity

          onPress={() => {
            navigation.navigate("Information", {
              data: item,
            });
          }}
        >
          {content}

        </TouchableOpacity>
        {index > 3 ? (
          <View style={{
            position: "absolute", bottom: 50, right: 8, zIndex: 1,
            height: 50, width: 100
          }}>
            <Button
              onPress={() => navigation.navigate("AllListEventTsx")}
              textColor={Colors.platform.android.primary}
            >
              MORE
            </Button>
          </View>
        ) : null}
      </>
    );
  };
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [focusedNewsIndex, setFocusedNewsIndex] = useState(0);

  const itemWidth = Dimensions.get("window").width;
  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / (itemWidth - 50));
    setFocusedIndex(index);
  };
  const onScrollNews = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / (itemWidth - 30));
    setFocusedNewsIndex(index);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true, // This is mandatory for performance
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        width: `100%`,
        height: `100%`,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0], // Slide up from 50 units down
            }),
          },
        ],
      }}
    >
      <Container>
        {loadingSocket ? (
          <View
            style={{
              width: `100%`,
              height: `100%`,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffff",
            }}
          >
            <ActivityIndicator size={"large"} color="#000" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ backgroundColor: "#ffff" }}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            {/* Header Section */}

            <View style={{ marginTop: 0 }}>
              {liveEventId ? (
                <>
                  <LiveEventUi data={liveEvent} />
                  <View
                    style={{
                      width: `100%`,
                      height: 50,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 15,
                      top: 15,
                      position: "absolute",
                    }}
                  >
                    {/* <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("OrderScreen");
                      }}
                    >
                      <ImageBackground
                        source={require("../../../assets/Group 1114.png")}
                        style={{ width: 50, height: 50 }}
                      >
                        {userAllOrder > 0 && (
                          <>
                            <View
                              style={{
                                position: "absolute",

                                backgroundColor: COLORS.red,
                                borderRadius: 25,
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  textAlign: "center",
                                  fontSize: 8,
                                  fontFamily:"Poppins-Black"
                                }}
                              >
                                {userAllOrder}
                              </Text>
                            </View>
                          </>
                        )}
                      </ImageBackground>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{
                        borderRadius: 8,
                        width: 120,
                        height: 40,
                        backgroundColor: Colors.platform.android.primary,
                        alignItems: "center",
                        justifyContent: 'center'
                      }}
                      onPress={() => {

                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: 'black',fontFamily:"Poppins-Black" }}>{"Commentator"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                    >
                      <Image
                        source={require("../../../assets/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg")}
                        style={{ width: 50, height: 50,
                          borderRadius:10
                         }}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: `100%`,
                      height: 50,
                      marginTop: 15,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 15,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("OrderScreen");
                      }}
                    >
                      <Image
                        source={require("../../../assets/Group 1114.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </TouchableOpacity>
                    <Image
                      source={require("../../../assets/LogoSmart.png")}
                      style={{ width: 50, height: 50 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                    >
                      <Image
                        source={require("../../../assets/Ellipse 369.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 25 }} />
                  <FlatList
                    keyExtractor={(item, index) =>
                      "_match" + item.title + index
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{}}
                    data={events?.slice(0, 5)}
                    onScroll={onScroll}
                    pagingEnabled={true}
                    renderItem={_renderMatchesItem}
                  ></FlatList>
                  <View style={{ height: 50 }} />

                  <View style={{ width: `100%`, alignItems: "center" }}>
                    <PageIndicator
                      style={{
                        bottom: 50,
                      }}
                      color={"#000"}
                      count={4}
                      current={focusedIndex}
                    />
                  </View>
                </>
              )}
            </View>

            {/* News Section */}
            {liveEventId ? (
              <>
                <View
                  style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundColor: "#fff",
                    alignSelf: "center",

                    bottom: 25,
                  }}
                >
                  <CustomProgressBar progress={0.1} data={eventsChant} />


                  <Header2Section>
                    {/* <McText weight="bold" size={20} color="#000">
                      Latest Chants
                    </McText> */}
                    <McText
                      semi
                      size={9}
                      color="#fff
            "
                    >

                    </McText>
                  </Header2Section>
                  <View style={{ height: 6 * 75 }}>
                    <ChantsComponent da={eventsChant} />
                  </View>
                  {/* <View style={{ padding: 15 }}>
                  {eventsChant?.map((item, index) => {
                    if (index < 4) {
                      return (
                        <>
                          <View>
                            <ChantItem item={item} index={index} />
                          </View>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                </View> */}
                  {/* <Image
                    source={require("../../../assets/sda.png")}
                    style={{ width: `100%`, height: 211 }}
                    resizeMode="contain"
                  /> */}
                  <Header2Section>
                    <McText semi size={20} color="#000">
                      News
                    </McText>
                    <TouchableOpacity
                      activeOpacity={0.1}
                      onPress={() => {
                        navigation.navigate("AllNews");
                      }}
                      style={{
                        height: 48,
                        width: 100,
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        paddingTop: 15,
                        right: 10,
                      }}
                    >
                      <McText
                        semi
                        size={10}
                        color="#000
            "
                      >
                        VIEW ALL
                      </McText>
                    </TouchableOpacity>
                  </Header2Section>
                  <View>
                    <FlatList
                      keyExtractor={(item) => "_news" + item.title}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{}}
                      onScroll={onScrollNews}
                      pagingEnabled={true}
                      data={news?.slice(0, 5)}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("ArticleDetail", {
                              data: item,
                            });
                          }}
                          style={{
                            width: widthFull,
                            height: 250,

                            padding: 10,
                          }}
                        >
                          <NewsItem item={item} />
                        </TouchableOpacity>
                      )}
                    ></FlatList>
                    <View style={{ height: 10 }} />
                    <View style={{ width: `100%`, alignItems: "center" }}>
                      <PageIndicator
                        style={{
                          bottom: 50,
                        }}
                        color={"#000"}
                        count={5}
                        current={focusedNewsIndex}
                      />
                    </View>
                  </View>
                  {/* <ImageBackground
                    source={require("../../../assets/cardFood.png")}
                    style={{
                      width: widthFull - 30,
                      height: 145,
                      alignSelf: "center",
                    }}
                    resizeMode="contain"
                  >
                    <TouchableOpacity
                      style={{ width: `100%`, height: `100%` }}
                      onPress={() => {
                        navigation.navigate("Standings");
                      }}
                    ></TouchableOpacity>
                  </ImageBackground> */}
                </View>
              </>
            ) : (
              <>
                {/* <ImageBackground
                  source={require("../../../assets/guessCard.png")}
                  style={{
                    width: widthFull - 30,
                    height: 145,
                    alignSelf: "center",
                  }}
                  resizeMode="contain"
                >
                  <TouchableOpacity
                    style={{ width: `100%`, height: `100%` }}
                    onPress={() => {
                      navigation.navigate("Guess");
                    }}
                  ></TouchableOpacity>
                </ImageBackground> */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{}}
                  onScroll={onScrollNews}
                  pagingEnabled={true}
                  data={[1, 2, 3]}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ArticleDetail", {
                          data: item,
                        });
                      }}
                      style={{
                        width: 180,
                        height: 220,

                        padding: 10,
                      }}
                    >
                      {/* <ImageBackground
                        source={require("../../../assets/cardTishrt.png")}
                        style={{
                          width: 170,
                          height: 215,
                          alignSelf: "center",
                          paddingTop: 8,
                        }}
                        resizeMode="contain"
                      >
                        <Image
                          source={require("../../../assets/t1.png")}
                          style={{
                            width: 147,
                            height: 114,
                            alignSelf: "center",
                          }}
                          resizeMode="contain"
                        />
                      </ImageBackground> */}
                    </TouchableOpacity>
                  )}
                ></FlatList>
                {/* <ImageBackground
                  source={require("../../../assets/cardFood.png")}
                  style={{
                    width: widthFull - 30,
                    height: 145,
                    alignSelf: "center",
                  }}
                  resizeMode="contain"
                >
                  <TouchableOpacity
                    style={{ width: `100%`, height: `100%` }}
                    onPress={() => {
                      navigation.navigate("Standings");
                    }}
                  ></TouchableOpacity>
                </ImageBackground> */}
                {/* <Card
                  style={{
                    width: `95%`,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingTop: 10,
                    height: 150,
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: `100%`,
                      height: `100%`,
                    }}
                  >
                    <Image
                      source={{ uri: clubInfo?.logoUrl }}
                      style={{ width: 110, height: 130, borderRadius: 15 }}
                    />
                    <View>
                      <McText semi size={18} color="#000">
                        {clubInfo?.name}
                      </McText>
                      <View style={{ marginTop: 50 }} />
                      <Button
                        mode="outlined"
                        onPress={() => {
                          navigation.navigate("Standings");
                        }}
                        style={{ backgroundColor: "#000" }}
                      >
                        <McText semi size={18} color="#fff">
                          {"GO TO SHOP"}
                        </McText>
                      </Button>
                    </View>
                  </View>
                </Card> */}
                <Header2Section>
                  <McText semi size={20} color="#000">
                    Latest News
                  </McText>
                  <TouchableOpacity
                    activeOpacity={0.1}
                    onPress={() => {
                      navigation.navigate("AllNews");
                    }}
                    style={{
                      height: 48,
                      width: 100,
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      paddingTop: 15,
                      right: 10,
                    }}
                  >
                    <McText
                      semi
                      size={10}
                      color="#000
            "
                    >
                      VIEW ALL
                    </McText>
                  </TouchableOpacity>
                </Header2Section>
                <View>
                  <FlatList
                    keyExtractor={(item) => "_news" + item.title}
                    onScroll={onScrollNews}
                    data={news?.slice(0, 5)}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("ArticleDetail", {
                            data: item,
                          });
                        }}
                        style={{
                          width: widthFull,
                          height: 110,

                          padding: 10,
                        }}
                      >
                        <NewsItemTwo item={item} />
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </View>
              </>
            )}

            {/* <View style={{marginTop: 100}}></View> */}
          </ScrollView>
        )}
        {/* <View
        style={{
          height: 100,
          position: "absolute",
          top: 10,
          right: 40,
          flexDirection: "row",
        }}
      >
        <McText semi size={9} color="#fff">
          {isConnected ? "ONLINE  " : " Check Internet"}
        </McText>
        {isConnected ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: Colors.green400,
            }}
          />
        ) : (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: Colors.red400,
            }}
          />
        )}
      </View> */}
      </Container>
      <Modal visible={showTabrik} transparent>
        <View
          style={{
            width: `100%`,
            height: `100%`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <ImageBackground
            style={{ width: widthFull, height: 250 }}
            resizeMode="contain"
            source={require("../../../assets/carolo.png")}
          >
            <TouchableOpacity
              style={{ width: `100%`, height: `100%` }}
              onPress={() => {
                setShowTabrik(false)

              }}
            ></TouchableOpacity>
          </ImageBackground> */}
        </View>
      </Modal>
      <MIC/>
    </Animated.View>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;

  background-color: #fafafa;
`;
const HeaderSection = styled.View`
  height: 30px;
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Header2Section = styled.View`
  height: 30px;
  margin: 23px 16px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BannerSection = styled.View`
  height: 200px;
  margin: 25px 16px 0px;
  /* background: red; */
`;

const TeamItemBox = styled.View`
  width: 70px;
  height: 65px;
  border-radius: 10px;
  background-color: #222232;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const BigTeamLogo = styled.Image`
  width: 50px;
  height: 55px;
`;
const MatchItemBox = styled.View`
  width: 150px;
  border-radius: 10px;
  background-color: #222232;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background-color: ${(props) => Colors.purpleA400};
`;
const MediumTeamLogo = styled.Image`
  width: 40px;
  height: 43px;
`;
export default Discover;
