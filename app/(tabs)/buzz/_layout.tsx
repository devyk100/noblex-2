import { ThemedText } from '@/components/themed-text';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampusBuzz from './buzz';
import List from './list';
import ScheduleView from './schedule-view'; // Import the new ScheduleView

const { width } = Dimensions.get('window');

// Memoized components to prevent unnecessary re-renders
const MemoizedCampusBuzz = React.memo(CampusBuzz);
const MemoizedList = React.memo(List);

export default function MyRouteScreen() {
  const [tab, setTab] = useState('Tab1');
  const colorScheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Animated values for each tab
  const fadeTab1 = useRef(new Animated.Value(1)).current;
  const fadeTab2 = useRef(new Animated.Value(0)).current;
  const fadeTab3 = useRef(new Animated.Value(0)).current;
  const translateTab1 = useRef(new Animated.Value(0)).current;
  const translateTab2 = useRef(new Animated.Value(width)).current;
  const translateTab3 = useRef(new Animated.Value(width)).current;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;

    const prevTabIndex = parseInt(tab.replace('Tab', ''));
    const newTabIndex = parseInt(newTab.replace('Tab', ''));
    const direction = newTabIndex > prevTabIndex ? 1 : -1; // 1 for right, -1 for left

    setTab(newTab);
    bottomSheetModalRef.current?.forceClose();

    const animations: Animated.CompositeAnimation[] = [];

    // Animate all tabs to their new positions
    const animateTab = (
      fadeAnim: Animated.Value,
      translateAnim: Animated.Value,
      targetFade: number,
      targetTranslate: number,
      initialTranslate: number
    ) => {
      translateAnim.setValue(initialTranslate); // Set initial position for incoming tab
      animations.push(
        Animated.timing(fadeAnim, { toValue: targetFade, duration: 200, useNativeDriver: true }),
        Animated.timing(translateAnim, { toValue: targetTranslate, duration: 200, useNativeDriver: true })
      );
    };

    animateTab(fadeTab1, translateTab1, newTab === 'Tab1' ? 1 : 0, newTab === 'Tab1' ? 0 : -width * direction, tab === 'Tab1' ? 0 : width * direction);
    animateTab(fadeTab2, translateTab2, newTab === 'Tab2' ? 1 : 0, newTab === 'Tab2' ? 0 : -width * direction, tab === 'Tab2' ? 0 : width * direction);
    animateTab(fadeTab3, translateTab3, newTab === 'Tab3' ? 1 : 0, newTab === 'Tab3' ? 0 : -width * direction, tab === 'Tab3' ? 0 : width * direction);

    Animated.parallel(animations).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.noblexText}>Noblex</ThemedText>
          <SegmentedButtons
            value={tab}
            onValueChange={handleTabChange}
            buttons={[
              { value: 'Tab1', icon: 'card', label: '' },
              { value: 'Tab2', icon: 'format-list-bulleted', label: '' },
              { value: 'Tab3', icon: 'calendar', label: '' },
            ]}
            style={styles.segmented}
          />
        </View>

        <View style={styles.content}>
          {/* Tab 1 */}
          {/* Tab 1 */}
          <Animated.View
            style={[
              styles.animatedContainer,
              {
                opacity: fadeTab1,
                transform: [{ translateX: translateTab1 }],
              },
            ]}
          >
            <MemoizedCampusBuzz handlePresentModalPress={handlePresentModalPress} handlePresentModalClose={handlePresentModalClose} />
          </Animated.View>

          {/* Tab 2 */}
          <Animated.View
            style={[
              styles.animatedContainer,
              {
                opacity: fadeTab2,
                transform: [{ translateX: translateTab2 }],
              },
            ]}
          >
            <MemoizedList handlePresentModalPress={handlePresentModalPress} handlePresentModalClose={handlePresentModalClose} />
          </Animated.View>

          {/* Tab 3 */}
          <Animated.View
            style={[
              styles.animatedContainer,
              {
                opacity: fadeTab3,
                transform: [{ translateX: translateTab3 }],
              },
            ]}
          >
            <ScheduleView />
          </Animated.View>
        </View>
        <BottomSheetModalProvider>
          <BottomSheetModal
            snapPoints={["34%", "90%"]}
            handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#ffffffff' : '#000000ff' }}
            handleStyle={{
              backgroundColor: colorScheme === 'dark' ? '#524e4eff' : '#ffffffff',
              borderTopEndRadius: 20,
              borderTopStartRadius: 20
            }}
            ref={bottomSheetModalRef}
            backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#1a1a1aff' : '#ffffffff' }}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={[styles.contentContainer, { backgroundColor: colorScheme === 'dark' ? '#232323ff' : '#ffffffff' }]}>
              <ScrollView style={{
                gap: 50
              }}>
                <ThemedText type='title'>
                  Event Title
                </ThemedText>
                <ThemedText type='subtitle'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, animi?
                </ThemedText>
                <ThemedText>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam est expedita maxime, quod dignissimos in quae nemo quia, obcaecati fugit numquam laudantium nesciunt quos sit quaerat accusamus dolores aliquam?
                </ThemedText>
              </ScrollView>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 4, paddingHorizontal: 4, height: "100%" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  noblexText: {
    marginRight: 16,
  },
  segmented: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: { flex: 1, position: 'relative' },
  animatedContainer: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
