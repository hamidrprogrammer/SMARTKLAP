
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet ,TouchableOpacity } from 'react-native';


const apiKey = '8henvjgztnqr';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGFtaWRyZGV2ZWxvcGVyMDI2In0.KLJBreb7UeB8CluFTKD-Em_pp2zM5chmtB2_29Ndol4';
const userId = 'hamidrdeveloper026';
const callId = 'audio_room_6859bab9-f8ba-4cc2-8465-e9645dd2580e';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { Card } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/Feather';


const user = {
  id: 'hamidrdeveloper026',
  name: 'John Malkovich',
  
};


type Props = { goToHomeScreen: () => void; callId: string };
type Propss = {
  goToCallScreen: () => void;
};
type Propsss = { goToHomeScreen: () => void };

const AudioRoomUI = ({ goToHomeScreen }: Propsss) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here we will add Audio Room UI</Text>
      <Button title='Leave Audio Room' onPress={goToHomeScreen} />
    </View>
  );
};
const CallScreen = ({ goToHomeScreen, callId }: Props) => {
  return <AudioRoomUI goToHomeScreen={goToHomeScreen} />;
};
const HomeScreen = ({ goToCallScreen }) => {
  return (
    <View>
      <Text style={styles.text}>Welcome to Audio Room 'john_smith'</Text>
      <Button title='hamid' onPress={()=>{console.log("asdsad");
      }}/>
    </View>
  );
};
export default function MIC() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [callsC, setCallsC] = useState(null);

  const goToCallScreen = async () => {
  
    try {
      alert("jon")
      const client = new StreamVideoClient({ apiKey, user, token });
      setActiveScreen('call-screen')
      const { calls } = await client.queryCalls({
      
        limit: 25,
        watch: true,
      });
      alert("jonnn")
      console.log('====================================');
      console.log(calls[0].cid);
      console.log('====================================');
      const callType = "audio_room";
      const callId = calls[0].id;
      const call = client.call(callType, callId);
      await call.join();
      setCallsC(call)
      alert("jonnn")
    } catch (error) {
      console.log(error);
      
    }
   
  };
  const goToHomeScreen = async () => {

    try {
  
     
      
      await callsC.leave();
     
    } catch (error) {
      console.log(error);
      
    }
   
  };
  useEffect(() => {
  setTimeout(() => {
   
  }, 5000);
  }, [])
  const [flag, setflag] = useState(false)
  useEffect(() => {
    console.log(flag);
    
    if(flag){
 goToCallScreen();
    }else{
      goToHomeScreen();
    }
  }, [flag])
  return (
    <View style={styles.container}>
          <TouchableOpacity
          onPress={()=>{setflag(!flag)}}>
           <Card 
           
           style={{width:50,height:50 ,borderRadius:50,alignItems:"center",justifyContent:"center"}}
           contentStyle={{width:50,height:50,borderRadius:50,alignItems:"center",justifyContent:"center"}}>
            {flag?<Icon name="speaker" size={20} color={'#000'}/>:<Icon name="bell-off" size={20} color={'#000'}/>}
           
           </Card>
           </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:"absolute",
    bottom:15,
    right:30
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});