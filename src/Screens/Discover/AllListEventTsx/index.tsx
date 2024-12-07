import { ReactNode, useContext } from "react";
import { ImageBackground, ScrollView, View ,Image} from "react-native";
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
import { McText } from "../../../Components";
import { TouchableOpacity } from "react-native";

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
      <View style={{ width: `100%`, alignItems: "center" }}>{content}</View>
    </>
  );
};

export function AllListEventTsx({ navigation }) {
  const { events } = useContext(EventContext);
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 8, backgroundColor: "#fff" }}
      >
      
          <ScrollView>
          <ImageBackground style={{width:`100%`,height:70}} 
      resizeMode="contain"source={require('../../../../assets/headirnull.png')}>

        
        <TouchableOpacity 
        style={{top:0,left:0,width:100,height:80,position:"absolute"}}
        onPress={()=>{navigation.navigate('Discover')}}>

        </TouchableOpacity>
        <McText medium size={18} numberOfLines={2} 
           style={{
            
            textAlign: "center",
            height: 40,
            position: "absolute",
            top: 20,
            alignSelf: "center",
            color:"#000"
          }}>
          {"Events"}
        </McText>
      </ImageBackground>
       
          

            <View style={{ height: 50, paddingTop: 15 }}>
              <BackButton goBack={() => navigation.goBack()} />
            </View>
            <FlatList
              keyExtractor={(item, index) => "_match" + item.title + index}
              style={{ height: `100%`, width: `100%` }}
              data={events}
              renderItem={_renderMatchesItem}
            />
          </ScrollView>
     
      </SafeAreaView>
    </>
  );
}
