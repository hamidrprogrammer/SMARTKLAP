import React from 'react';
import McIcon from '../McIcon';
import Icon from 'react-native-vector-icons/AntDesign';

const TabIcon = ({ icon, color, size,onPress }) => (
  <Icon
    name={icon}
    size={20}
   color={color}
   onPress={onPress}
  />
);

export default TabIcon;
