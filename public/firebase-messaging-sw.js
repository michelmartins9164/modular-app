importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "BAGyDSe4JGiUDkGYHBDO-c9IML0xqtn8K6WHq9kuL2I6Wz-ujRMxdZon-j3uPU0XINkiCeDnRGqYnPgcvW-RHwQ",
  authDomain: "meu-estoque-ab504.firebaseapp.com",
  projectId: "meu-estoque-ab504",
  storageBucket: "meu-estoque-ab504.firebasestorage.app",
  messagingSenderId: "446635912188",
  appId: "1:446635912188:web:e3fa531c22e52c2cea6079",
  measurementId: "G-K7WH7EWHQY"
});


messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  });
});

const messaging = firebase.messaging();