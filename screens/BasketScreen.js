import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { removeFromBasket, selectBasketItemsWithRestaurant, selectBasketTotalWithId } from '../slices/basketSlice';
import SafeViewAndroid from '../components/SafeViewAndroid';

import { XCircleIcon } from "react-native-heroicons/solid"
import BasketDishRow from '../components/BasketDishRow';
import CurrencyFormat from 'react-currency-format';
import { useMemo } from 'react';

const BasketScreen = () => {
	const navigation = useNavigation();
	const { restaurant } = useSelector(selectRestaurant);
	const items = useSelector((state) => selectBasketItemsWithRestaurant(state, restaurant.id));
	const subtotal = useSelector((state) => selectBasketTotalWithId(state, restaurant.id));
	const dispatch = useDispatch();

	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

	useEffect(() => {
		let groupedItems = items.reduce((results, item) => {
			(results[item.id] = results[item.id] || []).push(item);
			return results;
		}, {})
		setGroupedItemsInBasket(groupedItems);	
	}, [items.length])
	

	const removeItemFromBasket = (id, restaurant_id) => {
        if(items.length < 1) return;
        dispatch(removeFromBasket({id, restaurant_id}))
    }

	if(items.length == 0){
		navigation.goBack()
		return null;
	}  

	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white flex-1">
			<View className="flex-1 bg-gray-100 relative">
				<View className="bg-white py-2 pb-5 relative border-b border-[#00CCBB] shadow-sm">
					<Text className="font-extrabold text-xl text-center">
						Basket
					</Text>
					<Text className="text-xs text-gray-400 text-center">
						{restaurant.name}
					</Text>
					<TouchableOpacity className="absolute top-0 right-4 shadow-sm"
						onPress={navigation.goBack}
					>
						<XCircleIcon size={42} color={"#00CCBB"} />
					</TouchableOpacity>
				</View>
				<View className="flex-row items-center p-4 space-x-2 my-5 bg-white shadow-sm">
					<Image source={{
						uri: 'https://links.papareact.com/wru'
					}}
						className="h-7 w-7 bg-gray-300 p-4 rounded-full"
					/>
					<Text className="flex-1 text-xs">Deliver in 50-70 min</Text>
					<TouchableOpacity>
						<Text className="text-[#00CCBB] font-bold text-xs text">
							Change
						</Text>
					</TouchableOpacity>
				</View>
				<ScrollView contentContainerStyle={{
					paddingBottom: 25,
				}}>
					{Object.entries(groupedItemsInBasket).map(([key, dishes]) => <BasketDishRow key={key} id = {dishes[0]?.id}
																	name = {dishes[0]?.name}
																	image = {dishes[0]?.image}
																	price = {dishes[0]?.price}
																	quantity = {dishes.length}
																	restaurant_id = {restaurant.id}
																	onRemove={removeItemFromBasket} />)}
				</ScrollView>
				<View className="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 pb-6 shadow space-y-2">
					<View className="flex-row">
						<Text className="text-xs text-gray-400 flex-1">
							Subtotal
						</Text>
						<CurrencyFormat value={subtotal} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="text-xs text-gray-400">{value}</Text>} />
					</View>
					<View className="flex-row">
						<Text className="text-xs text-gray-400 flex-1">
							Delivery fee
						</Text>
						<CurrencyFormat value={5.99} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="text-xs text-gray-400">{value}</Text>} />
					</View>
					<View className="flex-row">
						<Text className="text-xs flex-1">
							Order Total
						</Text>
						<CurrencyFormat value={Number(subtotal + 5.99).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="text-xs font-bold">{value}</Text>} />
					</View>
					<TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="flex-1 rounded-sm bg-[#00CCBB] shadow-sm p-2">
						<Text className="text-xl font-extrabold text-white text-center">
							Place Order
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default BasketScreen