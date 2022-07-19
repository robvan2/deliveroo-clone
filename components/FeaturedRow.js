import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { urlFor } from '../sanity'

const FeaturedRow = ({id, title, description, restaurants}) => {
  return (
    <View className="pt-1 px-4">
        <View className="mt-4 flex-row items-center">
            <Text className="text-lg font-bold flex-1">
                {title}
            </Text>
            <ArrowRightIcon color="#00CCBB" size={25}/>
        </View>
        <Text className="text-xs text-gray-400 pb-2">
            {description}
        </Text>
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {restaurants?.map(restaurant => <RestaurantCard
                key={restaurant._id}
                id={restaurant._id}
                imgUrl={urlFor(restaurant.image).url()}
                name={restaurant.name}
                rating={restaurant.rating}
                genre={restaurant.type?.title || '/'}
                address={restaurant.address || '/'}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
            />)}
            
        </ScrollView>
    </View>
  )
}

export default FeaturedRow