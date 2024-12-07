import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { View } from "react-native";
import styled from "styled-components";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import { Card } from "react-native-paper";
import { Text } from "react-native";
import { Colors } from "../../../Constants";
import { millisecondsToTime } from "../../../core/save";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera/legacy";
import { ActivityIndicator } from "react-native";
import { McText } from "../../../Components";
import debounce from "lodash/debounce";

const RenderItem = React.memo(({ item, index,onPress }) => {
  const onPressIn =() => {
    onPress();
    // setActive(true);
  };
  return (
   
    <TouchableOpacity onPress={onPressIn}>
      <ImageBackground 
      resizeMode="contain"
      source={require('../../../../assets/eventitem.png')}style={styles.mainCardView}>
        {/* <View style={styles.subCardView}>
          <Image
            source={{ uri: item.chantTypeFileUrl }}
            resizeMode="contain"
            style={styles.image}
          />
        </View> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item?.title}</Text>
        
        </View>
        <View style={styles.durationContainer}>
          <Image source={require('../../../../assets/clocktime.png')}
          resizeMode="contain" style={{width:15,height:15}}/>
          <View style={{width:15}}/>
          <Text style={styles.duration}>
            {millisecondsToTime(item?.duration_MSC)}
          </Text>
        </View>
        <View style={{position:"absolute",bottom:18,paddingLeft:10,width:`100%`,flexDirection:"row"}}>
         
          <Text style={styles.title}>{"Song points:  "+item?.point}</Text>
          </View>
      </ImageBackground>
    </TouchableOpacity>

  );
});

export function ChantScreen({ navigation }) {
  const {
    chantAll,
    fetchgetAllChants,
    fetchgetChantContentOffline,  
    chantContentOffline
  } = useContext(EventContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetchgetAllChants();
   
  }, []);

  const handlePress = useCallback((item) => {
    // setActive(true);
  }, []);
  const onPressItem = (item,id) => {
    fetchgetChantContentOffline(item, id);
    setActive(true);
  }
  useEffect(() => {
    if (chantContentOffline !== null) {
      if (chantContentOffline?.chant_Audio_List?.length > 0 && active) {
        navigation.navigate("ChantPlayer");
        setActive(false);
      }
    }
  }, [chantContentOffline]);
  const debouncedNavigation = useCallback(
    debounce(() => {
      navigation.navigate("ChantPlayer");
    }, 1000),
    []
  );

  const ItemSeparatorView = () => <View style={styles.separator} />;


   

  return (
    <SafeAreaView style={styles.container}>
       <ImageBackground 
      resizeMode="contain"
      source={require('../../../../assets/headeerChant.png')}style={{width:`100%`,height:70}}>
<TouchableOpacity 
        style={{position:"absolute",top:0,left:0,width:100,height:50}}
        onPress={()=>{navigation.navigate('Discover')}}>

        </TouchableOpacity>
      </ImageBackground>
     
      <FlatList
        data={chantAll}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} onPress={()=>{
            onPressItem(item?.chantId, item?.eventChantId);
          }}/>
        )}
        // ItemSeparatorComponent={ItemSeparatorView}
       
      />
      {active ?
      <View
        style={{
          position: "absolute",
          width: `100%`,
          height: `100%`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={30} color="#000" />
      </View>
      :null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  headerText: {
    color: "#000",
    fontSize: 25,
  },
  mainCardView: {
    height: 120,
    width:339,
    alignSelf:'center',
    flexDirection: "row",
    alignItems: "center",
   
  
   
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  titleContainer: {
    marginLeft: 25,
    flex: 1,
    top:8
  },
  title: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  durationContainer: {
    height: 25,
    flexDirection:"row",
    alignItems:'center',
 
    justifyContent: "center",
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  duration: {
    color: Colors.black,
 
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
});
