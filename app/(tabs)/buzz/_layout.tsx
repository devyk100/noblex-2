import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampusBuzz from './buzz';

const { width } = Dimensions.get('window');

export default function MyRouteScreen() {
  const [tab, setTab] = useState('Tab1');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  // animate on tab change
  useEffect(() => {
    // Slide out current content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: tab === 'Tab1' ? width : -width,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset for incoming tab
      translateX.setValue(tab === 'Tab1' ? -width : width);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [tab]);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'Tab1', label: 'Card View' },
          { value: 'Tab2', label: 'List View' },
        ]}
        style={styles.segmented}
      />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.animatedContainer,
            { opacity: fadeAnim, transform: [{ translateX }] },
          ]}
        >
          {tab === 'Tab1' ? <CampusBuzz /> : <Tab2Content />}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

function Tab1Content() {
  return (
    <View style={styles.tabContent}>
      <Text>Content for Tab 1</Text>
    </View>
  );
}

function Tab2Content() {
  return (
    <View style={styles.tabContent}>
      <Text>Content for Tab 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  segmented: { marginBottom: 16 },
  content: { flex: 1 },
  animatedContainer: { flex: 1 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
