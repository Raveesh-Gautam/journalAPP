import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AddEntryTile() {
    const router = useRouter();

    return (
        <View style={{ marginHorizontal: 10 }}>
            <TouchableOpacity
                style={styles.addTile}
                onPress={() => router.push('/create-post')}
                activeOpacity={0.7}
            >
                <Plus size={28} color="#999999" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addTile: {
        width: 160,
        height: 210,
        borderRadius: 20,
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});