import { Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoryCard = ({title, imgUrl}) => {
  return (
    <TouchableOpacity className="relative mr-2">
        <Image
            source={{
                uri : urlFor(imgUrl).url()
            }}
            className="h-20 w-20 rounded"
        />
        <Text className="absolute text-xs bottom-1 left-1 font-bold text-white">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard