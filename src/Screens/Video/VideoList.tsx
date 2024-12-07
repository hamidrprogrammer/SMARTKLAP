import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { EventContext } from "../../Servise/Events/eventContaxt";
import { Colors } from "../../Constants";
import { Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { VideoPlay } from "./VideoPlay";
import { McText } from "../../Components";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useData } from "@/hooks";

const VideoItem = ({ item }) => {
  const handleLike = () => {
    // Handle the like action here
  };

  const handleView = () => {
    // Handle the view action here
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleView}>
      <Image source={{ uri: item.FileUrl }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.description}>{item.Description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{item.SeenCount} views</Text>
          <Text style={styles.infoText}>{item.LikeCount} likes</Text>
        </View>
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeText}>
            {item.HasLike ? "Unlike" : "Like"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

function TodoList({ item, index, navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: index * 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  const [day, month, year, time] = item?.insertTime.split(" ");
  const [hour, minute] = time.split(":");

  let datString;
  if (day < 10) {
    datString = "0" + day;
  } else {
    datString = day;
  }

  return (
    <Card style={{ backgroundColor: "#ffff", marginBottom: 10, margin: 10 }}
      contentStyle={{ backgroundColor: "#ffff", borderRadius: 15 }}>
      <View style={styles.mainCardViewCard}>
        <View style={{ flexDirection: "row", alignItems: "center", width: `100%` }}>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 14, color: "#000", fontWeight: "bold", textTransform: "capitalize" }}>
              {item?.userFullName}
            </Text>
            <View style={{ marginTop: 4, borderWidth: 0, width: "85%" }}>
              <Text style={{ color: "#000", fontSize: 12,fontFamily:"Poppins-Black" }}>
                {item?.pastTime}
              </Text>
            </View>
            <View style={{ height: 25, borderWidth: 0, width: 150, borderRadius: 50 }}>
              <Text style={{ color: "#000",fontFamily:"Poppins-Black" }}>{month + " " + datString}</Text>
            </View>
          </View>
        </View>
        <VideoPlay uri={item?.fileUrl} navigation={navigation} />
        <Image source={require("../../../assets/like.png")} style={{ width: 170, height: 50 }} resizeMode="contain" />
      </View>
    </Card>
  );
}

const VideoListComponent = ({ navigation }) => {
  const { fetchActiveVideo, video,dataUser } = useContext(EventContext);
  const { user } = useData();
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveVideo();
  }, []);
  const MAX_FILE_SIZE = 22 * 1024 * 1024; // 50 MB

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Please grant permission to access the media library');
      return;
    }

    const video = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    
    

    if (!video.canceled) {
      const fileInfo = await FileSystem.getInfoAsync(video?.assets[0].uri);
        
      if (fileInfo.size > MAX_FILE_SIZE) {
        Alert.alert('File too large', 'The selected video is too large. Please select a video under 5 MB.');
        return;
      }

      setIsUploading(true);
      navigation.navigate("Video", { data: video });
      setIsUploading(false);
    }
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchActiveVideo();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", width: `100%`, height: `100%`, paddingTop: 8 }}>
      <Card style={{ width: `100%`, height: 60, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: "#fff", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <View style={{ width: `100%`, alignItems: "center", justifyContent: "space-between", paddingLeft: 15, paddingRight: 15, flexDirection: "row" }}>
          <TouchableOpacity style={{ width: 130, height: 70, justifyContent: 'center' }} onPress={() => { navigation.navigate('Discover') }}>
            <Icon name="arrowleft" color={"#000"} size={20} />
          </TouchableOpacity>
          <View style={{ position: "absolute", left: `49%` }}>
            <McText medium size={15} numberOfLines={2} style={{ color: "#000" }}>{"Videos"}</McText>
          </View>
          <Button mode="contained-tonal" textColor="#fff" contentStyle={{ borderRadius: 15 }} style={{ marginTop: 10, width: 100, alignSelf: "center", backgroundColor: Colors.platform.android.primary, borderRadius: 15 }} onPress={() => { pickVideo() }}>Upload</Button>
        </View>
      </Card>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === false && styles.activeTabButton]} onPress={() => setActiveTab(false)}>
          <Text style={styles.tabButtonText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === true && styles.activeTabButton]} onPress={() => setActiveTab(true)}>
          <Text style={styles.tabButtonText}>My Videos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={video}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
      
          
          if (activeTab && item?.userId === dataUser?.id) {
            return <TodoList item={item} index={index} navigation={navigation} />;
          } else if (!activeTab && item?.userId !== user?.id) {
            return <TodoList item={item} index={index} navigation={navigation} />;
          }
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {isUploading && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color={Colors.platform.android.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default VideoListComponent;

// Styles
const styles = StyleSheet.create({
  container: {},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabButtonText: {
    fontSize: 16,
    fontFamily:"Poppins-Black"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  likeButton: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  likeText: {
    color: "#fff",
    fontSize: 14,
  },
  mainCardViewCard: {
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: "#fff",
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
