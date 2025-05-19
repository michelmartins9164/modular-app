// /public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB3vZaQ41mSwiC8oG15WEj3T6KsGobZO9Q",
  authDomain: "meu-estoque-ab504.firebaseapp.com",
  projectId: "meu-estoque-ab504",
  storageBucket: "meu-estoque-ab504.firebasestorage.app",
  messagingSenderId: "446635912188",
  appId: "1:446635912188:web:e3fa531c22e52c2cea6079",
  measurementId: "G-K7WH7EWHQY"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  });
});
