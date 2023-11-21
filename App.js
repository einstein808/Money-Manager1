import { Text } from "react-native"
import Create from "./db/create"
import Login from "./db/Login"
import LivrosRazaoPage from "./screens/LivrosRazao"
export default function App (){
return(
  <>
  <Create/>
  <Login/>
  <LivrosRazaoPage/></>
  
)
}