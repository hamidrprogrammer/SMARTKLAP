import { ReactNode, useContext } from "react";
import { ImageBackground, ScrollView, View ,Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import { FlatList } from "react-native-gesture-handler";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import {
  FinishUi,
  LiveEventUi,
  PendinghUi,
  PreStartUi,
} from "../../Home/PreStartUi";
import { McImage, McText } from "../../../Components";
import { Card } from "react-native-paper";
import Colors from "@/Constants/Colors";



export function AllNews({ navigation }) {
    
  const { news } = useContext(EventContext);
  const NewsItemTwo = ({ item, index }) => (
    <Card
      style={{
        
        backgroundColor: "#fff",
        height: 100,
        borderRadius:0,
        padding:5
      }}
    >
      <View style={{ flexDirection: "row", width: `100%` }}>
        <Image
          source={{ uri: item?.thumbnail?.content?.url }}
          style={{
            width: 113,
            height: 80,
            borderRadius:15,
            marginRight:15,
            marginLeft:15,
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
        backgroundColor: "#19191d",
 
        borderColor: Colors.platform.android.primary,
        borderWidth: 0,
        borderRadius:5,
      }}
    >
      <View style={{ flexDirection: "row",width:`100%`}}>
        <McImage
          source={{ uri: item?.thumbnail?.content?.url }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
        <View
          style={{
            width: 220,
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <McText medium size={12} numberOfLines={5} color={"#fff"}>
            {item?.title}
          </McText>
  
          <McText regualr color="#fff" size={12}>
            {new Date(item?.created_date).toISOString()}
          </McText>
        </View>
      </View>
    </Card>
  );
  
  const _renderMatchesItem = ({ item, index }) => {
 
    return (
      <>
         <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("ArticleDetail", {
                              data: item,
                            });
                          }}
                          style={{
                            width:`100%`,
                            height: 110,
                   
                            padding:10

  
                          
                           
                          }}
                        >
                          <NewsItemTwo item={item} />
                        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 8, backgroundColor: "#fff" }}
      >
      
          <ScrollView>
          
          <ImageBackground
        resizeMode='contain'
        style={{height:70,width:`100%`}}
        source={require('../../../../assets/heaernews.png')}>
<TouchableOpacity 
        style={{position:"absolute",top:0,left:0,width:130,height:90}}
        onPress={()=>{navigation.goBack()}}>

        </TouchableOpacity>
        </ImageBackground>
            <FlatList
              keyExtractor={(item, index) => "_match" + item.title + index}
              style={{ height: `100%`, width: `100%` }}
              data={news}
              renderItem={_renderMatchesItem}
            />
            <View style={{height:100}}/>
          </ScrollView>
     
      </SafeAreaView>
    </>
  );
}
