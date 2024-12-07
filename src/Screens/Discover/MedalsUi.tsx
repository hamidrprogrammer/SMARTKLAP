import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors } from '../../Constants';
import { EventContext } from '../../Servise/Events/eventContaxt';
const MedalsUi = ({ rank }) => {
    const getMedalImage = (medalRank,rank) => {
      switch (medalRank) {
        case 1:
            return require('../../../assets/steel_medal.png');
        case 2:
          if(rank>49){
            return require('../../../assets/bronz_medal.png');

          }else{
            return require('../../../assets/steel_medal.png');

          }
      
        case 3:
          
          if(rank>100){
            return require('../../../assets/gold.png');

          }else{
            return require('../../../assets/steel_medal.png');

          }
       
      }
    };
  
    return (
      <View style={styles.medalsContainer}>
        {[1, 2, 3].map((medalRank) => (
          <Image
            key={medalRank}
            resizeMode='contain'
            style={[
              styles.medalImage,
              medalRank === rank ? styles.activeMedal : null,
            ]}
            source={getMedalImage(medalRank,rank)}
          />
        ))}
      </View>
    );
  };
  
  const MedalsAndRankUi = ({ progress }) => {
  
    const { allPoint,
        userAllPoint} = useContext(EventContext)
        const [percent, setPercent] = useState(0)
        const [rank, setRank] = useState(0)
        useEffect(() => {
            const p = (userAllPoint * 100) / allPoint
            const r = parseInt((p * 3)+"");
        
            setPercent(p)
            setPercent(r)
        }, [allPoint])
        
    return (
      <View style={styles.container}>
        <MedalsUi rank={percent} />
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${percent}%`, backgroundColor: Colors.platform.ios.warning },
            ]}
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
  
    },
    medalsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 8,
    },
    medalImage: {
      width: 60,
      height: 100,
    },
    activeMedal: {
      width: 120,
    },
    progressBarContainer: {
      margin:10,
      backgroundColor:Colors.grey2,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: 8,
    },
  });
  
  export default MedalsAndRankUi;
  