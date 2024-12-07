import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, ScrollView } from 'react-native';

const LyricsModal = ({ lyrics, onClose,open }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <ScrollView>
        {lyrics?.map((t)=>{
          return <Text style={styles.lyricsText}>{t?.lyric_Sentence}</Text>
        })}
        </ScrollView>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width:`100%`,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width:`100%`,
    height:`60%`,
    position:"absolute",
    bottom:0,
    padding: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,

    elevation: 5,
  },
  lyricsText: {
    fontSize: 16,
    textAlign:"center",
    width:`100%`,
    marginBottom: 10,
  },
});

export default LyricsModal;
