// AddRecordPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obterUsuario } from '../../db/auth';
import { carregarLivrosRazao, adicionarRegistro } from './funcoesLivroRazao'; // Corrected import

export default function AddRecordPage({ route, navigation }) {
  const [livrosRazao, setLivrosRazao] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (user) {
      carregarLivrosRazao(user, setLivrosRazao, setSelectedLivro);
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

  const handleAddRecord = async () => {
    try {
      const novoRegistro = {
        data: new Date().toISOString(),
        descricao: descricao.trim(),
        valor: parseFloat(valor) || 0,
        livrorazaoID: selectedLivro
      };
      console.log(selectedLivro)

      await adicionarRegistro(novoRegistro);

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao adicionar registro:', error.message);
    }
  };

  return (
    <View style={{ padding: 16, marginTop:200 }}>
      <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 20 }}>
        Adicionar Registro
      </Text>
      <Picker
        selectedValue={selectedLivro}
        onValueChange={(itemValue) => setSelectedLivro(itemValue)}
      >
        {livrosRazao.map((livro) => (
          <Picker.Item key={livro.id} label={livro.nome} value={livro.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={(text) => setValor(text)}
        keyboardType="numeric"
      />
      <Button title="Adicionar Registro" onPress={handleAddRecord} />
    </View>
  );
}

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
};
