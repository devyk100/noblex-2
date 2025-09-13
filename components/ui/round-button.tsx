import { } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoundButton({ onPress, children }: {
    onPress: () => void;
    children: React.ReactNode
}) {
    const colorScheme = useColorScheme()
    return (
        <SafeAreaView style={styles.roundButtonContainer}>
            <TouchableRipple
                style={styles.roundButton}
                borderless={true}  // ensures ripple doesn't clip to rectangular container
                onPress={onPress}
            >
                <View style={styles.roundButtonContent}>
                    {children}
                </View>
            </TouchableRipple>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    roundButtonContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        borderRadius: 25, // half of width/height
        overflow: 'hidden', // clip ripple properly
    },
    roundButton: {
        borderRadius: 25, // half of width/height
    },
    roundButtonContent: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
