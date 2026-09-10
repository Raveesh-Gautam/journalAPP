import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarHeader from '@/components/home/CalendarHeader'
import CreatePost from '@/components/home/CreatePost'
import RecentEntries from '@/components/home/RecentEntries'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome toJournalsApp</Text>
            <CalendarHeader />
            <CreatePost />
            <RecentEntries />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})