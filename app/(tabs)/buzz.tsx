/* eslint-disable react-native/no-inline-styles */
import { OverlayLabelBottom, OverlayLabelLeft, OverlayLabelRight, OverlayLabelTop } from '@/components/swiper-ui/overlay-label';
import { ThemedText } from '@/components/themed-text';
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
    const renderCard = useCallback((image: ImageSourcePropType, index: number) => {
        return (
            <View style={[styles.renderCardContainer, { backgroundColor: colorScheme === 'dark' ? '#000000ff' : '#ffffffff' }]}>
                <Image
                    source={image}
                    style={styles.renderCardImage}
                    resizeMode="cover"
                />
                <View>
                    <ThemedText type='title'>
                        Event Title
                    </ThemedText>
                    <ThemedText type='default'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate, debitis excepturi eos officiis odit cumque quibusdam labore doloremque ad!
                    </ThemedText>
                </View>
            </View>
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
                    onSwipeTop={(cardIndex) => {
                        console.log('onSwipeTop', cardIndex);
                    }}
                    onSwipeBottom={(cardIndex) => {
                        console.log('onSwipeBottom', cardIndex);
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

            {/* <View style={styles.buttonsContainer}>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.flipCard();
                    }}
                >
                    <AntDesign name="sync" size={ICON_SIZE} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeBack();
                    }}
                >
                    <AntDesign name="reload" size={ICON_SIZE} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeLeft();
                    }}
                >
                    <AntDesign name="close" size={ICON_SIZE} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeBottom();
                    }}
                >
                    <AntDesign name="down" size={ICON_SIZE} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeTop();
                    }}
                >
                    <AntDesign name="up" size={ICON_SIZE} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeRight();
                    }}
                >
                    <AntDesign name="heart" size={ICON_SIZE} color="white" />
                </ActionButton>
            </View> */}
        </GestureHandlerRootView>
    );
};

export default CampusBuzz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: '90%',
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    renderCardImage: {
        height: screenHeight * 0.64,
        width: '100%',
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