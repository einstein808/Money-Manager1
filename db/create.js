import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function Create() {
  const email = "gabryel808einwr9755steinr@gmail.com";
  const senha = '123deOliveira4';

  const autenticar = async () => {
    try {
      // Criação de usuário na autenticação Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva dados adicionais no Firestore
      const userDocRef = doc(db, 'user', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        // Adicione mais campos conforme necessário
      });

      console.log('Usuário criado com sucesso:', user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Logar' onPress={autenticar} />
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