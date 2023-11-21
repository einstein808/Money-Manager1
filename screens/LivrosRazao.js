import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, getDocs, query, where } from '../db/firebase';
import { obterUsuario } from '../db/auth'; // Importa a função obterUsuario do arquivo auth.js
import { db } from '../db/firebase';

export default function LivrosRazaoPage() {
  const [user, setUser] = useState(null);
  const [livrosRazao, setLivrosRazao] = useState([]);

  useEffect(() => {
    carregarUsuario(); // Chama a função ao montar o componente
  }, []); // O segundo argumento vazio garante que as funções sejam chamadas apenas uma vez

  useEffect(() => {
    if (user) {
      carregarLivrosRazao(); // Carrega os livros razão quando o usuário está autenticado
    }
  }, [user]); // Executa quando o usuário é alterado

  const carregarUsuario = async () => {
    try {
      const usuarioSalvo = await obterUsuario();
      if (usuarioSalvo) {
        setUser(usuarioSalvo);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error.message);
    }
  };

  const carregarLivrosRazao = async () => {
    try {
      if (user) {
        // Obtém o ID do usuário da referência no campo userID do livrorazao
        const userID = user.uid;

        // Consulta os livros da razão do usuário
        const livrosRazaoRef = collection(db, 'livrorazao');
        const q = query(livrosRazaoRef, where('userID', '==', userID));
        const querySnapshot = await getDocs(q);

        const livros = [];
        querySnapshot.forEach((doc) => {
          livros.push({ id: doc.id, ...doc.data() });
        });

        setLivrosRazao(livros);
      }
    } catch (error) {
      console.error('Erro ao carregar livros razão:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Bem-vindo, {user.email}!</Text>
          {/* <Button  title='carregar' onPress={carregarLivrosRazao}/> */}

          <FlatList
            data={livrosRazao}
            keyExtractor={(livro) => livro.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nome}</Text>
                {/* Adicione outros campos do livro razão conforme necessário */}
              </View>
            )}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
