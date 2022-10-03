import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectBasketItemsWithRestaurant, selectBasketTotalWithId } from '../slices/basketSlice'
import CurrencyFormat from 'react-currency-format'

const BasketPopup = ({restaurant_id}) => {
    const navigation = useNavigation()
    const basketItems = useSelector((state) => selectBasketItemsWithRestaurant(state, restaurant_id))
    const total = useSelector((state) => selectBasketTotalWithId(state, restaurant_id))

    if(basketItems.length == 0) return null;

    return (
        <TouchableOpacity 
            className="w-full rounded-md bg-green-60 bg-[#00CCBB] p-3 flex-row items-center justify-between"
            onPress={() => {navigation.navigate("Basket")}}
        >
            <Text className="rounded-md bg-[#01A296] font-extrabold text-lg text-white px-2 py-1 min-w-[30px] text-center">
                {basketItems.length}
            </Text>
            <Text className="font-extrabold text-lg text-white">
                View Basket
            </Text>
            <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="font-extrabold text-lg text-white min-w-[30px] text-center">{value}</Text>} />
        </TouchableOpacity>
    )
}

export default BasketPopup