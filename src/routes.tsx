// src/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CadastroEmpresa from './pages/CadastroEmpresa'
import LoginEmpresa from './pages/LoginEmpresa'
import PainelProdutos from './pages/PainelProdutos'
import PainelEntregador from './pages/PainelEntregador'
import CadastroEntregador from './pages/CadastroEntregador'
import LoginEntregador from './pages/LoginEntregador'
import EntregadorPedidos from './pages/EntregadorPedidos'
import { usePushStorageListener } from './hooks/usePushStorageListener'
import { useEffect } from 'react'
//import PainelProdutos from './pages/PainelProdutos'
//import PainelEntregador from './pages/PainelEntregador'
//import Home from './pages/Home'

export function AppRoutes() {
    usePushStorageListener();
    useEffect(() => {
  const handler = (event: MessageEvent) => {
    console.log('📨 Mensagem recebida da serviceWorker:', event.data);
    alert(`🔔 ${event.data.notification.title}: ${event.data.notification.body}`);
    if (event.data?.type === 'PUSH_RECEIVED') {
    }
  };

  navigator.serviceWorker?.addEventListener('message', handler);
  return () => {
    navigator.serviceWorker?.removeEventListener('message', handler);
  };
}, []);

  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<EntregadorPedidos />} />
        <Route path="/empresa/cadastro" element={<CadastroEmpresa />} />
        <Route path="/entregador/cadastro" element={<CadastroEntregador />} />
        <Route path="/empresa/:empresaId/produtos" element={<PainelProdutos />} />
        <Route path="/entregas" element={<PainelEntregador />} />
        <Route path="/entregador/login" element={<LoginEntregador />} />
        <Route path="/entregador/:entregadorId/pedidos" element={<EntregadorPedidos />} />
      </Routes>
    </BrowserRouter>
  )
}
