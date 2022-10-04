import { View, Text, SafeAreaView, TouchableOpacity, Platform, Image } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { ChevronDownIcon, XIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Bar } from 'react-native-progress'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../slices/restaurantSlice'
import MapView, { Marker } from 'react-native-maps'

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const {restaurant} = useSelector(selectRestaurant)

    return (
        <View className="flex-1 bg-[#00CCBB]">
            <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="z-50">
                <View className={`flex-row justify-between items-center ${Platform.OS === "android" && 'px-4 py-2'}`}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <XIcon size={30} color="white"/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text className="text-white text-lg font-light">
                            Order help
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="p-6 mx-5 my-2 bg-white rounded shadow-md z-50">
                    <View className="flex-row items-center justify-between" >
                        <View>
                            <Text className="text text-gray-400">
                                Estimated Arrival
                            </Text>
                            <Text className="text-3xl font-extrabold">
                                45-55 Minutes
                            </Text>
                        </View>
                        <Image source={{
                            uri: 'https://links.papareact.com/fls'
                        }}
                            className="h-20 w-20"
                        />
                    </View>
                    <Bar size={30} color='#00CCBB' indeterminate={true}/>
                    <Text className="mt-3 text-sm text-gray-500">
                        Your order at {restaurant.name} is being prepared
                    </Text>
                </View>
            </SafeAreaView>
            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                className="flex-1 z-0 -mt-10"
            >
                <Marker 
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.name}
                    description={restaurant.short_description}
                    identifier="origin"
                    pinColor='#00CCBB'
                />
            </MapView>

            <View className="bg-white flex-row p-4 shadow-md items-center space-x-2">
                <Image source={{
                    uri: 'https://links.papareact.com/wru'
                }}
                    className="h-12 w-12 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="text-lg">
                        Mohamed Khalil
                    </Text>
                    <Text className="text-gray-400">Your driver</Text>
                </View>
                <TouchableOpacity>
                    <Text className="font-bold text-lg text-[#00CCBB]">
                        Call
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeliveryScreen