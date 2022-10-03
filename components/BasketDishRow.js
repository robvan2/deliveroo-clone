import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../slices/basketSlice'


const BasketDishRow = ({
    id,
    name,
    image,
    price,
    quantity,
    restaurant_id,
    onRemove
}) => {
    const dispatch = useDispatch();

    return (
        <View className="bg-white p-4 border-b border-gray-300 flex-1 flex-row items-center">
            <View className="flex-row space-x-3 items-center">
                <Text className="text-sm text-gray-300">
                    {quantity} x
                </Text>
                <Image source={{
                    uri: urlFor(image).url()
                }} className="h-10 w-10 rounded-full" />
                <Text className="text-sm">
                    {name}
                </Text>
            </View>
            <View className="flex-1 flex-row space-x-2 items-center justify-end">
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="text-sm text-right text-gray-500">{value}</Text>} />
                <TouchableOpacity onPress={() => onRemove(id, restaurant_id)}>
                    <Text className="text-xs text-[#00CCBB]">
                        Remove
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BasketDishRow