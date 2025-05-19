// src/components/ModalAdicionarProduto.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface Props {
  isOpen: boolean
  onClose: () => void
  empresaId: string
  aoSalvar: () => void
}

export default function ModalAdicionarProduto({
  isOpen,
  onClose,
  empresaId,
  aoSalvar,
}: Props) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const toast = useToast()

  const handleSalvar = async () => {
    if (!nome || !preco) return

    await addDoc(collection(db, `empresas/${empresaId}/produtos`), {
      nome,
      preco: parseFloat(preco),
    })

    toast({
      title: 'Produto adicionado',
      status: 'success',
      duration: 2000,
    })

    setNome('')
    setPreco('')
    aoSalvar()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Nome</FormLabel>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Preço</FormLabel>
            <Input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSalvar}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
