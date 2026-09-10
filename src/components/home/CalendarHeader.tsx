import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CalendarHeaderProps {
    userName?: string;
}

export default function CalendarHeader({ userName = 'User' }: CalendarHeaderProps) {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good Morning, ');
            } else if (currentHour >= 12 && currentHour < 17) {
                setGreeting('Good Afternoon, ');
            } else if (currentHour >= 17 && currentHour < 22) {
                setGreeting('Good Evening, ');
            } else {
                setGreeting('Good Night, ');
            }
        };

        updateGreeting();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.userNameText}>{userName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'flex-start',
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,

    },
    greetingText: {
        fontSize: 18,
        color: '#666666',
        fontWeight: '500',
    },
    userNameText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '700',
    },
});