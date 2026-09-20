// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// @ts-ignore - getReactNativePersistence exists at runtime but isn't properly typed
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyAM_PAVwAycvUcccr4kkKJUAIhGIc8gRNc",
    authDomain: "ecom-4f83d.firebaseapp.com",
    projectId: "ecom-4f83d",
    storageBucket: "ecom-4f83d.firebasestorage.app",
    messagingSenderId: "801921960391",
    appId: "1:801921960391:web:f58c73e689f66b5ceb31e2",
    measurementId: "G-CXCE6XCQLF"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

let auth: Auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} catch (error) {
    auth = getAuth(app);
}

export { app, db, auth };