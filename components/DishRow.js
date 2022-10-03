import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon } from 'react-native-heroicons/solid'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../slices/basketSlice'

/**
 * It returns a View component that contains a Text component.
 * @returns A function that returns a view with a text component.
 */
const DishRow = ({
    id,
    name,
    description,
    image,
    price,
    restaurant_id
}) => {
    const [isPressed, setIsPressed] = useState(false)
    const dispatch                  = useDispatch()
    const items                     = useSelector((state) => selectBasketItemsWithId(state, id))

    const addItemToBasket = () => {
        dispatch(addToBasket({
            id,
            name,
            description,
            image,
            price,
            restaurant_id
        }))
    }
    const removeItemFromBasket = () => {
        if(items.length < 1) return;
        dispatch(removeFromBasket({id, restaurant_id}))
    }
    
    return (
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className="flex-row space-x-1 p-4 items-start bg-white border-b border-gray-300">
            <View className="flex-1" >
                <Text className="text-lg">
                    {name}
                </Text>
                {description && <Text className="text-sm mb-1 text-gray-500">
                    {description}
                </Text>}

                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'€'} renderText={value => <Text className="text-sm text-gray-500">{value}</Text>} />
                
                {isPressed &&
                    <View className="flex-row items-center space-x-2 mt-3">
                        <TouchableOpacity
                            disabled={!items.length}
                            onPress={removeItemFromBasket}
                        >
                            <MinusCircleIcon size={35} color={items.length > 0 ? "#00CCBB" : "gray"} />
                        </TouchableOpacity>
                        <Text>
                            {items.length}
                        </Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon size={35} color="#00CCBB" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <Image source={{
                uri: urlFor(image).url()
            }} className="h-16 w-16 rounded" />
        </TouchableOpacity>
    )
}

export default DishRow