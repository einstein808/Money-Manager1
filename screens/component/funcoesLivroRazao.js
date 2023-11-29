// funcoesLivrosRazao.js

import { collection, getDocs, query, where, addDoc } from '../../db/firebase';
import { db } from '../../db/firebase';

export const carregarLivrosRazao = async (user, setLivrosRazao, setSelectedLivro) => {
  try {
    if (user) {
      const userID = user.uid;
      const livrosRazaoRef = collection(db, 'livrorazao');
      const q = query(livrosRazaoRef, where('userID', '==', userID));
      const querySnapshot = await getDocs(q);

      const livros = [];
      querySnapshot.forEach((doc) => {
        livros.push({ nome: doc.data().nome, id: doc.id });
      });

      setLivrosRazao(livros);
      if (livros.length > 0) {
        setSelectedLivro(livros[0].id);
      }
    }
  } catch (error) {
    console.error('Erro ao carregar livros razão:', error.message);
  }
};

export const carregarRegistrosPorLivro = async (
  selectedLivro,
  setRegistros
) => {
  try {
    if (selectedLivro) {
      const registrosRef = collection(db, 'registro');
      const q = query(registrosRef, where('livrorazaoID', '==', selectedLivro));
      const querySnapshot = await getDocs(q);

      const registrosDoLivro = [];
      querySnapshot.forEach((doc) => {
        registrosDoLivro.push({
          data: doc.data().data,
          descricao: doc.data().descricao,
          valor: doc.data().valor,
          // Outros campos do registro conforme necessário
        });
      });

      setRegistros(registrosDoLivro);
    }
  } catch (error) {
    console.error('Erro ao carregar registros do livro razão:', error.message);
  }
};

export const adicionarRegistro = async (novoRegistro) => {
  try {
    const registrosRef = collection(db, 'registro');

    // Add a new record to the 'registro' collection
    await addDoc(registrosRef, {
      
      data: novoRegistro.data,
      descricao: novoRegistro.descricao,
      valor: novoRegistro.valor,
      livrorazaoID: novoRegistro.livrorazaoID
      // Add other fields as needed
    });
  } catch (error) {
    console.error('Erro ao adicionar registro:', error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};



export const calcularValorTotal = (registros, setValorTotal) => {
  const total = registros.reduce((acc, registro) => acc + registro.valor, 0);
  setValorTotal(total);
};
