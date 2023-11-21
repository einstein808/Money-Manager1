// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLYJG3rtsxX50qIXGyMhoC8mD-DtIT2qo",
  authDomain: "imc-react-native-88645.firebaseapp.com",
  projectId: "imc-react-native-88645",
  storageBucket: "imc-react-native-88645.appspot.com",
  messagingSenderId: "171763356642",
  appId: "1:171763356642:web:ca838f8250e3a39bb61fbb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);