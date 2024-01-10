import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ71_HFtsAhnup59k4NarbmV7jBgE2zo0",
  authDomain: "c-olly.firebaseapp.com",
  databaseURL: "https://c-olly-default-rtdb.firebaseio.com",
  projectId: "c-olly",
  storageBucket: "c-olly.appspot.com",
  messagingSenderId: "334875982655",
  appId: "1:334875982655:web:7256a4dc6577d4069af18a",
  measurementId: "G-MES0RL6CV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);




export { db, storage, app };