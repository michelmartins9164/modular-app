import {
  Box,
  Heading,
  Text,
  Spinner,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'

interface Pedido {
  id: string
  nome: string
  preco: number
  empresaId: string
  nomeEmpresa: string
  status?: string
  entregadorId?: string
  entregadorNome?: string
}

export default function EntregadorPedidos() {
  // const { entregadorId } = useParams()
  const entregadorId = '4l3DDoZ05UYhT5Cp9Bfm'
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [entregadorNome, setEntregadorNome] = useState('')
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const buscarPedidos = async () => {
      setLoading(true)

      // Busca nome do entregador
      const entregadorSnap = await getDoc(doc(db, 'entregadores', entregadorId!))
      if (entregadorSnap.exists()) {
        setEntregadorNome(entregadorSnap.data().nome)
      }

      const snap = await getDocs(collection(db, 'pedidos_prontos'))
      const pedidosComEmpresa: Pedido[] = []

      for (const docSnap of snap.docs) {
        const data = docSnap.data()

        // 🔒 Filtra: mostra só se for pendente ou aceito por mim
        if (data.status === 'aceito' && data.entregadorId !== entregadorId) continue

        const empresaSnap = await getDoc(doc(db, 'empresas', data.empresaId))

        pedidosComEmpresa.push({
          id: docSnap.id,
          nome: data.nome,
          preco: data.preco,
          empresaId: data.empresaId,
          nomeEmpresa: empresaSnap.exists() ? empresaSnap.data().nome : 'Desconhecida',
          status: data.status,
          entregadorId: data.entregadorId,
          entregadorNome: data.entregadorNome,
        })
      }


      setPedidos(pedidosComEmpresa)
      setLoading(false)
    }

    buscarPedidos()
  }, [entregadorId])

  const aceitarPedido = async (pedido: Pedido) => {
    try {
      await updateDoc(doc(db, 'pedidos_prontos', pedido.id), {
        status: 'aceito',
        entregadorId,
        entregadorNome,
      })

      
        const response = await fetch('http://localhost:3000/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: 'eSkEmC1xNNu1sZgUK8j-qq:APA91bGtcMMb_ovx50Cd5Ls34fG3XCyf5eC5Q8qJCdGPeM5c4g6LPclpJyaZicUpZoodgF9IvUFYvA2MtHHI6GsXHpq33yY9J1ViK3vMO3GE5VohW2mMO34', // Substitua pelo token FCM do destinatário
            title: 'Novo pedido disponível',
            body: `Produto: AAAAAAAAAAA - R$ 30`,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro ao enviar notificação:', errorText);
        } else {
          const data = await response.text();
          console.log('Notificação enviada com sucesso:', data);
        }
     

      toast({
        title: 'Pedido aceito com sucesso!',
        status: 'success',
        duration: 2000,
      })

      // Atualiza localmente sem recarregar tudo
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedido.id
            ? { ...p, status: 'aceito', entregadorId, entregadorNome }
            : p
        )
      )
    } catch (error) {
      toast({
        title: 'Erro ao aceitar pedido',
        status: 'error',
      })
    }
  }
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('Permissão de notificação:', permission)
      })
    }
  }, [])

  useEffect(() => {
    const handleNovoPedido = (e: any) => {
      if (Notification.permission === 'granted') {
        new Notification('📦 Novo pedido disponível!', {
          body: `${e.detail.nome} - R$ ${e.detail.preco.toFixed(2)}`,
          icon: '/logo192.png',
        })
      }
    }

    window.addEventListener('novo-pedido', handleNovoPedido)

    return () => {
      window.removeEventListener('novo-pedido', handleNovoPedido)
    }
  }, [])



  return (
    <Box maxW="3xl" mx="auto" mt={8}>
      <Heading mb={4}>Pedidos Disponíveis</Heading>

      {loading ? (
        <Spinner />
      ) : pedidos.length === 0 ? (
        <Text>Nenhum pedido disponível.</Text>
      ) : (
        <Stack spacing={4}>
          {pedidos.map((p) => (
            <Box key={p.id} p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">{p.nome}</Text>
              <Text>Preço: R$ {p.preco.toFixed(2)}</Text>
              <Text fontSize="sm" color="gray.500">
                Empresa: {p.nomeEmpresa}
              </Text>

              {p.status === 'aceito' ? (
                <Text color="green.500" mt={2}>
                  Aceito por: {p.entregadorNome}
                </Text>
              ) : (
                <Button mt={2} colorScheme="teal" size="sm" onClick={() => aceitarPedido(p)}>
                  Aceitar
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  )
}
