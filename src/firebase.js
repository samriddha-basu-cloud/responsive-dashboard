// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace the values below with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3O67AfUup9MzAhqoA8EGBhzVY1RBKZUs",
  authDomain: "gizform.firebaseapp.com",
  projectId: "gizform",
  storageBucket: "gizform.firebasestorage.app",
  messagingSenderId: "590854429220",
  appId: "1:590854429220:web:5ad1fff75c1138c82c96b1"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
export const auth = getAuth(app);

// Initialize Firebase Firestore and export it
export const db = getFirestore(app);