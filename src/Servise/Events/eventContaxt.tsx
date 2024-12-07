import React, { createContext, useEffect, useState } from "react";
import TeamsService, { getUserRank } from "./eventServise";
import { event } from "react-native-reanimated";
import ntpSync from "@ruanitto/react-native-ntp-sync";
import { calculatePoints } from "../../core/CalculatePoints";

import { getUser } from "../../core/save";
import axios from "axios";
import moment from "moment";
// Create the context
type MyContextProviderProps = {
  children: React.ReactNode;
};

const EventContext = createContext({ events: [] });
// Create a context provider component
const EventContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [refreshing, setRefreshing] = useState(true);
  const [showTabrik, setShowTabrik] = useState(false);

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [liveEventId, setLiveEventId] = useState(0);
  const [allPoint, setAllPoint] = useState(0);
  const [lodingOredr, setLodingOredr] = useState(false);
  const [userAllPoint, setUserAllPoint] = useState(0);
  const [addressChecked, setAddressChecked] = useState(true);
  const [userAllOrder, setUserAllOrder] = useState(0);

  const [events, setEvents] = useState([1, 2, 3]);
  const [eventsChant, setEventsChant] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [runOrder, setRunOorder] = useState(false);

  const [orders, setOrders] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [news, setNews] = useState();
  const [video, setVideos] = useState();
  const [clubInfo, setClubInfo] = useState();
  const [dataShop, setDataShop] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [chantAll, setChantAll] = useState([]);
  const [dataUserRank, setDataUserRank] = useState([]);

  const [dataUser, setDataUser] = useState([]);
  
  const [chantContentOffline, setChantContentOffline] = useState({
    chantId: 105,
    chantStatus: 3,
    chantTypeColor: "#fdfd63",
    chantTypeFileUrl:
      "https://www.pngall.com/wp-content/uploads/4/Golden-Cup.png",
    chantTypeId: 1,
    chant_Audio_List: [],
    chant_Lyric_List: [{ startTime_ms: 0 }],
    chant_Vibrate_List: [],
    chant_Light_List: [],
    countDownStartTime: "2023-12-19T16:33:24.276+00:00",
    duration_MSC: 40000,
    eventChantId: 221,
    eventId: 2067,
    isActive: true,
    point: 100,
    repeatCount: 1,
    startTime: "2023-12-19T16:33:54.818+00:00",
    title: "Ole ole ole",
    totalDuration_ms: 40000,
    userChantDone: false,
    userChantLike: false,
  });
  const [chantContent, setChantContent] = useState({
    chantId: 105,
    chantStatus: 3,
    chantTypeColor: "#fdfd63",
    chantTypeFileUrl:
      "https://www.pngall.com/wp-content/uploads/4/Golden-Cup.png",
    chantTypeId: 1,
    chant_Audio_List: [{ fileUrl: "" }],
    chant_Lyric_List: [{ startTime_ms: 0 }],
    chant_Vibrate_List: [],
    chant_Light_List: [],
    countDownStartTime: "2023-12-19T16:33:24.276+00:00",
    duration_MSC: 40000,
    eventChantId: 221,
    eventId: 2067,
    isActive: true,
    point: 100,
    repeatCount: 1,
    startTime: "2023-12-19T16:33:54.818+00:00",
    title: "Ole ole ole",
    totalDuration_ms: 40000,
    userChantDone: false,
    userChantLike: false,
  });
  const [chantContentLive, setChantContentLive] = useState([]);
  const [liveEvent, setLiveEvent] = useState([]);
  const [timer, setTimer] = useState(20000);
  const [timerToStart, setTimerToStart] = useState(20000);
  const [userID, setUserID] = useState(0);
  const [deliverWithoutAddressChecked, setDeliverWithoutAddressChecked] =
    useState(false);
  const [flagEnterScreen, setFlagEnterScreen] = useState(true);

  const [remainingMilliseconds, setRemainingMilliseconds] = useState(0);
  const [onBoarding, setOnBoarding] = useState([
    {
      title: "",
      subtitle: "",
      imageUri: "",
      showHeader: false,
    },
    {
      title: "",
      subtitle: "",
      imageUri: "",
      showHeader: false,
    },
  ]);

  const currentDate = new Date();

  useEffect(() => {
    fetchOnBoarding();
    getUser().then((res) => {
      if (res != null) {
        setUserID(res);
      }
    });
    return null;
  }, []);
  async function fnSetUserID() {
    return getUser().then((res) => {
      if (res != null) {
        setUserID(res);
        return res;
      }
      return 0 + "";
    });
  }
  function dateDiffInDays(date) {
    const timeDiff = date.getTime() - currentDate.getTime();
    return Math.abs(Math.floor(timeDiff / (1000 * 3600 * 24)));
  }
  const findItemByStatus = (data: any[], targetStatus: number) => {
    const live = data.find((item: { status: any }) => item.id === targetStatus);

    if (!live) {
      // If no item with status 4 exists, add a new item with status "Pending"
    } else {
      setLiveEvent(live);
    }
  };
  let idEvent;
  const fetchEventData = async () => {
    const { liveEventId, events } = await TeamsService.fetchEvents(
      "abcdefg",
      await fnSetUserID()
    );

    if (liveEventId != null) {
      findItemByStatus(events, liveEventId);

      setLiveEventId(liveEventId);
    }

    const customSort = (a, b) => {
      if (a.status === 2 && b.status !== 2) {
        return -1; // 'a' comes before 'b'
      } else if (a.status !== 2 && b.status === 2) {
        return 1; // 'b' comes before 'a'
      } else if (a.status === 1 && b.status !== 1) {
        return -1; // 'a' comes before 'b'
      } else if (a.status !== 1 && b.status === 1) {
        return 1; // 'b' comes before 'a'
      } else {
        return 0; // مقایسه‌ی عادی برای سایر حالت‌ها
      }
    };

    // Sort the flatlist using the custom sorting function
    const sortedFlatlets = events?.sort(customSort);

    setEvents(sortedFlatlets);
    setLoading(false);
    idEvent = liveEventId;
  };
  const fetchgetAllChants = async () => {
    setLoading(true);

    setRefreshing(true);
    try {
      const dataContent = await TeamsService.getAllChants(
        "abcdefg",
        await fnSetUserID(),
        ""
      );

      if (dataContent) {
        setChantAll(dataContent);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setRefreshing(false);
  };
  const fetchgetChantContentOffline = async (id: string, ide: string) => {
    // setLoading(true);
    setChantContentOffline(null);
    try {
      const dataContent = await TeamsService.getChantContent(
        "abcdefg",
        await fnSetUserID(),
        id,
        ide
      );
    
      setChantContentOffline(dataContent);
      // setLoading(false);
      return dataContent;
    } catch (error) {
      // setLoading(false);
      console.error(error);
      return null;
    }
  };
  const fetchgetChantContent = async (id: string, ide: string) => {
    setLoading(true);
    // setChantContent(null);
    const dateRe = new Date().getTime();
    try {
      const dataContent = await TeamsService.getChantContent(
        "abcdefg",
        await fnSetUserID(),
        id,
        ide
      );
      if (
        dataContent?.chant_Lyric_List?.length > 1 ||
        dataContent?.chant_Vibrate_List?.length > 1 ||
        dataContent?.chant_Light_List?.length > 1
      ) {
        setChantContent(dataContent);
      }
      if (dataContent) {
        const dateFinished = new Date().getTime();
        const timeDifference = dateFinished - dateRe;
        setRemainingMilliseconds(timeDifference);

        if (dataContent?.chant_Audio_List?.length == 0) {
          fetchgetChantContent(id, ide);
        }
      }
      setLoading(false);
      return dataContent;
    } catch (error) {
      setLoading(false);
      console.error(error);
      return null;
    }
  };
  const fetchChantEventsData = async () => {
    const chantEvents = await TeamsService.fetchChantEvents(
      "abcdefg",
      await fnSetUserID(),
      "1364"
    );
    const chantSort = chantEvents.sort((a, b) => {
      const startTimeA = new Date(a?.startTime);
      const startTimeB = new Date(b?.startTime);

      // Compare the startTime values
      if (startTimeA > startTimeB) {
        return -1; // a should come before b
      } else if (startTimeA < startTimeB) {
        return 1; // b should come before a
      } else {
        return 0; // They have the same startTime, no need to change their order
      }
    });

    setEventsChant(chantSort);
    setLoading(false);

    // Check if data exists
    if (chantEvents.length > 0) {
      let closest = chantEvents[0].startTime;

      var options = { server: "0.pool.ntp.org", port: 123 };

      // create a new instance
      var clock = (ntp = new ntpSync(options));

      // get the current unix timestamp
      var currentTime = clock.getTime();
      let minDifference = Math.abs(new Date(closest).getTime() - currentTime);

      for (let i = 1; i < chantEvents.length; i++) {
        const current = chantEvents[i].startTime + 8000;
        const difference = Math.abs(new Date(current).getTime() - currentTime);

        if (current > currentTime && difference < minDifference) {
          closest = current;
          minDifference = difference;
        }
      }
      const now = chantEvents.find((dateObj) => dateObj.startTime === closest);

      setChantContentLive(now);
      setHasData(true);

      const liv = await fetchgetChantContent(now?.chantId, now?.eventId);
      const [totalPoints, userPoints] = calculatePoints(chantEvents);

      setAllPoint(totalPoints);
      setUserAllPoint(userPoints);
      return liv;
    }
  };
  const fetchGetUserRank = async () => {
    setLoading(true);

    try {
      const dataContent = await getUserRank("abcdefg", await fnSetUserID());

      if (dataContent) {
        setDataUser(dataContent?.user);

        setDataUserRank(dataContent?.rankList);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchDataShopCategories = async () => {
    setLoading(true);

    try {
      const dataContent = await TeamsService.getShopCategories(
        "abcdefg",
        await fnSetUserID(),
        "3"
      );

      if (dataContent) {
        setDataCategory(dataContent);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchDataShopProducts = async (id: number) => {
    setLoading(true);

    try {
      const dataContent = await TeamsService.getShopProducts(
        "abcdefg",
        await fnSetUserID(),
        "3",
        id + "",
        ""
      );

      if (dataContent) {
        var res = dataContent.map((re) => {
          return { ...re, flag: false };
        });
        setDataShop(res);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchShopProductInfo = async (productId: string | Blob) => {
    try {
      setLoading(true);

      const dataContent = await TeamsService.getShopProductInfo(
        "clubToken",
        "userId",
        "shopId",
        productId
      );

      if (dataContent) {
        setData(dataContent);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchUserAllOrders = async (id: number) => {
    try {
      if (!runOrder) {
        setRunOorder(true);

        const dataContent = await TeamsService.getUserAllOrders(
          "abcdefg",
          await fnSetUserID(),
          "3",
          id + ""
        );

        if (dataContent) {
          setOrders(dataContent[0]);
          var res = dataContent[0]?.orderDeatil?.map((re) => {
            return { ...re, flag: false };
          });
          setOrderItems(res);

          setUserAllOrder(
            dataContent[0]?.orderDeatil?.reduce(
              (total, item) => total + item.count,
              0
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
    setRunOorder(false);
  };
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);

      const dataContent = await TeamsService.getOrderDetail(
        "clubToken",
        "userId",
        "shopId",
        "orderId"
      );

      if (dataContent) {
        setOrderDetail(dataContent);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const handleAddProductToOrder = async (id: number) => {
    try {
      setLodingOredr(true);

      setUserAllOrder(userAllOrder + 1);
      const dataContent = await TeamsService.addProductInUserOrder(
        "abcdefg",
        await fnSetUserID(),
        "3",
        id + ""
      );
      fetchUserAllOrders(1);
      if (dataContent) {
        // Handle the response as needed
      }
    } catch (error) {
      console.error(error);
    }

    setLodingOredr(false);
  };
  const handleRemoveProductFromOrder = async (id: number) => {
    try {
      setLodingOredr(true);
      setUserAllOrder(userAllOrder - 1);
      const dataContent = await TeamsService.removeProductFromUserOrder(
        "abcdefg",
        await fnSetUserID(),
        "3",
        id + ""
      );
      fetchUserAllOrders(1);
      if (dataContent) {
        // Handle the response as needed
      }
    } catch (error) {
      console.error(error);
    }

    setLodingOredr(false);
  };
  const handleSetOrderAddress = async () => {
    try {
      setLoading(true);

      const dataContent = await TeamsService.setOrderAddress(
        "clubToken",
        "userId",
        "shopId",
        "orderId",
        "deliverType",
        "address"
      );

      if (dataContent) {
        // Handle the response as needed
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const handleEditUserProfile = async () => {
    try {
      setLoading(true);

      const user = await TeamsService.editUserProfile(
        "clubToken",
        "userId",
        "file"
      );

      if (user) {
        // Handle the updated user data as needed
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchNews = async () => {
    try {
      setLoading(true);

      const news = await TeamsService.getAllNews(
        "abcdefg",
        await fnSetUserID(),
        ""
      );
      if (news.length > 0) {
        // Handle the retrieved news data as needed

        setNews(news);
      }
    } catch (error) {
        
    }

    setLoading(false);
  };
  const fetchActiveVideo = async () => {
    try {
      setLoading(true);

      const video = await TeamsService.getActiveVideo(
        "abcdefg",
        await fnSetUserID(),
        ""
      );

      if (video.length > 0) {
        // Handle the retrieved news data as needed
          
        setVideos(video);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const handleVideoUpload = async (
    title: string | Blob,
    description: string | Blob,
    videoFile: string | Blob
  ) => {
    try {
      setLoading(true);

      const success = await TeamsService.addVideo(
        "abcdefg",
        await fnSetUserID(),
        title,
        description,
        "tags",
        videoFile
      );

      if (success) {
        // Video upload successful
          
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchSetUserChantLog = async (
    chantId: any,
    EventChantId: any,
    like: any
  ) => {
    try {
      setLoading(true);

      const success = await TeamsService.SetUserChantLog(
        "abcdefg",
        await fnSetUserID(),
        chantContentLive?.chantId,
        chantContentLive?.eventChantId,
        like
      );

      if (success) {
        // Video upload successful
          
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchOnBoarding = async () => {
    try {
      setLoading(true);

      const dataContent = await TeamsService.Club_OnBoarding("abcdefg");

      if (dataContent) {
        // Video upload successful
        const convertedData = dataContent.map((item) => ({
          title: item.title,
          subtitle: item.description,
          imageUri: item.pictureUrl,
          showHeader: false,
        }));
        setOnBoarding(convertedData);
        // Now the 'convertedData' array will contain the converted objects
        //   
          
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchGetUserPoints = async () => {
    try {
      setLoading(true);

      const success = await TeamsService.GetUserPoints(
        "abcdefg",
        await fnSetUserID()
      );
        
        
        
      if (success) {
        // Video upload successful
          
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const fetchClubInfo = async () => {
    try {
      setLoading(true);

      const success = await TeamsService.getClubInfo(
        "abcdefg",
        await fnSetUserID()
      );

      if (success) {
        setClubInfo(success[0]);
        // Video upload successful
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const [currentTime, setCurrentTime] = useState("");

  const fetchTime = async () => {
    try {
      const startTime = new Date();

      const response = await axios.get(
        `https://timeapi.io/api/Time/current/zone?timeZone=GMT`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      const endTime = new Date();

      setCurrentTime(response.data.dateTime);
      return response.data.dateTime;
    } catch (error) {
      console.error("Error fetching time:", error);
      return "";
    }
  };
  return (
    <EventContext.Provider
      value={{
        fetchTime,
        currentTime,
        fetchOnBoarding,
        fetchClubInfo,
        clubInfo,
        chantAll,
        fetchgetAllChants,
        fetchGetUserPoints,
        fetchSetUserChantLog,
        dataUser,
        dataUserRank,
        fetchGetUserRank,
        setOrders,
        orders,
        fetchUserAllOrders,
        handleAddProductToOrder,
        orderItems,
        setOrderItems,
        dataShop,
        dataCategory,
        fetchDataShopCategories,
        fetchDataShopProducts,
        video,
        fetchActiveVideo,
        fetchEventData,
        events,
        news,
        fetchNews,
        handleVideoUpload,
        fetchgetChantContent,
        chantContent,
        fetchChantEventsData,
        eventsChant,
        timer,
        setTimer,
        liveEvent,
        liveEventId,
        handleRemoveProductFromOrder,
        setTimerToStart,
        timerToStart,
        liveEventId,
        setDataShop,
        chantContentLive,
        allPoint,
        lodingOredr,
        userAllPoint,
        fnSetUserID,
        onBoarding,
        setAddressChecked,
        addressChecked,
        deliverWithoutAddressChecked,
        setDeliverWithoutAddressChecked,
        userAllOrder,
        refreshing,
        remainingMilliseconds,
        flagEnterScreen,
        setFlagEnterScreen,
        fetchgetChantContentOffline,
        chantContentOffline,
        showTabrik, setShowTabrik
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventContextProvider };
