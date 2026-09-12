import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CalendarHeader from '@/components/home/CalendarHeader'
import RecentEntries from '@/components/home/RecentEntries'
import AddEntryTile from '@/components/home/AddEntryTile'
export default function Home() {
    return (
        <View style={styles.container}>
            <CalendarHeader userName='Praval' />
            <AddEntryTile />
            <RecentEntries />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FFFFFF',
        marginTop: 30,
    }
})