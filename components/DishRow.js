import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid'
import CurrencyFormat from 'react-currency-format'

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
}) => {
    const [isPressed, setIsPressed] = useState(false)
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
                        <TouchableOpacity className="rounded-full items-center justify-center h-8 w-8 shadow-sm bg-green-500">
                            <MinusIcon size={24} color="white" />
                        </TouchableOpacity>
                        <Text>
                            0
                        </Text>
                        <TouchableOpacity className="rounded-full items-center justify-center h-8 w-8 shadow-sm bg-green-500">
                            <PlusIcon size={24} color="white" />
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