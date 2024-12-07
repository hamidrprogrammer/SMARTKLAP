import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconA from "react-native-vector-icons/AntDesign";
import { Card } from "react-native-paper";
import { EventContext } from "../../Servise/Events/eventContaxt";
import { Colors } from "../../Constants";
import COLORS from "./consts/colors";
import { getUser } from "../../core/save";
import TeamsService, { getUserRank } from "../../Servise/Events/eventServise";

const width = Dimensions.get("window").width / 2 - 30;

const CategoryScreen = ({ navigation }) => {
  const {
    handleAddProductToOrder,
    fetchDataShopCategories,
    fetchDataShopProducts,
    fetchUserAllOrders,
    userAllOrder,
    dataCategory,
    setOrderItems,
    dataShop,
    orderItems,
    handleRemoveProductFromOrder
  } = useContext(EventContext);
  
  const [categoryIndex, setCategoryIndex] = useState(1);
  const [categoryIndexColor, setCategoryIndexColor] = useState(1);
  const [dataS, setDataS] = useState([]);
  const [visable, setVisable] = useState(true);
  const [visableAdd, setVisableAdd] = useState(false);

  useEffect
  const fetchData = useCallback(async () => {

    await fetchDataShopCategories();
    fetchDataShopProducts(dataCategory[1].id);
    handleCategoryPress(dataCategory[1], 1);
    await fetchUserAllOrders(1);
   
  }, [fetchDataShopCategories, fetchUserAllOrders, fetchDataShopProducts, dataCategory]);

  useEffect(() => {
    fetchUserAllOrders(1);
    setTimeout(() => {
      setVisable(false)
    }, 4000);
    fetchData();
    handleCategoryPress(dataCategory[0], 0)
  }, []);
  useEffect(() => {
    let internall = true
    if(internall){
      internall= false
      handleCategoryPress(dataCategory[1], 1)
     

    }
   
  }, [dataCategory]);
  const removeToOrder = useCallback(


    async (item) => {
      setVisableAdd(true)
      const updatedItems = orderItems?.map((re) =>
        re?.id === item?.id ? { ...re, flag: true } : re
      );
      setOrderItems(updatedItems);
      await handleRemoveProductFromOrder(item.id);
      setVisableAdd(false)
      setOrderItems(
        orderItems.map((re) =>
          re.id === item.id ? { ...re, flag: false } : re
        )
      );
    },
    [handleRemoveProductFromOrder, orderItems, setOrderItems]
  );
  const addToOrder = useCallback(
   

    async (item) => {
      setVisableAdd(true)
      if(orderItems?.length>0){
        setOrderItems(
          orderItems.map((re) => (re.id === item.id ? { ...re, flag: true } : re))
        );
      }else{
        setOrderItems(
          dataS.map((re) => (re.id === item.id ? { ...re, flag: true } : re))
        );
      }
      
      await handleAddProductToOrder(item.id);

      fetchUserAllOrders(1);
      setVisableAdd(false)
      if(orderItems?.length>0){
        setOrderItems(
          orderItems.map((re) => (re.id === item.id ? { ...re, flag: false } : re))
        );
      }else{
        setOrderItems(
          dataS.map((re) => (re.id === item.id ? { ...re, flag: false } : re))
        );
      }
    

    },
    [dataShop, handleAddProductToOrder, fetchUserAllOrders, setOrderItems]
  );
  async function fnSetUserID() {
    return getUser().then((res) => {
      if (res != null) {
      
        return res;
      }
      return 0 + "";
    });
  }
  const handleCategoryPress = async (item, index) => {
    setCategoryIndex(item.id);
    setCategoryIndexColor(index);
      
    const dataContent = await TeamsService.getShopProducts(
      "abcdefg",
      await fnSetUserID(),
      "3",
      item.id + "",
      ""
    );
      
    
    if (dataContent) {
      var res = dataContent.map((re) => {
        return { ...re, flag: false };
      });
      setDataS(res);
    }
  }


const CardS = React.memo(({ plant }) => {
  
  const renderActionButton = () => {
   
    const cu =orderItems?.find(item => item.id === plant.id);
      return (<>
      {cu?.count>0?<>
      <TouchableOpacity
          style={{
            height: 55,
            width: 55,

            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        
          }}
          onPress={() => removeToOrder(plant)}
        >
          <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            backgroundColor: Colors.black,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => removeToOrder(plant)}
        >
          <IconA name="minus" color={COLORS.white} size={15} />
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
              
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                    color: Colors.black,
                  }}
                >
                  {cu?.count}
                </Text>
              
            </View>
            </>
            :null}
        <TouchableOpacity
          style={{
            height: 55,
            width: 55,

            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => addToOrder(plant)}
        >
          <TouchableOpacity
          style={{
            height: 20,
            width: 20,
            backgroundColor: Colors.platform.android.primary,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => addToOrder(plant)}
        >
          <IconA name="plus" color={COLORS.white} size={15} />
          </TouchableOpacity>
        </TouchableOpacity>
      
      </>
      );
    
  };

  return (
    <TouchableOpacity activeOpacity={0.8}
    onPress={()=>{
      navigation.navigate("ProductDetail",{
        plant
      })
    }}>
      <Card style={{ backgroundColor: '#FFF', marginBottom: 10, height: 100 }}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginRight: 15 }}>
            <Image
              source={{ uri: plant.picture }}
              style={{  width: 60, height: 60, borderRadius: 15 }}
            />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>{plant.name}</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${plant.price?.toFixed(2)}</Text>
            {plant.pFandPrice?
            <Text style={{ fontSize: 13, fontWeight: 'bold' ,color:"#000"}}>${"PFand Price : "+plant.pFandPrice?.toFixed(2)}</Text>
          :null}
             {plant.taxPercent?
             <Text style={{ fontSize: 13, fontWeight: 'bold',color:"#000" }}>${plant.taxPercent+"% tax"}</Text>
          :null}
            
           
          </View>
          <View
            style={{
              flexDirection: 'row',
           
              marginTop: 5,
              top:20,
              position: 'absolute',
              right: 0,
              justifyContent:"space-between",
              
              height: '100%',
              alignItems: 'center',
            }}
          >
            <ImageBackground style={{width:131,height:45}} 
             resizeMode="contain"source={require('../../../assets/buttonbasket.png')}>
            <TouchableOpacity
            style={{width:`100%`,height:`100%`}}
            onPress={() => addToOrder(plant)}>

            </TouchableOpacity>
            </ImageBackground>
            {/* {renderActionButton()} */}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

  const CategoryItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
      
    
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: categoryIndexColor === index ?"#0AD19D": COLORS.white,
        borderBottomWidth:1,
        width:item.name.length*20,
        marginLeft:5,
        
      }}
      onPress={() => handleCategoryPress(item, index)}
    >
      <Text
        style={{
          width: 60,
          textAlign: "center",
          width:item.name.length*20,
          color: categoryIndexColor === index ?"#0AD19D": COLORS.black,
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

 

  return (
    <>
    {visable?
    <View style={{width:`100%`,height:`100%`,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator size={60} color="#000" />

    </View>:
    <SafeAreaView style={{ flex: 1,  backgroundColor: "#ffff" , paddingTop: 8}}>
      <ImageBackground style={{width:`100%`,height:70}} 
      resizeMode="contain"source={require('../../../assets/heeaderBasket.png')}>
<TouchableOpacity
          style={styles.cartIcon}
          onPress={() => {
            if (userAllOrder > 0) {
              navigation.navigate("OrderScreen");
            }
          }}
        >
         
          {userAllOrder > 0 && (
            <>
            {visableAdd?
            <View style={{position:"absolute",bottom:20,right:-10}}>
            <ActivityIndicator size={"small"} color="#000" 
            />
            </View>
            :
            <View style={styles.cartCount}>
              <Text style={styles.cartCountText}>{userAllOrder}</Text>
            </View>
            }
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
        style={{top:0,left:0,width:60,height:80,position:"absolute"}}
        onPress={()=>{navigation.navigate('Discover')}}>

        </TouchableOpacity>
      </ImageBackground>
      
      <View style={{ padding: 15 }}>
        <View style={styles.categoryContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataCategory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <CategoryItem item={item} index={index} />
            )}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        data={dataS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardS plant={item} />}
      />
        {/* <ImageBackground style={{width:`100%`,height:56,
          position:"absolute",bottom:0
        }} 
      resizeMode="contain"source={require('../../../assets/orederOpenButton.png')}>

      </ImageBackground> */}
    </SafeAreaView>
  }
  </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.black,
  },
  cartIcon: {
    width: 50,
    height: 80,
    right:-50,
    top:10,
    
    alignItems: "flex-end",
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
    fontSize:8
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  card: {
    height: 100,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden", // This is important to clip the content within the rounded border
    padding: 15,
    flexDirection: "row",
  },
  flatListContainer: {
    marginTop: 10,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default React.memo(CategoryScreen);
