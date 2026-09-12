import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Entry {
    title: string;
    date: Date;
}

const allEntries: Entry[] = [
    { title: "Soccer game", date: new Date(2022, 1, 8, 20, 15) },
    { title: "Planning vacation!", date: new Date(2022, 1, 8, 20, 15) },
    { title: "Visiting family", date: new Date(2022, 1, 8, 20, 15) },
    { title: "First day at work", date: new Date(2022, 1, 9, 12, 14) },
    { title: "Grocery shopping", date: new Date(2022, 1, 10, 9, 30) },
    { title: "Movie night", date: new Date(2022, 1, 11, 21, 0) },
];

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

export default function AllEntriesScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Entries</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Scrollable list */}
            <FlatList
                data={allEntries}
                keyExtractor={(item, index) => item.title + index}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => (
                    <View
                        style={[
                            styles.entry,
                            index !== allEntries.length - 1 && styles.entryDivider,
                        ]}
                    >
                        <View style={styles.entryBar} />
                        <View style={styles.entryTextContainer}>
                            <Text style={styles.entryTitle}>{item.title}</Text>
                            <Text style={styles.entryDate}>{formatEntryDate(item.date)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    listContent: {
        paddingBottom: 40,
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
});