
import LivrosRazaoPage from "../LivrosRazao"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AddRecordPage from "./addrecord";
import LineCharts from "../LineCharts";
const Tab = createBottomTabNavigator();
export default function TabNavigation(){
    return(
     <Tab.Navigator>
        
        <Tab.Screen
    name="Registros"
    component={LivrosRazaoPage}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
      headerShown: false,
    }}
  />
  <Tab.Screen
    name="Adicionar"
    component={AddRecordPage}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="add-circle-outline" size={size} color={color} />
      ),
      headerShown: false,
    }}
  />
  <Tab.Screen
    name="Linecharts"
    component={LineCharts}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="analytics-outline" size={size} color={color} />
      ),
      headerShown: false,
    }}
  />
      </Tab.Navigator>
    )
}