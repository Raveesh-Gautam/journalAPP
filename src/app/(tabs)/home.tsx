import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { ChevronLeft, LogOut } from "lucide-react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CalendarHeader from '@/components/home/CalendarHeader'
import RecentEntries from '@/components/home/RecentEntries'
import AddEntryTile from '@/components/home/AddEntryTile'
import TodayEntryCard from '@/components/home/TodayEntryCard'
import { auth } from '../../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Home() {
    const router = useRouter();
    const [userName, setUserName] = useState('User')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.displayName) {
                const firstName = user.displayName.split(' ')[0];
                setUserName(firstName);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        Alert.alert('Logout?', 'Do you really want to Logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await GoogleSignin.signOut();
                        await signOut(auth);
                        router.replace('/welcome');
                    } catch (error) {
                        console.error('Logout error:', error);
                        Alert.alert('Error', 'Logout nahi ho paya, dobara try karo.');
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={{ flex: 1 }}>
                    <CalendarHeader userName={userName} />
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.todayRow}>
                <View style={{ marginLeft: 12 }}>
                    <TodayEntryCard />
                </View>
                <AddEntryTile />
            </View>
            <RecentEntries />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 30,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    logoutButton: {
        marginTop: 20,
        marginRight: 20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todayRow: {
        flexDirection: 'row',
    },
})