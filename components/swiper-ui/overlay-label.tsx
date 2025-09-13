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
        >
            <ThemedText type='title'>
                Interested
            </ThemedText>
        </View>
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
                Skip
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
                    backgroundColor: 'gray',
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
                    backgroundColor: 'gray',
                },
            ]}
        />
    );
});

const styles = StyleSheet.create({
    overlayLabelContainer: {
        borderRadius: 20,
        height: '90%',
        width: '90%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})
