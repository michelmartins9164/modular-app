// src/hooks/usePushStorageListener.ts
import { useEffect } from 'react'

export function usePushStorageListener() {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PUSH_RECEIVED') {
        const data = event.data.payload;

        console.log('📩 Notificação recebida via postMessage:', data);

        try {
          const historico = JSON.parse(localStorage.getItem('notificacoes') || '[]');
          historico.push({
            title: data.title,
            body: data.body,
            receivedAt: new Date().toISOString(),
          });
          localStorage.setItem('notificacoes', JSON.stringify(historico));
          alert(`🔔 ${data.title}: ${data.body}`);
        } catch (e) {
          console.error('❌ Erro ao salvar no localStorage:', e);
        }
      }
    };

    navigator.serviceWorker?.addEventListener('message', handler);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handler);
    };
  }, []);
}
