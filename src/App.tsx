import { useEffect } from 'react';
import { AppRoutes } from './routes'

function App() {
  useEffect(() => {
  const handlePushMessage = (event: MessageEvent) => {
    if (event.data?.type === 'PUSH_RECEIVED') {
      console.log('📨 Notificação recebida via postMessage:', event.data);
      alert(`🔔 ${event.data.payload.title}: ${event.data.payload.body}`);
    }
  };

  navigator.serviceWorker?.addEventListener('message', handlePushMessage);

  return () => {
    navigator.serviceWorker?.removeEventListener('message', handlePushMessage);
  };
}, []);
  return (
      <AppRoutes />
  )
}

export default App
