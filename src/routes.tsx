// src/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CadastroEmpresa from './pages/CadastroEmpresa'
import LoginEmpresa from './pages/LoginEmpresa'
import PainelProdutos from './pages/PainelProdutos'
import PainelEntregador from './pages/PainelEntregador'
import CadastroEntregador from './pages/CadastroEntregador'
import LoginEntregador from './pages/LoginEntregador'
import EntregadorPedidos from './pages/EntregadorPedidos'
//import PainelProdutos from './pages/PainelProdutos'
//import PainelEntregador from './pages/PainelEntregador'
//import Home from './pages/Home'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginEmpresa />} />
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
