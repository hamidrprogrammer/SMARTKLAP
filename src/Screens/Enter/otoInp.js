// OTPInput.js
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index.toString()}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              handleInputKeyPress(index, nativeEvent.key)
            }
            maxLength={1}
            keyboardType="numeric"
            textAlign="center"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor:"#fff",
    borderRadius:30,
    color:'#fff',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
});

export default OTPInput;
