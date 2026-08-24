import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhX7M-x1vlKcAoEuZ8zSth-cY7POtDSqo",
  authDomain: "learn-lingo-97f28.firebaseapp.com",
  projectId: "learn-lingo-97f28",
  storageBucket: "learn-lingo-97f28.firebasestorage.app",
  messagingSenderId: "754987900463",
  appId: "1:754987900463:web:c119c46a8e9262fcee30da",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
