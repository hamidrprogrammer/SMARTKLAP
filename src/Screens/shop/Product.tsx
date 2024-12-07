/** TODO:
 *
 * [x] Header image and buttons
 * [x] Title section
 * [x] Author section
 * [x] Article contect section
 * [x] Bottom button section
 */
import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import MaskedView from "@react-native-community/masked-view";

import { Fonts, Images, Metrics, Colors } from "@/Constants";
import { McText, McImage } from "@/Components"
import BackButton from "../../Components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import { EventContext } from "../../Servise/Events/eventContaxt";
import { StyleSheet } from "react-native";
import IconA from "react-native-vector-icons/AntDesign";
import COLORS from "./consts/colors";
import Toast from 'react-native-root-toast';
import Icon from "react-native-vector-icons/MaterialIcons";
import { ImageBackground } from "react-native";

const ProductDetail = ({ navigation, route }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const receivedData = route.params?.data || null;
  const {
    handleAddProductToOrder,
    orderItems,
    setOrderItems,
    dataCategory,
    fetchDataShopCategories,
    dataShop,
    fetchDataShopProducts,
    fetchUserAllOrders,
    userAllOrder,
    lodingOredr
  } = useContext(EventContext);
  useEffect(() => {
    let { plant  } = route.params;
    setSelectedArticle(plant );
      
    
  }, []);
  const [isAdd, setisAdd] = useState(false)
  const addToOrder = (item) => {
   

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.

    handleAddProductToOrder(item?.id);
   
    setisAdd(true)
    setTimeout(function () {
      fetchUserAllOrders(1);
      setisAdd(false)
      
  }, 2000);
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 8 ,backgroundColor:"#ffff"}}>
     
        <Container>
        <ScrollView
        contentContainerStyle={{
         
          backgroundColor:"#ffff"
        }}
      >
          {/* Header image and buttons */}

          <ImageBackground style={{width:`100%`,height:70}} 
      resizeMode="contain"source={require('../../../assets/heeaderBasket.png')}>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity 
        style={{left:0,width:70,height:90,zIndex:1}}
        onPress={()=>{ navigation.goBack()}}>

        </TouchableOpacity>
        <View style={{width:18}}/>
<TouchableOpacity
          style={[style.cartIcon]}
          onPress={() => {
            if (userAllOrder > 0) {
              navigation.navigate("OrderScreen");
            }
          }}
        >
         
          {userAllOrder > 0 && (
            <>
           
            <View style={style.cartCount}>
              <Text style={style.cartCountText}>{userAllOrder}</Text>
            </View>
           
            </>
          )}
        </TouchableOpacity>
        
        </View>
      </ImageBackground>
         
          {/* Title section */}
          <TitleSection>
            
            <HeaderImage source={{ uri: selectedArticle?.picture }}></HeaderImage>
            <View style={{height:15}}/>
            <McText color="#000" bold size={30}>
              {selectedArticle?.name}
            </McText>
          </TitleSection>

          <View style={{marginTop:15,paddingBottom:120}}>
            
                <McText
                  size={14}
                  color="#000"
                  style={{
                    lineHeight: 29,
                    padding: 15,
                  }}
                >
                  {selectedArticle?.description}
                </McText>
              
           
          </View>
          
          </ScrollView>
        </Container>
      
      <Card
        style={{
          width: `99%`,
          height: 45,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 50,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
         
        }}
        contentStyle={{
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <View style={style.card}>
          <View>
            <Text style={{fontFamily:"Poppins-Black", fontWeight: "bold", fontSize: 19, marginTop: 10,color:Colors.black }}>
              {selectedArticle?.name}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "bold",color:Colors.black ,fontFamily:"Poppins-Black"}}>
              ${selectedArticle?.price?.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              position: "absolute",
              left: 15,
              height: `100%`,
              alignItems: "center",
            }}
          >
             {lodingOredr?
          <View >
          <ActivityIndicator size={30} color="#000" />
          </View>
          :      
           <ImageBackground style={{width:131,height:45}} 
             resizeMode="contain"source={require('../../../assets/buttonbasket.png')}>
            <TouchableOpacity
            style={{width:`100%`,height:`100%`}}
            onPress={() => addToOrder(selectedArticle)}>

            </TouchableOpacity>
            </ImageBackground>}
          
          </View>
        </View>
      </Card>
      {/* <Toast visible={isAdd}>Successfully added to cart</Toast> */}
    
    </SafeAreaView>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background: #ffff;
`;
const HeaderImage = styled.Image`
  width: 100%;
  height: 342px;
  border-radius: 30px;
  top: 0px;
  left: 0px;
`;
const HeaderButtonSection = styled.View`
  margin: 0px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 82px;
`;
const ShareCircle = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 52px;
  background-color: ${(props) => Colors.blue};
  justify-content: center;
  align-items: center;
`;
const TitleSection = styled.View`
  margin: 10px 16px 0px;
`;
const AuthorSection = styled.View`
  height: 38px;
  margin: 15px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const BottomButton = styled.TouchableOpacity`
  width: 262px;
  height: 56px;
  border-radius: 27.5px;
  background-color: ${(props) => Colors.blue};
  margin: 0px 56px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 22px;
`;
export default ProductDetail;
const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: Colors.purpleA400,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: Colors.purpleA400,
  },
  card: {
    height: 100,
    backgroundColor: "#fff",
    width: `100%`,
    marginHorizontal: 2,
    borderRadius: 30,
    marginBottom: 20,
    padding: 15,
    flexDirection: "row-reverse",
   
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.purpleA400,
    justifyContent: "center",
    alignItems: "center",
  },
 
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.black,
  },
  cartIcon: {
    width: 60,
   
    height: 80,

   
    top:10,
    
   
    zIndex:1
  },
  cartCount: {
    position: "absolute",
  
    backgroundColor: COLORS.red,
    borderRadius: 25,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cartCountText: {
    color: "#fff",
    textAlign: "center",
    fontSize:8,
    fontFamily:"Poppins-Black"
    ,fontFamily:"Poppins-Black"
  },

  flatListContainer: {
    marginTop: 10,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
