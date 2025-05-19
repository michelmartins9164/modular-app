importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBr2_w1G-S_ax9TtXQ4Wkx7psouvalG-go",
  authDomain: "toindo-b7e3e.firebaseapp.com",
  projectId: "toindo-b7e3e",
  storageBucket: "toindo-b7e3e.firebasestorage.app",
  messagingSenderId: "1092190263987",
  appId: "1:1092190263987:web:9754c23c804bc0faad2ec6",
  measurementId: "G-F7V010ECYE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log('[firebase-messaging-sw.js] Background message title:', payload);
  console.log('[firebase-messaging-sw.js] Background message:', payload);

  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
  clients.forEach(client => {
    client.postMessage({
      type: 'PUSH_RECEIVED',
      payload: payload.notification,
    });
  });
});


self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('firebase-logo.png')) {
    console.log('📡 Requisição para o ícone de notificação detectada:', event.request.url);
  }
});

  // também mostra a notificação padrão
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  });
});
