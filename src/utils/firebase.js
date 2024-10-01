// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDGHFJr-TRlcjjMDYGqCQJl7pfDrseezs",
  authDomain: "mood-show.firebaseapp.com",
  projectId: "mood-show",
  storageBucket: "mood-show.appspot.com",
  messagingSenderId: "715443648617",
  appId: "1:715443648617:web:56fc35662bce5378d04af8",
  measurementId: "G-BB92RM6FES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export { updateProfile }; 
