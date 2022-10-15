// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0cSFVQL6VexR5IE1P1MtEVZ8_CWooxLI",
  authDomain: "fir-practice-2b211.firebaseapp.com",
  projectId: "fir-practice-2b211",
  storageBucket: "fir-practice-2b211.appspot.com",
  messagingSenderId: "452770881107",
  appId: "1:452770881107:web:6bf07678eb2ee5f1ae70a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();