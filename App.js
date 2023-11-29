import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { obterUsuario } from './db/auth'; // Substitua com o caminho correto


import LivrosRazaoPage from './screens/LivrosRazao';
import Login from './db/Login';
import TabNavigation from './screens/component/tabnavigation';
import PostDetails from './screens/postDetails';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verifica se o usuário está autenticado ao carregar o componente
    verificarAutenticacao();
  }, []);

  const verificarAutenticacao = async () => {
    const usuarioAutenticado = await obterUsuario();
    setUsuario(usuarioAutenticado);
  };
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={usuario ? 'Home' : 'Login'}>
        {usuario ? (
          <>
            <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Registros" component={LivrosRazaoPage} />
            <Stack.Screen name="PostDetails" component={PostDetails} />
            
            

          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
