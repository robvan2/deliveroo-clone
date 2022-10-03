import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SafeViewAndroid from '../components/SafeViewAndroid';
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation]);
    const [featuredRows, setFeaturedRows] = useState([])
    useEffect(() => {
        sanityClient.fetch(`
                *[_type == "featured"]{
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type->{
                            title
                        }
                    }
                }
            `)
            .then((rows) => {
                setFeaturedRows(rows)
            })
    }, [])
   
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white flex-1">
            {/* Header */}
            <View className="flex-row items-center pb-3 space-x-2 mx-4">
                <Image source={{
                    uri: 'https://links.papareact.com/wru'
                }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-300 text-xs">Deliver now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search */}
            <View className="flex-row space-x-2 items-center mx-4 pb-2">
                <View className="flex-1 bg-gray-200 flex-row items-center p-2 space-x-2">
                    <SearchIcon size={25} color="gray" />
                    <TextInput
                        placeholder="Restaurants and cuisines"
                        keyboardType="default"
                    />
                </View>
                <AdjustmentsIcon color="#00CCBB" />
            </View>

            <ScrollView className="bg-gray-100">
                {/* Categories */}
                <Categories/>
                {/* Featured Rows */}
                {featuredRows.map(row => <FeaturedRow key={row._id} id={row._id} title={row.title} description={row.short_description} restaurants={row.restaurants} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen