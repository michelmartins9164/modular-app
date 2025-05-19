// src/pages/LoginEntregador.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

export default function LoginEntregador() {
  const [nome, setNome] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!nome.trim()) {
      toast({ title: 'Informe seu nome', status: 'warning' })
      return
    }

    const q = query(collection(db, 'entregadores'), where('nome', '==', nome.trim()))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const entregadorId = snapshot.docs[0].id

      toast({ title: 'Login realizado com sucesso', status: 'success' })

      // Redireciona para painel ou lista de entregas
      navigate(`/entregador/${entregadorId}/pedidos`)
    } else {
      toast({ title: 'Entregador não encontrado', status: 'error' })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <FormControl>
        <FormLabel>Nome do entregador</FormLabel>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </FormControl>

      <Button mt={4} colorScheme="teal" onClick={handleLogin}>
        Entrar
      </Button>
    </Box>
  )
}
