import { } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

export default function RoundButton({onPress, children}: {
    onPress: () => void;
    children: React.ReactNode
}) {
    const colorScheme = useColorScheme()
    return (
        <TouchableRipple
            style={styles.roundButton}
            borderless={true}  // ensures ripple doesn't clip to rectangular container
            onPress={onPress}
        >
            <View style={styles.roundButtonContent}>
                {children}
            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    roundButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        borderRadius: 25, // half of width/height
        overflow: 'hidden', // clip ripple properly
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
