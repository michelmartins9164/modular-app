// src/pages/PainelProdutos.tsx
import {
    Box,
    Heading,
    Button,
    useDisclosure,
    Text,
    Stack,
    Spinner,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    serverTimestamp
} from 'firebase/firestore'
import ModalAdicionarProduto from '../../components/ModalAdicionarProduto'
interface Produto {
    id: string
    nome: string
    preco: number
}

export default function PainelProdutos() {
    const { empresaId } = useParams()
    const [empresaNome, setEmpresaNome] = useState('')
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const carregarEmpresa = async () => {
        const ref = doc(db, 'empresas', empresaId!)
        const snap = await getDoc(ref)
        if (snap.exists()) {
            setEmpresaNome(snap.data().nome)
        }
    }

    const carregarProdutos = async () => {
        setLoading(true)
        const ref = collection(db, `empresas/${empresaId}/produtos`)
        const snap = await getDocs(ref)
        const lista = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Produto[]
        setProdutos(lista)
        setLoading(false)
    }

    useEffect(() => {
        if (empresaId) {
            carregarEmpresa()
            carregarProdutos()
        }
    }, [empresaId])

    const [produtosPublicados, setProdutosPublicados] = useState<any[]>([])


    const publicarProduto = async (produto: Produto) => {
        if (!empresaId) return

        await addDoc(collection(db, 'pedidos_prontos'), {
            nome: produto.nome,
            preco: produto.preco,
            empresaId,
            publicadoEm: serverTimestamp(),
            refOriginal: `empresas/${empresaId}/produtos/${produto.id}`,
            status: 'pendente', // 👈 novo
        })


        toast({
            title: 'Produto publicado!',
            status: 'success',
            duration: 2000,
        })

        window.dispatchEvent(new CustomEvent('novo-pedido', {
            detail: {
                nome: produto.nome,
                preco: produto.preco
            }
        }))
    }
    const carregarProdutosPublicados = async () => {
        const snap = await getDocs(collection(db, 'pedidos_prontos'))
        const filtrados = snap.docs
            .filter((d) => d.data().empresaId === empresaId)
            .map((d) => ({
                id: d.id,
                refOriginal: d.data().refOriginal,
                status: d.data().status,
                entregadorNome: d.data().entregadorNome || '',
            }))
        setProdutosPublicados(filtrados)
    }

    useEffect(() => {
        if (empresaId) {
            carregarEmpresa()
            carregarProdutos()
            carregarProdutosPublicados()
        }
    }, [empresaId])


    return (
        <Box maxW="3xl" mx="auto" mt={8}>
            <Heading mb={4}>Empresa: {empresaNome}</Heading>

            <Button colorScheme="teal" onClick={onOpen} mb={4}>
                Adicionar Produto
            </Button>

            {loading ? (
                <Spinner />
            ) : (
                <Stack spacing={4}>
                    {produtos.map((p) => {
                        const publicado = produtosPublicados.find((pp) =>
                            pp.refOriginal === `empresas/${empresaId}/produtos/${p.id}`
                        )

                        return (
                            <Box key={p.id} p={4} borderWidth="1px" borderRadius="md">
                                <Text fontWeight="bold">{p.nome}</Text>
                                <Text>Preço: R$ {p.preco.toFixed(2)}</Text>

                                {publicado ? (
                                    publicado.status === 'aceito' ? (
                                        <Text color="green.500" mt={2}>
                                            Aceito por: {publicado.entregadorNome || 'Entregador desconhecido'}
                                        </Text>
                                    ) : (
                                        <Text color="orange.500" mt={2}>
                                            Publicado - aguardando entregador
                                        </Text>
                                    )
                                ) : (
                                    <Button
                                        size="sm"
                                        mt={2}
                                        colorScheme="green"
                                        onClick={() => publicarProduto(p)}
                                    >
                                        Publicar
                                    </Button>
                                )}
                            </Box>
                        )
                    })}


                </Stack>
            )}

            <ModalAdicionarProduto
                isOpen={isOpen}
                onClose={onClose}
                empresaId={empresaId!}
                aoSalvar={carregarProdutos}
            />
        </Box>
    )
}
