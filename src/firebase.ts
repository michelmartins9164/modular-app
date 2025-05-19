// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBr2_w1G-S_ax9TtXQ4Wkx7psouvalG-go",
  authDomain: "toindo-b7e3e.firebaseapp.com",
  projectId: "toindo-b7e3e",
  storageBucket: "toindo-b7e3e.firebasestorage.app",
  messagingSenderId: "1092190263987",
  appId: "1:1092190263987:web:9754c23c804bc0faad2ec6",
  measurementId: "G-F7V010ECYE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const messaging = getMessaging(app);

export const getFCMToken = async (registration?: ServiceWorkerRegistration) => {
  const supported = await isSupported();
  if (!supported) return null;

  return getToken(messaging, {
    vapidKey: 'BAo5cZ8xU9HMjdnT-2ZtLF_iBezBtLcJBfHvFuaKt-qZYNHKriPlxgvL-y1nOHZOKysrQ2NhdkfZWumPqa2GpYs',
    serviceWorkerRegistration: registration,
  });
};