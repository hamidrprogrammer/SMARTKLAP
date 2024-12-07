import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, TouchableOpacity } from "react-native";
import { Text, Dimensions } from "react-native";
import {
  DataTable,
  Title,
  Caption,
  ToggleButton,
  Avatar,
  Card,
  ActivityIndicator,
  Button,
} from "react-native-paper";
// import Torch from "react-native-torch";
import { ScrollView, View, StyleSheet } from "react-native";

import { Colors } from "../../Constants";
import Icon from "react-native-vector-icons/AntDesign";
import LyricsModal from "./LyricsModal";
import { EventContext } from "../../Servise/Events/eventContaxt";
const EventItem = ({ minute, playerName, eventType, color, point }) => {
  return (
    <View style={styles.eventItem}>
      <View style={styles.viewPlayerName}>
        <View
          style={{
            width: 35,
            height: 35,
            borderColor: Colors.black,
            borderWidth: 0.5,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: Colors.red400,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="close" color={"#fff"} size={18} />
          </View>
        </View>
        <View style={{ left: 15 }}>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text
            style={{ fontSize: 12, color: "#000" }}
          >{`You've lost ${point} point`}</Text>
        </View>
      </View>
      <View style={[styles.indicator]}>
        <Text style={styles.minute}>
          {" "}
         
        </Text>
        <DashedBorder
          width={200}
          height={8}
          dashWidth={1}
          dashGap={2}
          color="black"
        />
      </View>
    </View>
  );
};
const EventItemYellow = ({ minute, playerName, eventType, color, point }) => {
  return (
    <View style={styles.eventItem}>
      <View style={[styles.viewPlayerName, { borderColor: Colors.yellow700 }]}>
        <View
          style={{
            width: 35,
            height: 35,
            borderColor: Colors.black,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/coins.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ left: 15 }}>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text
            style={{ fontSize: 12, color: "#000" }}
          >{`you can get ${point} point`}</Text>
        </View>
      </View>
      <View style={[styles.indicator]}>
        <Text style={styles.minute}>
          {" "}
          
        </Text>
        <DashedBorder
          width={200}
          height={8}
          dashWidth={1}
          dashGap={2}
          color="black"
        />
      </View>
    </View>
  );
};
const EventItemRevers = ({ minute, playerName, eventType, color, point }) => {
  return (
    <View style={styles.eventItem}>
      <View style={styles.viewPlayerNameLeft}>
        <View
          style={{
            width: 35,
            height: 35,
            borderColor: Colors.black,
            borderWidth: 0.5,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: Colors.green300,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="check" color={"#fff"} size={18} />
          </View>
        </View>
        <View style={{ left: 15 }}>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text
            style={{ fontSize: 12, color: "#000" }}
          >{`You've gotten ${point} point`}</Text>
        </View>
      </View>
      <View style={[styles.indicator]}>
        <Text style={styles.minute}>
          {" "}
          
          
        </Text>
        <DashedBorder
          width={200}
          height={8}
          dashWidth={1}
          dashGap={2}
          color="black"
        />
      </View>
    </View>
  );
};
const Timeline = ({ data }) => {
  const tenMinutesFromNow = new Date();
  tenMinutesFromNow.setMinutes(tenMinutesFromNow.getMinutes() + 10);
    
  
  
  return (
    <View style={styles.container}>
      {data?.slice(0, 5)?.map((item, index) => {
        const dataCheckNow =
        new Date(item.startTime).getTime() > new Date().getTime();
          
      
        if (item?.userChantDone) {
          if ( dataCheckNow) {
            return (
              <EventItemYellow
                minute={item.startTime}
                playerName={item.title}
                point={item.point}
                eventType="card"
                color="red"
              />
            );
          } else {
          return (
            <EventItemRevers
              minute={item.startTime}
              playerName={item.title}
              point={item.point}
              eventType="card"
              color="red"
            />
          );
        }
        } else {
          if ( dataCheckNow) {
            return (
              <EventItemYellow
                minute={item.startTime}
                playerName={item.title}
                point={item.point}
                eventType="card"
                color="red"
              />
            );
          } else {
            return (
              <EventItem
                minute={item.startTime}
                playerName={item.title}
                point={item.point}
                eventType="card"
                color="red"
              />
            );
          }
        }
      })}
    </View>
  );
};

const DashedBorder = ({ width, height, dashWidth, dashGap, color }) => {
  // Calculate the number of dashes based on the width and the dash width
  const numberOfDashes = Math.floor(width / (dashWidth + dashGap));
  const dashes = Array.from(Array(10)).map((_, index) => (
    // Create individual dashed lines with appropriate position and styling
    <View
      key={index}
      style={[
        styles.dashedLine,
        {
          borderRightWidth: 0,
          marginTop: 2,
          borderColor: "#fff",
        },
      ]}
    />
  ));

  return <View style={{ width: 10, height: 65 }}>{""}</View>;
};

const styles = StyleSheet.create({
  dashedLine: {
    flex: 1,
    height: "100%",
    borderStyle: "solid",
  },
  container: {
    alignItems: "center",
  },
  verticalLine: {
    height: 50,
    width: 2,
    borderWidth: 0.5,
    borderStyle: "dotted",
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventItemGreen: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 20,
  },
  minute: {
    width: 80,
    textAlign: "center",
    color: "#fff",
    fontSize:0
    // other styling
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    // other styling
  },
  substitution: {
    // styling for substitution icon
  },
  indicator: {
    marginLeft: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    // other styling
  },
  viewPlayerName: {
    flexDirection: "row",
    alignItems: "center",

    // styling
    position: "absolute",
    left: -50,
   
    width: 280,
    padding: 10,
    height: 50,
    borderRadius: 18,
    borderWidth: 0.3,
    borderColor: Colors.red700,
  },
  viewPlayerNameLeft: {
    // styling
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",

    width: 280,
    right: -60,
    height: 50,
 
    padding: 10,
    borderRadius: 18,
    borderWidth: 0.3,
    borderColor: Colors.green900,
  },
  playerName: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Poppins-Black",
    // styling
    color: "#000",
  },
});
export const ChantsComponent = ({ da, pageNumber, setPage, isActive }) => {
  const [columns, setColumns] = useState([
    // {
    //   width: 40,
    //   key: "chantTypeFileUrl",
    //   sortable: true,
    //   title: "Type",
    //   render: (data) => (
    //     <TouchableOpacity onPress={() =>   
    //       <Avatar.Image source={{ uri: data.chantTypeFileUrl }} size={24} />
    //     </TouchableOpacity>
    //   ),
    // },
    {
      width: 220,
      key: "title",
      sortable: true,
      title: "Name Chant",
      render: (data) => (
        <TouchableOpacity onPress={() => console.log("Link pressed")}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Poppins-Black",
            }}
          >
            <Text>#</Text>
            {data.title}
          </Text>
        </TouchableOpacity>
      ),
    },
    {
      sortable: true,
      key: "startTime",
      dataIndex: "startTime",
      title: "Start Time",
      width: Dimensions.get("screen").width - 280,
      render: (data) => (
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "Poppins-Black",
            }}
          >
            {String(new Date(data.startTime).getHours()).padStart(2, "0") +
              ":" +
              String(new Date(data.startTime).getMinutes()).padStart(2, "0") +
              ":" +
              String(new Date(data.startTime).getSeconds()).padStart(2, "0")}
          </Text>
        </View>
      ),
    },

    // {
    //   width: 120,
    //   sortable: true,
    //   key: "userChantDone",
    //   dataIndex: "userChantDone",
    //   title: "Is Check",
    //   render: (data) => (
    //     <View
    //       style={{
    //         flexDirection: "column",
    //         backgroundColor: data?.userChantDone
    //           ? Colors.green400
    //           : Colors.red400,
    //         width: 20,
    //         height: 20,
    //         borderRadius: 20,
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Icon name={data?.userChantDone ? "check" : "close"} color={"#fff"} />
    //     </View>
    //   ),
    // },

    // {
    //   key: 'payment_status',
    //   dataIndex: 'payment_status',
    //   title: t('Field.PaymentStatus'),
    //   render: (data: string) => (data ? t('Enum.'.concat(data)) : '-'),
    // },
  ]);
  const from = 0; // Replace with the appropriate initialization
  const to = da?.length; // Assuming `to` is defined somewhere as well
    
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { fetchChantEventsData } = useContext(EventContext);
  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => fadeInOut()); // Repeat the animation
    };

    fadeInOut();

    return () => fadeAnim.setValue(0); // Reset the animation value when component unmounts
  }, [fadeAnim]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lyrics, setLyricse] = useState([]);
  useEffect(() => {
    fetchChantEventsData();
    const fadeInOut = async () => {
      const cameraAllowed = await Torch.requestCameraPermission(
        "Camera Permissions", // dialog title
        "We require camera permissions to use the torch on the back of your phone." // dialog body
      );
      if (cameraAllowed && Platform.OS != "ios") {
        // Torch.switchState(false);
      }
    };
    fadeInOut();
  }, []);
  return (
    <>
      <Timeline data={da} />

      <LyricsModal
        lyrics={lyrics}
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};
