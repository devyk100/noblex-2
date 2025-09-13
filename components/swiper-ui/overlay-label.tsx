import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';

export const OverlayLabelRight = (() => {
    return (
        <View
            style={[
                styles.overlayLabelContainer,
                {
                    backgroundColor: 'green',
                },
            ]}
        />
    );
});

export const OverlayLabelLeft = (() => {
    return (
        <View
            style={[
                styles.overlayLabelContainer,
                {
                    backgroundColor: 'red',
                },
            ]}
        >
            <ThemedText type='title'>
                Hello
            </ThemedText>
        </View>
    );
});

export const OverlayLabelTop = (() => {
    return (
        <View
            style={[
                styles.overlayLabelContainer,
                {
                    backgroundColor: 'blue',
                },
            ]}
        />
    );
});
export const OverlayLabelBottom = (() => {
    return (
        <View
            style={[
                styles.overlayLabelContainer,
                {
                    backgroundColor: 'orange',
                },
            ]}
        />
    );
});

const styles = StyleSheet.create({
    overlayLabelContainer: {
        borderRadius: 15,
        height: '90%',
        width: '90%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})
