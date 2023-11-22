import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, query, where } from '../db/firebase';
import { obterUsuario } from '../db/auth'; 
import { db } from '../db/firebase';

export default function LivrosRazaoPage() {
  const [user, setUser] = useState(null);
  const [livrosRazao, setLivrosRazao] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (user) {
      carregarLivrosRazao();
    }
  }, [user]);

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
        const userID = user.uid;
        const livrosRazaoRef = collection(db, 'livrorazao');
        const q = query(livrosRazaoRef, where('userID', '==', userID));
        const querySnapshot = await getDocs(q);

        const livros = [];
        querySnapshot.forEach((doc) => {
          livros.push({ nome: doc.data().nome, id: doc.id });
        });

        setLivrosRazao(livros);

        // Seleciona o primeiro livro como padrão, você pode ajustar isso conforme necessário
        if (livros.length > 0) {
          setSelectedLivro(livros[0].id);
        }
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

          <Picker
            selectedValue={selectedLivro}
            onValueChange={(itemValue) => setSelectedLivro(itemValue)}
          >
            {livrosRazao.map((livro) => (
              <Picker.Item key={livro.id} label={livro.nome} value={livro.id} />
            ))}
          </Picker>

          {selectedLivro && (
            <View>
              <Text>Livro selecionado: {selectedLivro}</Text>
              {/* Exiba os detalhes do livro selecionado conforme necessário */}
            </View>
          )}
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
