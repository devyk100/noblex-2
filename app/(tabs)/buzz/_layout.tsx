import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampusBuzz from './buzz';
import List from './list';

const { width } = Dimensions.get('window');

export default function MyRouteScreen() {
  const [tab, setTab] = useState('Tab1');

  // Animated values for each tab
  const fadeTab1 = useRef(new Animated.Value(1)).current;
  const fadeTab2 = useRef(new Animated.Value(0)).current;
  const translateTab1 = useRef(new Animated.Value(0)).current;
  const translateTab2 = useRef(new Animated.Value(width)).current;

  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;
    setTab(newTab);

    if (newTab === 'Tab1') {
      Animated.parallel([
        Animated.timing(fadeTab1, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateTab1, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeTab2, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateTab2, { toValue: width, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeTab1, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateTab1, { toValue: -width, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeTab2, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateTab2, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={tab}
        onValueChange={handleTabChange}
        buttons={[
          { value: 'Tab1', label: 'Card View' },
          { value: 'Tab2', label: 'List View' },
        ]}
        style={styles.segmented}
      />

      <View style={styles.content}>
        {/* Tab 1 */}
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeTab1,
              transform: [{ translateX: translateTab1 }],
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <CampusBuzz />
        </Animated.View>

        {/* Tab 2 */}
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeTab2,
              transform: [{ translateX: translateTab2 }],
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <List />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  segmented: { marginBottom: 16 },
  content: { flex: 1, position: 'relative' },
  animatedContainer: { flex: 1 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
