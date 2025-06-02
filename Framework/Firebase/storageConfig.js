import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// ======================== Firebase: Note =====================
const firebaseConfig = {
    apiKey: "AIzaSyC-fwUy9KmKs4l3vOMMOtMWvMs6LBmrYz4",
    authDomain: "note-b7625.firebaseapp.com",
    projectId: "note-b7625",
    storageBucket: "note-b7625.appspot.com",
    messagingSenderId: "955552726801",
    appId: "1:955552726801:web:e639b9fe16993654ebd6b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
