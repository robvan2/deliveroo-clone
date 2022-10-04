import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { ArrowLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow'
import BasketPopup from '../components/BasketPopup'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setRestaurant } from '../slices/restaurantSlice'

const RestaurantScreen = () => {
    const { params: {
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
    } } = useRoute()

    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            name,
            rating,
            genre,
            address,
            short_description,
            long,
            lat
        }))
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            statusbar: {
                color: "white"
            }
        })
    }, [])
    
    return (
        <View className="flex-1">
            <ScrollView className="bg-gray-100">
                <View className="relative w-full h-56">
                    <Image source={{
                        uri: imgUrl
                    }} className="absolute top-0 left-0 right-0 bottom-0" />
                    <TouchableOpacity onPress={navigation.goBack} className="absolute top-10 left-4 rounded-full bg-gray-100 p-2 shadow-md">
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-3 py-3">
                        <Text className="text-2xl font-bold pb-3">
                            {name}
                        </Text>
                        <View className="flex-row flex-wrap items-center mb-3">
                            <View className="flex-row items-center space-x-1 mr-1">
                                <StarIcon size={22} opacity={0.5} color='green' />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-green-500">{rating} ·</Text> {genre}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <LocationMarkerIcon size={22} opacity={0.5} color='gray' />
                                <Text textBreakStrategy='highQuality' className="text-xs text-gray-500 break-words">
                                    Nearby · {address}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-sm text-gray-500 mb-4">
                            {short_description}
                        </Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center p-4 border-y border-y-gray-300">
                        <QuestionMarkCircleIcon size={20} color="#00CCBB" className="pr-3" />
                        <Text className="font-bold text-md flex-1 px-3">
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon size={20} color="#00CCBB" className="ml-auto" />
                    </TouchableOpacity>
                </View>
                <View className="pb-24">
                    <Text className="font-bold px-4 pt-6 mb-3 text-lg">
                        Menu
                    </Text>
                    {/* Dish rows */}
                    {dishes.map((dish) => <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        image={dish.image}
                        price={dish.price}
                        restaurant_id={id}
                    />)}
                </View>
            </ScrollView>
            <View className="absolute bottom-4 w-full px-4 z-50">
                <BasketPopup restaurant_id={id} />
            </View>
        </View>
    )
}

export default RestaurantScreen