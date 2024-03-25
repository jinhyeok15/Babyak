// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "babyak-f3400.firebaseapp.com",
  projectId: "babyak-f3400",
  storageBucket: "babyak-f3400.appspot.com",
  messagingSenderId: "490101627604",
  appId: "1:490101627604:web:c8c6396c4d71317e143941",
  measurementId: "G-8GQ3GTSS2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
