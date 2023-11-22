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
  const [registros, setRegistros] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (user) {
      carregarLivrosRazao();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLivro) {
      carregarRegistrosPorLivro();
    }
  }, [selectedLivro]);

  useEffect(() => {
    calcularValorTotal();
  }, [registros]);

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
        if (livros.length > 0) {
          setSelectedLivro(livros[0].id);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar livros razão:', error.message);
    }
  };

  const carregarRegistrosPorLivro = async () => {
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

  const calcularValorTotal = () => {
    const total = registros.reduce((acc, registro) => acc + registro.valor, 0);
    setValorTotal(total);
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

              <Text>Registros do Livro Razão:</Text>
              {registros.map((registro, index) => (
                <View key={index}>
                  <Text>Data: {registro.data}</Text>
                  <Text>Descrição: {registro.descricao}</Text>
                  <Text>Valor: {registro.valor}</Text>
                  {/* Outros campos do registro conforme necessário */}
                </View>
              ))}

              <Text>Valor Total: {valorTotal}</Text>
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