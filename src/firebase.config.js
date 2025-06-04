// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS0OOIPoTr3OuteSjfIv3I13Fe2NvmI08",
  authDomain: "studious-74a69.firebaseapp.com",
  projectId: "studious-74a69",
  storageBucket: "studious-74a69.firebasestorage.app",
  messagingSenderId: "912532432365",
  appId: "1:912532432365:web:074d4516b8a1a8ce6e33e4",
  measurementId: "G-E6RMDS5D4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };