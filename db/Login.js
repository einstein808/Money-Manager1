import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { salvarUsuario, obterUsuario, removerUsuario } from './auth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const email = "gabryel808ein9755steinr@gmail.com";
  const senha = '123deOliveira4';

  // Função para carregar o usuário salvo no AsyncStorage ao iniciar o aplicativo
  const carregarUsuario = async () => {
    try {
      const usuarioSalvo = await obterUsuario();
      if (usuarioSalvo) {
        setUser(usuarioSalvo);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do AsyncStorage:', error.message);
    }
  };

  useEffect(() => {
    carregarUsuario(); // Chama a função ao montar o componente
  }, []); // O segundo argumento vazio garante que a função seja chamada apenas uma vez

  const autenticar = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const loggedInUser = userCredential.user;

      setUser(loggedInUser);
      // Salva o usuário no AsyncStorage ao fazer login
      await salvarUsuario(loggedInUser);
      console.log('Usuário logado com sucesso:', loggedInUser);
      navigation.navigate('Home')

      // Navigate to the Home screen after successful login
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  const deslogar = async () => {
    try {
      await signOut(auth);
      setUser(null);
      // Remove o usuário do AsyncStorage ao fazer logout
      await removerUsuario();
      console.log('Usuário deslogado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Bem-vindo, {user.email}!</Text>
          <Button title='Deslogar' onPress={deslogar} />
        </View>
      ) : (
      
      
        <Button title='Logar' onPress={autenticar}/>
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
