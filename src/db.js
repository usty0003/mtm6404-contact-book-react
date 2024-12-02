import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxg-HaG2rjYllrkA_gh0-Lqy0t8UFx93U",
  authDomain: "contacts-71079.firebaseapp.com",
  projectId: "contacts-71079",
  storageBucket: "contacts-71079.firebasestorage.app",
  messagingSenderId: "321609376655",
  appId: "1:321609376655:web:b8c4767b4c74dc61dde1fa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };