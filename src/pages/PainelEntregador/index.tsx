import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface Pedido {
  id: string
  nome: string
  preco: number
  empresaId: string
  nomeEmpresa?: string
  to?: string
}

export default function PainelEntregador() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)

const carregarPedidos = async () => {
  setLoading(true)

  const snap = await getDocs(collection(db, 'pedidos_prontos'))
  const lista: Pedido[] = []

  for (const docSnap of snap.docs) {
    const data = docSnap.data()

    if (data.status && data.status !== 'pendente') continue // 👈 filtra

    let nomeEmpresa = 'Desconhecida'
    try {
      const empresaSnap = await getDoc(doc(db, 'empresas', data.empresaId))
      if (empresaSnap.exists()) {
        nomeEmpresa = empresaSnap.data().nome
      }
    } catch (e) {
      console.warn(`Erro ao buscar empresa ${data.empresaId}`, e)
    }

    lista.push({
      id: docSnap.id,
      nome: data.nome,
      preco: data.preco,
      empresaId: data.empresaId,
      nomeEmpresa,
    })
  }

  setPedidos(lista)
  setLoading(false)
}


  useEffect(() => {
    carregarPedidos()
  }, [])

  return (
    <Box maxW="3xl" mx="auto" mt={8}>
      <Heading mb={4}>Pedidos Disponíveis</Heading>

      {loading ? (
        <Spinner />
      ) : pedidos.length === 0 ? (
        <Text>Nenhum pedido publicado ainda.</Text>
      ) : (
        <Stack spacing={4}>
          {pedidos.map((p) => (
            <Box key={p.id} p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">{p.nome}</Text>
              <Text>Preço: R$ {p.preco.toFixed(2)}</Text>
              <Text fontSize="sm" color="gray.500">
                Empresa: {p.nomeEmpresa} (ID: {p.empresaId})
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  )
}
