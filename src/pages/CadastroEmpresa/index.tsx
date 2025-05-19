// src/pages/CadastroEmpresa.tsx
import { useState } from 'react'
import { cadastrarEmpresa } from '../../services/empresaService'
import { Box, Button, useToast, FormControl, FormLabel, Input } from '@chakra-ui/react'


export default function CadastroEmpresa() {
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const toast = useToast()

  const handleSubmit = async () => {
    if (!nome || !endereco) {
      toast({
        title: 'Preencha todos os campos',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    try {
      const id = await cadastrarEmpresa({ nome, endereco })
      toast({
        title: 'Empresa cadastrada',
        description: `ID: ${id}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setNome('')
      setEndereco('')
    } catch (error) {
      console.error('Erro ao cadastrar', error)
      toast({
        title: 'Erro ao cadastrar',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt="10">
      <FormControl mb="4">
        <FormLabel>Nome da Empresa</FormLabel>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Endereço</FormLabel>
        <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Cadastrar Empresa
      </Button>
    </Box>
  )
}
