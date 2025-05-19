// src/pages/CadastroEntregador.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export default function CadastroEntregador() {
  const [nome, setNome] = useState('')
  const toast = useToast()

  const handleCadastrar = async () => {
    try {
      if (!nome.trim()) {
        toast({
          title: 'Informe um nome válido',
          status: 'warning',
          duration: 3000,
        })
        return
      }

      await addDoc(collection(db, 'entregadores'), {
        nome,
        criadoEm: new Date(),
      })

      toast({
        title: 'Entregador cadastrado!',
        status: 'success',
        duration: 3000,
      })

      setNome('')
    } catch (error) {
      console.error('Erro ao cadastrar entregador:', error)
      toast({
        title: 'Erro ao cadastrar entregador',
        status: 'error',
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <FormControl>
        <FormLabel>Nome do entregador</FormLabel>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </FormControl>

      <Button mt={4} colorScheme="blue" onClick={handleCadastrar}>
        Cadastrar
      </Button>
    </Box>
  )
}
