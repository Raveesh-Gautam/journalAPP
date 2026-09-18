import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEntries } from "@/context/EntriesContext";

function formatEntryDate(date: Date): string {
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const day = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return `${time} · ${day}`;
}

export default function RecentEntries() {
    const router = useRouter();
    const { entries } = useEntries();
    console.log('RecentEntries - entries count:', entries.length, JSON.stringify(entries));


    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.recentEntriesTitle}>Recent Entries</Text>
                <TouchableOpacity onPress={() => router.push('/all-entries')}>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listCard}>
                {entries.slice(0, 3).map((entry, index) => (
                    <TouchableOpacity
                        key={entry.id}
                        onPress={() => router.push(`/entry/${entry.id}`)}
                        style={[
                            styles.entry,
                            index !== Math.min(entries.length, 3) - 1 && styles.entryDivider,
                        ]}
                    >
                        <View style={styles.entryBar} />
                        <View style={styles.entryTextContainer}>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text style={styles.entryDate}>{formatEntryDate(entry.date)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => router.push('/create-post')}>
                <Plus size={26} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        marginHorizontal: 10
    },
    recentEntriesTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    viewAllText: {
        fontSize: 13,
        color: '#B0B0B5',
    },
    listCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    entry: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    entryDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    entryBar: {
        width: 4,
        height: 34,
        borderRadius: 2,
        backgroundColor: '#000000',
        marginRight: 14,
    },
    entryTextContainer: {
        flex: 1,
    },
    entryTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 4,
    },
    entryDate: {
        fontSize: 12,
        color: '#B0B0B5',
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
});