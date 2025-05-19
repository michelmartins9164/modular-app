// src/services/empresaService.ts
import { db } from '../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export interface NovaEmpresa {
  nome: string
  endereco: string
}

export async function cadastrarEmpresa({ nome, endereco }: NovaEmpresa) {
  const empresasRef = collection(db, 'empresas')
  const nova = await addDoc(empresasRef, {
    nome,
    endereco,
    createdAt: Timestamp.now()
  })

  return nova.id // retorna o ID da empresa (usado como chave do "banco próprio")
}
