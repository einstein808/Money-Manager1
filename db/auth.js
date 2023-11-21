// auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar o usuário no AsyncStorage
const USER_STORAGE_KEY = 'user';

// Função para salvar o usuário no AsyncStorage
export const salvarUsuario = async (usuario) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usuario));
  } catch (error) {
    console.error('Erro ao salvar usuário no AsyncStorage:', error.message);
  }
};

// Função para obter o usuário atualmente logado
export const obterUsuario = async () => {
  try {
    const usuarioSalvo = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  } catch (error) {
    console.error('Erro ao obter usuário do AsyncStorage:', error.message);
    return null;
  }
};

// Função para remover o usuário do AsyncStorage
export const removerUsuario = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao remover usuário do AsyncStorage:', error.message);
  }
};

