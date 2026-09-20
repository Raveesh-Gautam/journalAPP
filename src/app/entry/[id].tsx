import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MoreHorizontal, Share2 } from 'lucide-react-native';
import { Alert, Image, Share, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { useEntries } from '@/context/EntriesContext';

export default function EntryDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { entries } = useEntries();

    const entry = entries.find((e) => e.id === id);

    if (!entry) {
        return (
            <View style={styles.container}>
                <Text>Entry nahi mili.</Text>
            </View>
        );
    }

    const dateLabel = entry.date.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const handleShare = async () => {
        try {
            // Agar entry mein image hai, to image share karo (native share sheet, WhatsApp etc mein image ke saath jayega)
            if (entry.imageUri) {
                const isAvailable = await Sharing.isAvailableAsync();
                if (!isAvailable) {
                    Alert.alert('Error', 'Is device pe sharing available nahi hai.');
                    return;
                }
                await Sharing.shareAsync(entry.imageUri, {
                    dialogTitle: entry.title,
                });
            } else {
                // Image nahi hai to sirf text share karo
                await Share.share({
                    title: entry.title,
                    message: `${entry.title}\n\n${entry.body}\n\n${dateLabel}`,
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Share nahi ho paya, dobara try karo.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerRightIcons}>
                    <TouchableOpacity style={{ marginRight: 16 }} onPress={handleShare}>
                        <Share2 size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MoreHorizontal size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.dateText}>{dateLabel}</Text>

            <ScrollView style={styles.card} contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.body}>{entry.body}</Text>

                {entry.imageUri && (
                    <Image source={{ uri: entry.imageUri }} style={styles.image} />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFEFEF', paddingHorizontal: 20, paddingTop: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 22 },
    headerRightIcons: { flexDirection: 'row', alignItems: 'center' },
    dateText: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 16 },
    card: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20 },
    title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 12 },
    body: { fontSize: 15, lineHeight: 22, color: '#666666', marginBottom: 16 },
    image: { width: '100%', height: 220, borderRadius: 12 },
});