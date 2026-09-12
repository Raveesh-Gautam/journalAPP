import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AtSign, Bold, Check, ChevronLeft, Image as ImageIcon, Italic, MoreHorizontal, Plus, Share2, SmilePlus, Trash2, Underline } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEntries } from '@/context/EntriesContext';

export default function CreatePost() {
    const router = useRouter();
    const { addEntry } = useEntries();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
    });

    const insertAtCursor = (text: string) => {
        const before = body.slice(0, selection.start);
        const after = body.slice(selection.end);
        setBody(before + text + after);
        const newCursorPos = selection.start + text.length;
        setSelection({ start: newCursorPos, end: newCursorPos });
    };

    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission needed', 'Please allow access to your photos to add an image.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleDelete = () => {
        Alert.alert('Delete entry?', 'This will clear everything you\'ve written.', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    setTitle('');
                    setBody('');
                    setImageUri(null);
                    router.back();
                },
            },
        ]);
    };

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Title required', 'Please add a title before saving.');
            return;
        }

        addEntry({ title, body, imageUri });
        router.back(); // Home screen pe wapas
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerRightIcons}>
                    <TouchableOpacity style={{ marginRight: 16 }}>
                        <Share2 size={20} color="#000" />
                    </TouchableOpacity>
                    {/* 👇 Save button add kiya */}
                    <TouchableOpacity onPress={handleSave} style={{ marginRight: 16 }}>
                        <Check size={22} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MoreHorizontal size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.dateRow}>
                <Text style={styles.dateText}>{today}</Text>
                <TouchableOpacity style={styles.moodButton}>
                    <SmilePlus size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.card} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.titleRow}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title"
                        placeholderTextColor="#B0B0B5"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.timeText}>{currentTime}</Text>
                </View>

                <TextInput
                    style={[styles.bodyInput, isBold && styles.bold, isItalic && styles.italic, isUnderline && styles.underline]}
                    placeholder="Write your thoughts..."
                    placeholderTextColor="#B0B0B5"
                    value={body}
                    onChangeText={setBody}
                    onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
                    multiline
                    textAlignVertical="top"
                />

                {imageUri && (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                        <TouchableOpacity style={styles.removeImageButton} onPress={() => setImageUri(null)}>
                            <Trash2 size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <View style={styles.toolbar}>
                <TouchableOpacity onPress={() => insertAtCursor('\n• ')}>
                    <Plus size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePickImage}>
                    <ImageIcon size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => insertAtCursor('@')}>
                    <AtSign size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.formatGroup}>
                    <TouchableOpacity onPress={() => setIsBold((p) => !p)}>
                        <Bold size={18} color={isBold ? '#4F46E5' : '#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsItalic((p) => !p)} style={{ marginHorizontal: 10 }}>
                        <Italic size={18} color={isItalic ? '#4F46E5' : '#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsUnderline((p) => !p)}>
                        <Underline size={18} color={isUnderline ? '#4F46E5' : '#000'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleDelete}>
                    <Trash2 size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EFEFEF', paddingHorizontal: 20, paddingTop: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 22 },
    headerRightIcons: { flexDirection: 'row', alignItems: 'center' },
    dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    dateText: { fontSize: 20, fontWeight: '700', color: '#000', flex: 1 },
    moodButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
    card: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
    titleInput: { fontSize: 22, fontWeight: '700', color: '#000', flex: 1 },
    timeText: { fontSize: 12, color: '#B0B0B5', marginLeft: 8 },
    bodyInput: { fontSize: 15, lineHeight: 22, color: '#666666', minHeight: 300 },
    bold: { fontWeight: '700' },
    italic: { fontStyle: 'italic' },
    underline: { textDecorationLine: 'underline' },
    imageWrapper: { marginTop: 16, position: 'relative' },
    previewImage: { width: '100%', height: 200, borderRadius: 12 },
    removeImageButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 14, padding: 6 },
    toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
    formatGroup: { flexDirection: 'row', alignItems: 'center' },
});