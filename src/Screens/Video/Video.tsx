import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert, ActivityIndicator, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { EventContext } from '../../Servise/Events/eventContaxt';
import BackButtonTWO from '../../Components/BackButtonTWO';
import { useNavigation } from '@react-navigation/native';
import { VideoPlay, VideoPlayFile } from './VideoPlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Constants';
import Icon from "react-native-vector-icons/AntDesign";
import {  Card } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { McText } from '@/Components';

const  width =Dimensions.get("screen").width

export default function VideoUploader({route}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState('');
  const {handleVideoUpload} = useContext(EventContext)
  const receivedData = route.params?.data || null;
 const navigation = useNavigation()
  const handleUpload = async () => {
    if (!receivedData.assets[0]?.uri) {
      Alert.alert('No video selected', 'Please choose a video to upload');
      return;
    }

    const videoUri = receivedData.assets[0]?.uri;
    const videoInfo = await FileSystem.getInfoAsync(videoUri);
    handleVideoUpload("text","text",receivedData.assets[0]?.uri)
    const formData = new FormData();
   

    setIsUploading(true);

    const simulateUploadProgress = () => {
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 10;
          }
          clearInterval(interval);
          return prevProgress;
        });
      }, 1000);
    };

    simulateUploadProgress();

    // Perform the upload using the formData
    // Write your upload logic here
    setTimeout(() => {
      setSelectedVideo(null);
      setUploadProgress(0);
      setIsUploading(false);
      setDescription('');

      Alert.alert('Upload Complete', 'Video has been successfully uploaded!');
      setTimeout(() => {
        navigation.goBack()
      }, 1000);
    }, 6000);
  };

  const pickVideo = async () => {
      
    
    setSelectedVideo(receivedData);
  };
  useEffect(()=>{
    pickVideo()
  },[])

  return (
   
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff',
      width:`100%`,
      paddingTop:8
    }}>
     <KeyboardAwareScrollView 
     style={{height:`100%`}}
     keyboardShouldPersistTaps={Platform.OS =='android' ? "handled": "always"}>
    <Card
          style={{
            width: `100%`,
            height:60,
            alignItems: "center",
            justifyContent: "center",
           flexDirection:"row",
            backgroundColor:"#fff",
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            marginBottom:30
          }}
        >
          <View
            style={{
              width:width,
              height:`100%`,
              flex:1,
        
              paddingLeft:15,
              justifyContent:"center"         
             
             
            
            }}>
               <View style={{height:50,width:`100%`,top:10}}>
       <BackButtonTWO goBack={()=> navigation.goBack()} />
       </View>
              <View style={{position:"absolute",left:`45%`}}>
          <McText medium size={15} numberOfLines={2} style={{ color: "#000" }}>
            {"New Post"}
          </McText>
         
          </View>
        
        </View>
        </Card>
    
       <View style={{width:`100%`,height:240}}>
        <VideoPlayFile uri={selectedVideo?.assets[0]?.uri} />
       </View>
      {/* <TouchableOpacity activeOpacity={0.8} onPress={pickVideo}>
        <View style={{ width: 100, height: 40, borderRadius: 8, backgroundColor: Colors.platform.android.primary, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Select Video</Text>
        </View>
      </TouchableOpacity> */}

<TouchableWithoutFeedback onPress={Keyboard.dismiss}
style={{alignSelf:"centers"}}>
      <View >
        <TextInput
        style={{ fontFamily:"Poppins-Black",width: `90%`,alignSelf:'center',borderWidth:1,borderColor:"#000", height: 70, backgroundColor: '#fff', borderRadius: 8, fontSize: 16, marginTop: 20, padding: 10 }}
        
          placeholder="Add a description..."
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </TouchableWithoutFeedback>
    <View style={{ 
        width:`100%`,
       marginTop:10,
        height:60,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        justifyContent:"center"
      }}>
        {isUploading ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Uploading: {uploadProgress}%</Text>
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <View
          style={{width:200,backgroundColor:Colors.platform.android.primary,height:45,
            borderRadius:15,
            alignSelf:"center"
          }}>
          <Button title="Upload" onPress={handleUpload} disabled={!selectedVideo}
          color={Colors.white}
           />
           </View>
        )}
      </View>
      
      </KeyboardAwareScrollView>
    </SafeAreaView>
  
  );
}
