import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Entry {
    id: string;
    title: string;
    body: string;
    imageUri: string | null;
    date: Date;
}

interface EntriesContextType {
    entries: Entry[];
    addEntry: (entry: Omit<Entry, 'id' | 'date'>) => void;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export function EntriesProvider({ children }: { children: ReactNode }) {
    const [entries, setEntries] = useState<Entry[]>([]);

    const addEntry = (entry: Omit<Entry, 'id' | 'date'>) => {
        const newEntry: Entry = {
            ...entry,
            id: Date.now().toString(),
            date: new Date(),
        };
        setEntries((prev) => [newEntry, ...prev]);
    };

    return (
        <EntriesContext.Provider value={{ entries, addEntry }}>
            {children}
        </EntriesContext.Provider>
    );
}

export function useEntries() {
    const context = useContext(EntriesContext);
    if (!context) {
        throw new Error('useEntries must be used within EntriesProvider');
    }
    return context;
}