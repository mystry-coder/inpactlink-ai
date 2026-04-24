import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtsR-MN49RB4FzxOMbjD_6eVqyhg46nck",
  authDomain: "impactlink-ai.firebaseapp.com",
  projectId: "impactlink-ai",
  storageBucket: "impactlink-ai.firebasestorage.app",
  messagingSenderId: "230258189887",
  appId: "1:230258189887:web:73ac47261256504e957a8a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);