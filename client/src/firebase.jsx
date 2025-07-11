import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA7Qnv1hp8E7Ur3_geabdb6ygvA7rOTFBA",
    authDomain: "skillbridge-a3c1b.firebaseapp.com",
    projectId: "skillbridge-a3c1b",
    storageBucket: "skillbridge-a3c1b.firebasestorage.app",
    messagingSenderId: "899984592993",
    appId: "1:899984592993:web:911bce31324ca612415a20",
    measurementId: "G-PG6MKGY347"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);