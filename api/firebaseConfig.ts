// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqzad_iVd1pog0YY2wb2loHwAols5mAjE",
  authDomain: "activitiemanagement.firebaseapp.com",
  projectId: "activitiemanagement",
  storageBucket: "activitiemanagement.firebasestorage.app",
  messagingSenderId: "956992863874",
  appId: "1:956992863874:web:706fa8221aa67af310be9b",
  measurementId: "G-MZZTJXFL75",
};

// Inicializa de forma segura para o Next.js
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
