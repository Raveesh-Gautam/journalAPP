import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarHeaderProps {
    userName?: string;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Always returns Sunday -> Saturday for the CURRENT calendar week
function getCurrentWeekDates(): Date[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDayIndex = today.getDay(); // 0 = Sun ... 6 = Sat
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDayIndex);

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return d;
    });
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export default function CalendarHeader({ userName = 'User' }: CalendarHeaderProps) {
    const [greeting, setGreeting] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [weekDates, setWeekDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();
            const dateTime = new Date();
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = dateTime.toLocaleDateString('en-US', options);
            setFormattedDate(formattedDate);

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('GoodMorning ');
            } else if (currentHour >= 12 && currentHour < 17) {
                setGreeting('GoodAfternoon ');
            } else if (currentHour >= 17 && currentHour < 22) {
                setGreeting('GoodEvening ');
            } else {
                setGreeting('GoodNight ');
            }
        };

        updateGreeting();

        // Build this week's Sun-Sat dates and select today by default
        const dates = getCurrentWeekDates();
        setWeekDates(dates);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setSelectedDate(dates.find((d) => isSameDay(d, today)) || dates[0]);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.userNameText}>{userName}</Text>
            </View>
            <Text style={styles.dateText}>{formattedDate}</Text>

            <View style={styles.weekStrip}>
                {weekDates.map((date, index) => {
                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                    return (
                        <TouchableOpacity
                            key={date.toISOString()}
                            style={styles.dayColumn}
                            onPress={() => setSelectedDate(date)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>
                                {DAY_LABELS[index]}
                            </Text>
                            <View style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}>
                                <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>
                                    {date.getDate()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
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
        marginVertical: 10,
    },
    greetingText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '700',
    },
    userNameText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '700',
    },
    dateText: {
        fontSize: 13,
        color: '#EBEBEB',
        fontWeight: '700',
    },
    weekStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
    },
    dayColumn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayLabel: {
        fontSize: 13,
        color: '#B0B0B5',
        marginBottom: 10,
    },
    dayLabelSelected: {
        color: '#000000',
        fontWeight: '600',
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircleSelected: {
        backgroundColor: '#000000',
    },
    dayNumber: {
        fontSize: 14,
        color: '#B0B0B5',
    },
    dayNumberSelected: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});