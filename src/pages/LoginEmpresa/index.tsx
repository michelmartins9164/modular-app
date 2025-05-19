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
    const VITE_APP_VAPID_KEY ="BAGyDSe4JGiUDkGYHBDO-c9IML0xqtn8K6WHq9kuL2I6Wz-ujRMxdZon-j3uPU0XINkiCeDnRGqYnPgcvW-RHwQ";
  if (permission === "granted") {
    console.log("vapid id: ", VITE_APP_VAPID_KEY);

    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const _token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      setToken(_token || "Token não retornado");
      console.log("Token gerado:", _token);
    } catch (e) {
      console.error("Erro ao gerar token:", e);
      setToken("Erro ao gerar token");
    }
  } else if (permission === "denied") {
    setToken("Acesso bloqueado");
    alert("Você negou as notificações.");
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
