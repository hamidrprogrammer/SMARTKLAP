import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../assets/new/logo.png')} resizeMode="stretch" style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 50,
    marginBottom: 8,
  },
})
