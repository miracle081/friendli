import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByHpWp9HRBTb0nXIueil84vHw1dhB6o2U",
    authDomain: "friendli-9d2ff.firebaseapp.com",
    projectId: "friendli-9d2ff",
    storageBucket: "friendli-9d2ff.firebasestorage.app",
    messagingSenderId: "494450733705",
    appId: "1:494450733705:web:13c3660cb59d5a4237cc58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);