import { useEffect, useState } from "react";
import { messaging, messagingPromise } from "../../firebase";
import { getToken, onMessage } from "firebase/messaging";

export default function LoginEmpresa() {
 /*  useEffect(() => {
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        
        const messaging = await messagingPromise;
        if (!messaging) {
          console.warn("🚫 Messaging não suportado neste navegador");
          return;
        }

        getToken(messaging, {
          vapidKey: "BAGyDSe4JGiUDkGYHBDO-c9IML0xqtn8K6WHq9kuL2I6Wz-ujRMxdZon-j3uPU0XINkiCeDnRGqYnPgcvW-RHwQ",
          serviceWorkerRegistration: registration,
        })
        .then((token) => {
          if (token) {
            console.log("✅ Token gerado:", token);
          } else {
            console.warn("⚠️ Nenhum token retornado");
          }
        })
        .catch((err) => {
          console.error("❌ Erro ao gerar token:", err);
        });

        // Listener para notificações em primeiro plano
        onMessage(messaging, (payload) => {
          console.log("📥 Mensagem recebida em primeiro plano:", payload);
          alert(`Notificação: ${payload.notification?.title}`);
        });
      } else {
        console.warn("🚫 Permissão negada");
      }
    });
  }, []); */

  const [notifs, setNotif] = useState([]);
  const [token, setToken] = useState("Validating Permission");
  const [copied, setCopied] = useState(false);
async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    setToken("Permissão negada");
    alert("Você negou a permissão de notificações.");
    return;
  }

  try {
    // Aguarde o service worker registrar
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    // Aguarde ele estar pronto
    await navigator.serviceWorker.ready;

    const _token = await getToken(messaging, {
      vapidKey: 'BAGyDSe4JGiUDkGYHBDO-c9IML0xqtn8K6WHq9kuL2I6Wz-ujRMxdZon-j3uPU0XINkiCeDnRGqYnPgcvW-RHwQ',
      serviceWorkerRegistration: registration,
    });

    if (_token) {
      setToken(_token);
      console.log("✅ Token gerado:", _token);
    } else {
      setToken("Token não retornado");
      console.warn("⚠️ Token vazio");
    }
  } catch (err) {
    console.error("Erro ao gerar token:", err);
    setToken("Erro ao gerar token");
  }
}

useEffect(() => {
  requestPermission();
  const messaging = messagingPromise;
  if (!messaging) {
    console.warn("🚫 Messaging não suportado neste navegador");
    return;
  }

}, []);

  return (
    <div>
      <h1 style={{color:'#000'}}>FCM Web Example</h1>
    </div>
  );
}
