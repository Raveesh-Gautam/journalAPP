// firebaseConfig.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import {
    getAuth,
    initializeAuth,
    // @ts-ignore
    getReactNativePersistence,
    Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyAM_PAVwAycvUcccr4kkKJUAIhGIc8gRNc",
    authDomain: "ecom-4f83d.firebaseapp.com",
    projectId: "ecom-4f83d",
    storageBucket: "ecom-4f83d.firebasestorage.app",
    messagingSenderId: "801921960391",
    appId: "1:801921960391:web:f58c73e689f66b5ceb31e2",
    measurementId: "G-CXCE6XCQLF",
};

// Safely extract storage instance for @react-native-async-storage/async-storage v2.x
const storage = (AsyncStorage as any)?.setItem ? AsyncStorage : (AsyncStorage as any)?.default;

// Initialize Firebase App only once
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firestore
const db: Firestore = getFirestore(app);

// Auth with AsyncStorage persistence, safely handling Fast Refresh / HMR re-evaluations
let auth: Auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(storage),
    });
} catch (error) {
    // If auth was already initialized for this app (e.g. during Fast Refresh / HMR), get the existing instance
    // auth = getAuth(app);
}

export { app, db, auth };