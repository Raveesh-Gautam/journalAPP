import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEntries } from '@/context/EntriesContext';

export default function TodayEntryCard() {
    const router = useRouter();
    const { entries } = useEntries();

    // entries already sabse naya pehle order mein hain (createdAt desc)
    // isliye entries[0] hi sabse recent/latest entry hai
    const latestEntry = entries[0];

    // Agar abhi tak koi entry hi nahi hai to ye card kuch bhi render nahi karega
    if (!latestEntry) return null;

    const time = latestEntry.date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/entry/${latestEntry.id}`)}
        >
            {latestEntry.imageUri ? (
                <Image source={{ uri: latestEntry.imageUri }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.imagePlaceholder]} />
            )}

            <View style={styles.overlay} />

            <View style={styles.timeTag}>
                <Text style={styles.timeText}>{time}</Text>
            </View>

            <Text style={styles.title} numberOfLines={2}>
                {latestEntry.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 210,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        backgroundColor: '#E5E5E5',
    },
    image: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        backgroundColor: '#D9D9D9',
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    timeTag: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.85)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    timeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#000',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
        padding: 12,
    },
});