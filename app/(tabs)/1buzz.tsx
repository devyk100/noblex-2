/* eslint-disable react-native/no-inline-styles */
import { OverlayLabelBottom, OverlayLabelLeft, OverlayLabelRight, OverlayLabelTop } from '@/components/swiper-ui/overlay-label';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import RoundButton from '@/components/ui/round-button';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    type ImageSourcePropType,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Snackbar } from 'react-native-paper';
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
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

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
                        <Button
                            mode="contained-tonal" // "text" | "outlined" | "contained"
                            onPress={() => {
                                handlePresentModalPress()
                                onToggleSnackBar()
                            }}
                            style={{
                                paddingHorizontal: 10
                            }}
                        >Know more</Button>
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
            <BottomSheetModalProvider >
                <BottomSheetModal
                    snapPoints={["20%", "90%"]}
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
            <RoundButton onPress={() => {
                ref.current?.swipeBack();
            }}>
                <IconSymbol size={28} name="rotate.left" color={colorScheme!} />
            </RoundButton>
            {/* <Button mode="contained" onPress={onToggleSnackBar}>
                Show Snackbar
            </Button> */}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        console.log('Undo pressed');
                    },
                }}
                duration={400} // optional: auto-dismiss after 3s
            >
                Open the dock to see more details
            </Snackbar>
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