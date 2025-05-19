// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB3vZaQ41mSwiC8oG15WEj3T6KsGobZO9Q",
  authDomain: "meu-estoque-ab504.firebaseapp.com",
  projectId: "meu-estoque-ab504",
  storageBucket: "meu-estoque-ab504.firebasestorage.app",
  messagingSenderId: "446635912188",
  appId: "1:446635912188:web:e3fa531c22e52c2cea6079",
  measurementId: "G-K7WH7EWHQY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app); // Não use direto ainda

export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null
);
