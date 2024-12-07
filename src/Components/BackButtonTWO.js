import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function BackButtonTWO({ goBack }) {
    return (
      <TouchableOpacity onPress={goBack} style={[styles.container,{tintColor:"#000"}]}>
        <Image
          style={styles.image}
          source={require('../../assets/arrow_back.png')}
        />
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
  
      left: 4,
    },
    image: {
      width: 30,
      height: 30,
      tintColor: '#000',
    },
  })
  