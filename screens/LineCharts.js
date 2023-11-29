import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { obterUsuario } from '../db/auth';
import {
  carregarLivrosRazao,
  carregarRegistrosPorLivro,
  calcularValorTotal,
} from './component/funcoesLivroRazao';
import Home from './Home';

export default function LineCharts() {
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

  return (
    <SafeAreaView>
      <View>
        {user ? (
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('Registros')}>
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

            {selectedLivro && (
              <View style={{ marginTop: 40, marginLeft:5 }}>
                <LineChart
                  data={{
                    labels: [
                      '11-01', '211-02', '11-03', '11-04', '11-05',

                    ],
                    datasets: [
                      {
                        data: [
                          200, 400, 300, 600, 800,
                          500, 700, 300, 400, 600,
                          900,
                          
                        ],
                      },
                    ],
                  }}
                  width={350} 
                  height={220}
                  yAxisLabel="R$"
                  chartConfig={{
                    backgroundColor: '#e0e0e0',
                    backgroundGradientFrom: '#e0e0e0',
                    backgroundGradientTo: '#e0e0e0',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 8,
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 8,
                  }}
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
    alignItems:"center",
    justifyContent:'center'
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
    height: 200, 
  },
  card: {
    backgroundColor: '#e0e0e0',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  texto: {
    marginBottom: 2
  }
});
