import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { obterUsuario } from '../db/auth';
import {
  carregarLivrosRazao,
  carregarRegistrosPorLivro,
  calcularValorTotal,
} from './component/funcoesLivroRazao';
import Home from './Home';

export default function LivrosRazaoPage() {
  const [user, setUser] = useState(null);
  const [livrosRazao, setLivrosRazao] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (user) {
      carregarLivrosRazao(user, setLivrosRazao, setSelectedLivro);
    }
  }, [user]);

  useEffect(() => {
    if (selectedLivro) {
      carregarRegistrosPorLivro(selectedLivro, setRegistros);
    }
  }, [selectedLivro]);

  useEffect(() => {
    calcularValorTotal(registros, setValorTotal);
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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.texto}>Data: {item.data}</Text>
      <Text style={styles.texto}>Descrição: {item.descricao}</Text>
      <Text style={styles.texto}>Valor: {item.valor}</Text>
      {/* Other fields as needed */}
    </View>
  );

  return (
    <SafeAreaView>
      <View>
        {user ? (
          <View>
            {/* Header with back arrow and Picker */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
                <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 30 }} />
              </TouchableOpacity>

              <Picker
                style={styles.picker}
                selectedValue={selectedLivro}
                onValueChange={(itemValue) => setSelectedLivro(itemValue)}
              >
                {livrosRazao.map((livro) => (
                  <Picker.Item key={livro.id} label={livro.nome} value={livro.id} />
                ))}
              </Picker>
              <View></View>
            </View>

            <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 20, marginBottom: 20 }}>
              Balanço: {valorTotal}
            </Text>

            <View style={styles.utimas}>
              <Home navigation={navigation}/>
            </View>

            {selectedLivro && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Últimos 10 registros</Text>
                <FlatList
                  data={registros.slice(0, 10)} // Display only the last 10 records
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'bisque',
    width: '100%',
  },
  picker: {
    width: '40%',
    marginLeft: 10,
  },
  utimas: {
    width: '100%',
    height: 200, // Set a fixed height for the "utimas" view
  },
  card: {
    backgroundColor: '#e0e0e0',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  texto:{
    marginBottom:2
  }
});
