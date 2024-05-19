// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzR_xAnao-Yqckfi16Y18hfPI3But3RGs",
  authDomain: "help-desk-55101.firebaseapp.com",
  projectId: "help-desk-55101",
  storageBucket: "help-desk-55101.appspot.com",
  messagingSenderId: "59485103012",
  appId: "1:59485103012:web:9868016ed1bdd75cb69731"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);