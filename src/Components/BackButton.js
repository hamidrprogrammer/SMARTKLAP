import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
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
    tintColor: '#fff',
  },
})
