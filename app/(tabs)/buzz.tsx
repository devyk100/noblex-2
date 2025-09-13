/* eslint-disable react-native/no-inline-styles */
import { OverlayLabelBottom, OverlayLabelLeft, OverlayLabelRight, OverlayLabelTop } from '@/components/swiper-ui/overlay-label';
import { ThemedText } from '@/components/themed-text';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    type ImageSourcePropType,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';

const screenHeight = Dimensions.get('window').height;

const IMAGES: ImageSourcePropType[] = [
    require('@/assets/images/1.jpg'),
    require('@/assets/images/2.jpg'),
    require('@/assets/images/3.jpg'),
    require('@/assets/images/4.jpg'),
    require('@/assets/images/5.jpg'),
    require('@/assets/images/6.jpg'),
];

const ICON_SIZE = 24;


const CampusBuzz = () => {
    const ref = useRef<SwiperCardRefType>(null);
    const colorScheme = useColorScheme()
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const renderCard = useCallback((image: ImageSourcePropType, index: number) => {
        return (
            <>

                <SafeAreaView style={[styles.renderCardContainer, { backgroundColor: colorScheme === 'dark' ? '#000000ff' : '#ffffffff' }]}>
                    <Image
                        source={image}
                        style={styles.renderCardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.renderCardTextContainer}>
                        <ThemedText type='title'>
                            Event Title
                        </ThemedText>
                        <ThemedText type='default'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate, debitis excepturi eos officiis odit cumque quibusdam labore doloremque ad!
                        </ThemedText>
                    </View>
                </SafeAreaView>
            </>
        );
    }, []);
    const renderFlippedCard = useCallback(
        (_: ImageSourcePropType, index: number) => {
            return (
                <View style={styles.renderFlippedCardContainer}>
                    <Text style={styles.text}>Flipped content 🚀 {index}</Text>
                </View>
            );
        },
        []
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.subContainer}>
                <Swiper
                    ref={ref}
                    data={IMAGES}
                    disableTopSwipe
                    disableBottomSwipe
                    cardStyle={styles.cardStyle}
                    overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
                    renderCard={renderCard}
                    onIndexChange={(index) => {
                        console.log('Current Active index', index);
                    }}
                    onSwipeRight={(cardIndex) => {
                        console.log('cardIndex', cardIndex);
                    }}
                    onPress={() => {
                        console.log('onPress');
                    }}
                    onSwipedAll={() => {
                        console.log('onSwipedAll');
                    }}
                    FlippedContent={renderFlippedCard}
                    onSwipeLeft={(cardIndex) => {
                        console.log('onSwipeLeft', cardIndex);
                    }}
                    OverlayLabelRight={OverlayLabelRight}
                    OverlayLabelLeft={OverlayLabelLeft}
                    OverlayLabelTop={OverlayLabelTop}
                    OverlayLabelBottom={OverlayLabelBottom}
                    onSwipeActive={() => {
                        console.log('onSwipeActive');
                    }}
                    onSwipeStart={() => {
                        console.log('onSwipeStart');
                    }}
                    onSwipeEnd={() => {
                        console.log('onSwipeEnd');
                    }}
                />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>

    );
};

export default CampusBuzz;

const styles = StyleSheet.create({
    dockViewContent: {
        flex: 1,
        backgroundColor: '#eee',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        bottom: 34,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },
    button: {
        height: 50,
        borderRadius: 40,
        aspectRatio: 1,
        backgroundColor: '#3A3D45',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    renderCardContainer: {
        width: '100%',
        height: '100%',
    },
    renderCardTextContainer: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        gap: 10
    },
    renderFlippedCardContainer: {
        borderRadius: 15,
        backgroundColor: '#baeee5',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardStyle: {
        width: '90%',
        height: '100%',
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    renderCardImage: {
        height: screenHeight * 0.66,
        width: '100%',
        borderRadius: 5
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#001a72',
    },
    overlayLabelContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});