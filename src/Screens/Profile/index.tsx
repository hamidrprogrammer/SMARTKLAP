import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Platform, Linking, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import IconA from "react-native-vector-icons/AntDesign";
import { StackActions, useNavigation } from "@react-navigation/native";

import {Block, ButtonPro, Image, Text} from '../../Components';
import {useData, useTheme} from '../../hooks';
import { Avatar, Icon } from 'react-native-elements';
import eventServise from '../../Servise/Events/eventServise';
import { EventContext } from '../../Servise/Events/eventContaxt';
import { Card, Dialog, Paragraph, Portal } from 'react-native-paper';
import { Colors } from '../../Constants';
import { removeAllDataFromAsyncStorage } from '../../core/save';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { ImageBackground } from 'react-native';

const isAndroid = Platform.OS === 'android';

const Profile = ({navigation}) => {
  const {user} = useData();
  const {assets, colors, sizes} = useTheme();
  const {fetchGetUserRank,dataUserRank,dataUser} = useContext(EventContext)
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;
  useEffect(() => {
    
    fetchGetUserRank()
    return () => {
      
    }
  }, [])
  useEffect(() => {
    
  
     
     
     
  }, [dataUserRank])
  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );
  const renderValue = (user: Partial<any>) => {
    const { totalPoint, positive } = user;

    if (!positive) {
      return (
        <View
          style={{
           
            width: 100,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon
            name="caret-up-outline"
            type="ionicon"
            color="green"
            size={25}
          />
          <Text
            style={{
              color: 'green',
           
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {totalPoint}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'rgba(244,230,224,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon
            name="caret-down-outline"
            type="ionicon"
            color="red"
            size={25}
          />
          <Text
            style={{
              color: 'red',
        
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {totalPoint}
          </Text>
        </View>
      );
    }
  };
  const renderCard = (user: Partial<any>, index: React.Key) => {
    const { name, avatar } = user;
    return (
      <View style={{marginTop:8,backgroundColor: "#fff"}}>
      <View
        key={index}
        style={{
          height: 60,
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 15 }}>
            <Avatar
              rounded
              source={{
                uri: user?.avatarUrl,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text
          black
            style={{
              color: Colors.black,
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            {user?.fullName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
          {renderValue(user)}
          
        </View>
      </View>
      </View>
    );
  };

  const renderListCards = () => {
    return dataUserRank?.map((user, index) => {
      return renderCard(user, index);
    });
  };
  const [logoutVisible, setLogoutVisible] = useState(false);
  const showLogoutDialog = () =>{
     setLogoutVisible(true);}
  const hideLogoutDialog = () => setLogoutVisible(false);
  function handleLogout() {
    removeAllDataFromAsyncStorage();
              setTimeout(() => {
                navigation.replace(
                  "SplashScreen"
                )
              }, 2000);
              setLogoutVisible(false);
  }

  return (
    <SafeAreaView  style={{ flex: 1,backgroundColor:"#fff",paddingTop:8}}>
      <ImageBackground
        resizeMode='contain'
        style={{height:70,width:`100%`}}
        source={require('../../../assets/heeaderProofile.png')}>
<TouchableOpacity 
        style={{position:"absolute",top:0,left:0,width:130,height:90}}
        onPress={()=>{navigation.goBack()}}>

        </TouchableOpacity>
        </ImageBackground>
      
    <Block safe marginTop={sizes.md} style={{backgroundColor:"#fff"}}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding,backgroundColor:"#fff"}}>
        <Block flex={0}>
        <View style={{backgroundColor:"#fff",
          paddingTop:15,
          paddingBottom:15,
          borderRadius:8,
          margin:15
        }}>
          
            <Block flex={0} align="center">
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: dataUser?.avatarUrl}}
              />
              <Text h5 center black>
                {dataUser?.fullName}
              </Text>
              <Text p center black>
                {dataUser?.teamName}
              </Text>
              <Block row marginVertical={sizes.m}>
                {/* <ButtonPro
                  black
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  >
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    >
                    <Text black bold transform="uppercase">
                    {"Point: "+dataUser?.totalPoint}
                    </Text>
                  </Block>
                </ButtonPro> */}
                <TouchableOpacity   onPress={()=>{

               }} style={{position:"absolute",right:-20,top:10}}>
                <IconA
            name="logout"
            size={38}
            color={Colors.platform.android.primary}
            onPress={()=>{showLogoutDialog()
               }}
          />
                </TouchableOpacity>
              
                
              </Block>
              
            </Block>
            </View>

          
        </Block>
        {renderListCards()}
      </Block>
      
    </Block>
    <Portal>
        <Dialog visible={logoutVisible} onDismiss={hideLogoutDialog}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to log out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideLogoutDialog} title="Cancel" />
            <Button onPress={handleLogout} title="Accept" />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default Profile;