import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();
const db = admin.firestore();

export const notificarEntregadores = functions.firestore
  .document('pedidos_prontos/{pedidoId}')
  .onCreate(async (snap, context) => {
    const novoPedido = snap.data();
    const nome = novoPedido.nome;
    const preco = novoPedido.preco;

    // Buscar todos os entregadores com token
    const entregadoresSnap = await db.collection('entregadores').get();
    const tokens: string[] = [];

    entregadoresSnap.forEach(doc => {
      const token = doc.data().fcmToken;
      if (token) tokens.push(token);
    });

    if (tokens.length === 0) {
      console.log("Nenhum entregador com token");
      return null;
    }

    const payload = {
      notification: {
        title: "📦 Novo pedido disponível",
        body: `${nome} - R$ ${preco.toFixed(2)}`,
      },
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });
