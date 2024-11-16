// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "studybuddy-f56ca.firebaseapp.com",
  projectId: "studybuddy-f56ca",
  storageBucket: "studybuddy-f56ca.firebasestorage.app",
  messagingSenderId: "974534902469",
  appId: "1:974534902469:web:cae4776c8de27c1105a6ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);