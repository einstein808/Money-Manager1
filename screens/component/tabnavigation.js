
import LivrosRazaoPage from "../LivrosRazao"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddRecordPage from "./addrecord";
import Home from "../Home";
const Tab = createBottomTabNavigator();
export default function TabNavigation(){
    return(
     <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={AddRecordPage}  options={{ headerShown: false }}/>
        <Tab.Screen name="Settings" component={LivrosRazaoPage} options={{ headerShown: false }} />
        <Tab.Screen name="Homes" component={Home} options={{ headerShown: false }} />
        
      </Tab.Navigator>
    )
}