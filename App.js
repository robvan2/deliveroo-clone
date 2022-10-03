import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux'
import store from './store';
import BasketScreen from "./screens/BasketScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<TailwindProvider>
					<Stack.Navigator>
						<Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
						<Stack.Screen name='Restaurant' component={RestaurantScreen}></Stack.Screen>
						<Stack.Screen 
							name='Basket' 
							component={BasketScreen} 
							options={{presentation:"modal", headerShown:false}}
						></Stack.Screen>
					</Stack.Navigator>
				</TailwindProvider>
			</Provider>
		</NavigationContainer>
	);
}
