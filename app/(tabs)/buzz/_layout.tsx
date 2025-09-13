import { ThemedText } from '@/components/themed-text';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CampusBuzz from './buzz';
import List from './list';

const { width } = Dimensions.get('window');

export default function MyRouteScreen() {
  const [tab, setTab] = useState('Tab1');
  const colorScheme = useColorScheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Animated values for each tab
  const fadeTab1 = useRef(new Animated.Value(1)).current;
  const fadeTab2 = useRef(new Animated.Value(0)).current;
  const translateTab1 = useRef(new Animated.Value(0)).current;
  const translateTab2 = useRef(new Animated.Value(width)).current;
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;
    setTab(newTab);
    bottomSheetModalRef.current?.forceClose()

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
      <GestureHandlerRootView style={styles.container}>

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
            <CampusBuzz handlePresentModalPress={handlePresentModalPress} handlePresentModalClose={handlePresentModalClose} />
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
            <List handlePresentModalPress={handlePresentModalPress} handlePresentModalClose={handlePresentModalClose}/>
          </Animated.View>
        </View>
        <BottomSheetModalProvider >
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
  segmented: { marginBottom: 16 },
  content: { flex: 1, position: 'relative' },
  animatedContainer: { flex: 1 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
