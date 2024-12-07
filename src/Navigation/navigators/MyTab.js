import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const style = isFocused ? styles.tabButtonFocused : styles.tabButton;

        // If this is the middle button, apply a different style
        if (index === Math.floor(state.routes.length / 2)) {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabButtonCenter}>
              <Text style={styles.tabText}>{label}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={style}>
            <Text style={styles.tabText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    padding: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabButtonCenter: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#f00',
  },
  tabButtonFocused: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#f00',
  },
  tabText: {
    color: '#222',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        {/* Your screens */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
