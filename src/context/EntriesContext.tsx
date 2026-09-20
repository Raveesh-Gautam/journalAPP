import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../../firebaseConfig';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';

export interface Entry {
    id: string;
    title: string;
    body: string;
    imageUri: string | null;
    date: Date;
}

interface EntriesContextType {
    entries: Entry[];
    loading: boolean;
    addEntry: (entry: Omit<Entry, 'id' | 'date'>) => Promise<void>;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export function EntriesProvider({ children }: { children: ReactNode }) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    // 👇 Yeh Firestore ka REAL-TIME LISTENER hai
    // Jab bhi "entries" collection mein kuch add/change hota hai, ye automatically re-run hota hai
    // Isliye alag se "fetch" function call karne ki zarurat nahi
    useEffect(() => {
        const entriesRef = collection(db, 'entries');
        const q = query(entriesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data: Entry[] = snapshot.docs.map((docSnap) => {
                    const d = docSnap.data();
                    return {
                        id: docSnap.id,
                        title: d.title,
                        body: d.body,
                        imageUri: d.imageUri ?? null,
                        // Firestore Timestamp ko JS Date mein convert kar rahe hain
                        date: d.createdAt instanceof Timestamp ? d.createdAt.toDate() : new Date(),
                    };
                });
                setEntries(data);
                setLoading(false);
            },
            (error) => {
                console.error('Error listening to entries:', error);
                setLoading(false);
            }
        );

        // Cleanup: jab component unmount ho to listener band karo (memory leak se bachne ke liye)
        return () => unsubscribe();
    }, []);

    const addEntry = async (entry: Omit<Entry, 'id' | 'date'>) => {
        try {
            const entriesRef = collection(db, 'entries');
            await addDoc(entriesRef, {
                title: entry.title,
                body: entry.body,
                imageUri: entry.imageUri,
                createdAt: serverTimestamp(),
            });
            // Note: setEntries() yahan manually call nahi karna —
            // onSnapshot listener automatically nayi entry list mein add kar dega
        } catch (error) {
            console.error('Error adding entry:', error);
            throw error;
        }
    };

    return (
        <EntriesContext.Provider value={{ entries, loading, addEntry }}>
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