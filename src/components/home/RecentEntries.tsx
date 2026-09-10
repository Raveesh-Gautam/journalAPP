import { StyleSheet, Text, View } from "react-native";

export default function RecentEntries() {
    return (
        <View style={styles.container}>
            <Text>RecentEntries</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
