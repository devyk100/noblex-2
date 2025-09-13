import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    setIsOn(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  // Thumb moves from left to right inside the track
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // adjust according to track/ball size
  });

  // Track color changes when ON/OFF
  const trackColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#6200ee'],
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14, // fully rounded
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12, // circular
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});
