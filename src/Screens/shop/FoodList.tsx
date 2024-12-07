import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Linking,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "./consts/colors";
import plants from "./consts/plants";
import { EventContext } from "../../Servise/Events/eventContaxt";
import { Button, Card, Checkbox } from "react-native-paper";
const width = Dimensions.get("window").width / 2 - 30;
import IconA from "react-native-vector-icons/AntDesign";
import { Colors } from "../../Constants";
import BackButton from "../../Components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native";

const OrderScreen = ({ navigation }) => {
  const {
    handleAddProductToOrder,
    orderItems,
    setOrderItems,
    fetchUserAllOrders,
    handleRemoveProductFromOrder,
    orders,
    dataShop,
    addressChecked,
    setAddressChecked,
    deliverWithoutAddressChecked,
    setDeliverWithoutAddressChecked,
    userAllOrder
  } = useContext(EventContext);

  useEffect(() => {
    fetchUserAllOrders(1);
  }, []);

  const addToOrder = useCallback(
    async (item) => {
      setOrderItems(
        orderItems.map((re) => (re.id === item.id ? { ...re, flag: true } : re))
      );
      await handleAddProductToOrder(item.id);

      fetchUserAllOrders(1);
      setOrderItems(
        orderItems.map((re) =>
          re.id === item.id ? { ...re, flag: false } : re
        )
      );
    },
    [dataShop, handleAddProductToOrder, fetchUserAllOrders, setOrderItems]
  );

  const removeToOrder = useCallback(
    async (item) => {
      const updatedItems = orderItems.map((re) =>
        re.id === item.id ? { ...re, flag: true } : re
      );
      setOrderItems(updatedItems);
      await handleRemoveProductFromOrder(item.id);
      setOrderItems(
        orderItems.map((re) =>
          re.id === item.id ? { ...re, flag: false } : re
        )
      );
    },
    [handleRemoveProductFromOrder, orderItems, setOrderItems]
  );

  const CheckboxExample = () => {
    return (
      <View style={style.container}>
        <View style={style.checkboxContainer}>
          <Checkbox
            color="#2196F3"
            status={addressChecked ? "checked" : "unchecked"}
            onPress={() => {
              setAddressChecked(!addressChecked);
              setDeliverWithoutAddressChecked(false);
              fetchUserAllOrders(1);
            }}
          />
          <TouchableOpacity
            style={{ height: 50, justifyContent: "center" }}
            onPress={() => {
              setAddressChecked(!addressChecked);
              setDeliverWithoutAddressChecked(false);
              fetchUserAllOrders(1);
            }}
          >
            <Text style={style.checkboxLabel}>Address</Text>
          </TouchableOpacity>
        </View>
        <View style={style.checkboxContainer}>
          <Checkbox
            status={deliverWithoutAddressChecked ? "checked" : "unchecked"}
            color="#2196F3"
            onPress={() => {
              setDeliverWithoutAddressChecked(!deliverWithoutAddressChecked);
              setAddressChecked(false);
              fetchUserAllOrders(0);
            }}
          />
          <TouchableOpacity
            style={{ height: 50, justifyContent: "center" }}
            onPress={() => {
              setAddressChecked(!addressChecked);
              setDeliverWithoutAddressChecked(true);
              fetchUserAllOrders(0);
            }}
          >
            <Text style={style.checkboxLabel}>Deliver without Address</Text>
          </TouchableOpacity>
        </View>
        {addressChecked && (
          <View style={style.textInputContainer}>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor={COLORS.dark}
              style={{
                color: COLORS.dark,
                borderRadius: 8,
                borderWidth: 1,
                height: 50,
                padding: 8,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const CardView = ({ plant }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", plant)}
      >
        <View style={{ backgroundColor: '#FFF',height:110,marginBottom:15,marginLeft:15,marginRight:15,
          width:`100%`,
        }}>
          <View style={style.card}>
          <View style={{ borderRadius: 15, alignItems: "center" }}>
            <Image
              source={{ uri: plant.picture }}
              style={{ width: 50, height: 50, borderRadius: 15 }}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                marginTop: 10,
               
                color: COLORS.black,
              }}
            >
              {plant.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                width: 100,
                marginBottom: 10,
                color: COLORS.black,
              }}
            >
              ${plant.price?.toFixed(2)}
            </Text>
            {plant.pFandPrice ? (
              <Text
                style={{ fontSize: 10,marginTop:8, fontWeight: "bold", color: "rgba(0,0,0.0.4)" }}
              >
                {"PFand Price : " + plant.pFandPrice?.toFixed(2)+"$"}
              </Text>
            ) : null}
            {plant.taxPercent > 0 ? (
              <Text
                style={{ fontSize: 11, fontWeight: "bold", color: "rgba(0,0,0.0.4)" }}
              >
                {plant.taxPercent + "% tax"}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 8,
              position: "absolute",
              right: 0,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                
                left: 20,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => removeToOrder(plant)}
            >
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth:1,
                  borderColor: Colors.black,
                  borderRadius: 20,
                  
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => removeToOrder(plant)}
              >
                <IconA name="minus" color={Colors.black} size={12} />
              </TouchableOpacity>
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: 40,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {plant?.flag ? (
                <ActivityIndicator size={30} color="#000" />
              ) : (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: Colors.black,
                  }}
                >
                  {plant?.count}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                right: 20,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => addToOrder(plant)}
            >
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth:1,
                  borderColor: Colors.platform.android.primary,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => addToOrder(plant)}
              >
                <IconA name="plus" color={Colors.platform.android.primary} size={12} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const openWebLink = () => {
    const url = "https://www.paypal.com/tr/home";
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error("Cannot open the link.");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  useEffect(() => {
      
  }, [orderItems]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 8  }}>
        <ImageBackground style={{width:`100%`,height:70,zIndex:1}} 
      resizeMode="contain"source={require('../../../assets/heeaderBasket.png')}>
    <TouchableOpacity 
      style={{top:0,left:0,width:130,height:90,position:"absolute"}}
        onPress={()=>{navigation.goBack()}}>

        </TouchableOpacity>
        <TouchableOpacity 
      style={{top:0,right:0,width:160,height:90,position:"absolute"}}
        onPress={()=>{navigation.navigate('Standings')}}>

        </TouchableOpacity>
      <View style={{
    width: 50,
    height: 80,
    right:-50,
    top:10,
    
    alignItems: "flex-end",
    zIndex:1
  }}>
            <View style={{
    position: "absolute",
  
    backgroundColor: COLORS.red,
    borderRadius: 25,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  }}>
              <Text style={{
    color: "#fff",
    textAlign: "center",
    fontSize:8
  }}>{userAllOrder}</Text>
            </View>
            </View>
      </ImageBackground>
      <ScrollView
        style={{ backgroundColor: "#fff", padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={[style.header]}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.black,
              fontWeight: "bold",
              width: `100%`,
              textAlign: "center",
            }}
          >
            Basket
          </Text> */}
        {/* </View> */}
        {/* <View style={[{ marginTop: 25 }]}>
          <BackButton goBack={navigation.goBack} />
        </View> */}
        <View style={{ flexGrow: 0, marginTop: 25, minHeight: 100 }}>
        <Card
        style={{  alignSelf: "center" ,
          width:`100%`,
       
          backgroundColor:"#fff",
          marginLeft:15,marginRight:15,
         
         borderRadius:15,
          justifyContent:"center",
          marginBottom:10,
        }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 10,
              flexGrow: 0,
              minHeight: 100,
            }}
            data={orderItems}
            renderItem={({ item }) => <CardView plant={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
            </Card>
        </View>
        <Card
        style={{  alignSelf: "center" ,
          width:`100%`,
          paddingTop:15,
          paddingBottom:15,
          backgroundColor:"#fff",
          marginLeft:15,marginRight:15,
         
         borderRadius:15,
          justifyContent:"center",
          marginBottom:10,
        }}>
          <Text style={{fontSize:15,paddingLeft:15,fontWeight:"bold"}}>{"Delivery method"}</Text>
        <CheckboxExample />
        </Card>
        <View>
          <Text style={style.orderTotal}>
            Total: ${orders?.totalPrice?.toFixed(2)}
          </Text>
          <Text style={style.shippingPrice}>
            Shipping: ${orders?.shippingPrice?.toFixed(2)}
          </Text>
          <Text style={style.taxPrice}>
            Tax: ${orders?.taxPrice?.toFixed(2)}
          </Text>
          <Text style={style.finalPrice}>
            Final Price: ${orders?.finalPrice?.toFixed(2)}
          </Text>
          {orders?.isPayed ? (
            <Text style={style.paymentStatusPaid}>Payment Status: Paid</Text>
          ) : (
            <Text style={style.paymentStatusUnpaid}>
              Payment Status: Unpaid
            </Text>
          )}
        </View>
        
        <Card style={{  marginTop: 30, alignSelf: "center" ,
          width:`100%`,
          height:75,
          backgroundColor:"#fff",
          alignItems:"center",
          borderTopLeftRadius:15,
          borderTopRightRadius:15,
          justifyContent:"center",
          marginBottom:10,
        }}>
          <Button
            icon="account-check-outline"
            mode="contained"
            onPress={() => openWebLink()}
            style={{
              backgroundColor: Colors.platform.android.primary,
              width: 190,
              borderRadius:15,
            }}
          >
            Pay
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  orderDetails: {
    marginTop: 10,
  },
  orderItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.dark,
  },
  shippingPrice: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.dark,
  },
  taxPrice: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.dark
    ,fontFamily:"Poppins-Black"
  },
  finalPrice: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: COLORS.dark
    ,fontFamily:"Poppins-Black"
  },
  paymentStatusPaid: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold"
    ,fontFamily:"Poppins-Black"
  },
  paymentStatusUnpaid: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    fontFamily:"Poppins-Black"
  },
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
    height: 110,
    backgroundColor: "#fff",
    width: `100%`,
    marginHorizontal: 2,
    borderRadius: 10,
 
    borderColor: Colors.platform.android.primary,
 
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 30,
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
  container: {
    marginTop: 15,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    color: COLORS.dark,
  },
  textInputContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 8,
  },
});
export default OrderScreen;
