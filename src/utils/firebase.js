// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVla2_67lB3w7Pb4NpS2SaaKk2AeLKLcw",
  authDomain: "netflixgpt-e09f3.firebaseapp.com",
  projectId: "netflixgpt-e09f3",
  storageBucket: "netflixgpt-e09f3.firebasestorage.app",
  messagingSenderId: "197019098762",
  appId: "1:197019098762:web:dee14760a7f31f793ed773",
  measurementId: "G-DRFZK9HK5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();