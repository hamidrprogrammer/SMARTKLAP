import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../Constants';
import { EventContext } from '../../Servise/Events/eventContaxt';
import { Image } from 'react-native';

const CustomProgressBar = ({ progress,data }) => {
    const {fetchGetUserRank,dataUser} = useContext(EventContext)

    const [pointTotal, setPointTotal] = useState(0)
    const [pointUser, setPointUser] = useState(0)
    useEffect(() => {
    
        fetchGetUserRank()
        return () => {
          
        }
      }, [])
    useEffect(() => {
        let point = 0;
        data.forEach(element => {
            point = point+element.point
        });
        const percentage = ( dataUser?.totalPoint / point) / 100;
        setPointTotal(percentage);
          
    }, [dataUser])
  return (
    <>
    <View
    style={{
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      paddingLeft: 50,
      paddingRight: 50,
      paddingTop:30
    }}
  >
    <Image
      style={{ width: 25, height: 25 ,opacity:pointTotal * 100>= 99 ?1:0.3}}
      source={require("../../../assets/chant/gold-medal.png")}
    />
    <Image
      style={{ width: 25, height: 25,opacity:pointTotal * 100>= 49 ?1:0.3 }}
      source={require("../../../assets/chant/silver-medal.png")}
    />
    <Image
      style={{ width: 25, height: 25 }}
      source={require("../../../assets/chant/bronze-medal.png")}
    />
  </View>
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${pointTotal * 100}%` }]} />
      {/* <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text> */}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '80%',
    height: 5,
    backgroundColor: '#cccc',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf:"center",
    marginTop:10
  },
  progress: {
    height: '100%',
    backgroundColor: "#ECE900"
  },
  progressText: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
});

export default CustomProgressBar;
