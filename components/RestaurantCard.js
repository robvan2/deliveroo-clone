import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'

const RestaurantCard = ({
    id,
    imgUrl,
    name,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}) => {
  return (
    <TouchableOpacity className="rounded bg-white shadow-lg overflow-hidden w-64 mr-3">
        <Image
            source={{
                uri: imgUrl
            }}
            className="h-36 w-full"
        />
        <View className="px-2 py-2">
            <Text className="text-lg font-bold">
                {name}
            </Text>
            <View className="flex-row items-center space-x-1 mb-1">
                <StarIcon size={22} opacity={0.5} color='green'/>
                <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}  ·</Text>  {genre}
                </Text>
            </View>
            <View className="flex-row items-center space-x-1 pb-1">
                <LocationMarkerIcon size={22} opacity={0.5} color='gray'/>
                <Text textBreakStrategy='highQuality' className="text-xs text-gray-500 break-words">
                    Nearby  ·  {address}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard