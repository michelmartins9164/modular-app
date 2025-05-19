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
import { db } from '../../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default function LoginEmpresa() {
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!nomeEmpresa.trim()) return

    try {
      const q = query(
        collection(db, 'empresas'),
        where('nome', '==', nomeEmpresa.trim())
      )
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const empresaDoc = snapshot.docs[0]
        const empresaId = empresaDoc.id

        toast({
          title: 'Login realizado',
          status: 'success',
          duration: 2000,
        })

        navigate(`/empresa/${empresaId}/produtos`)
      } else {
        toast({
          title: 'Empresa não encontrada',
          status: 'error',
          duration: 3000,
        })
      }
    } catch (err) {
      console.error('Erro no login:', err)
      toast({
        title: 'Erro ao buscar empresa',
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt="10">
      <FormControl>
        <FormLabel>Nome da empresa</FormLabel>
        <Input
          placeholder="Digite o nome"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleLogin}>
        Entrar
      </Button>
    </Box>
  )
}
