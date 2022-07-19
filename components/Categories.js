import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import CategoryCard from './CategoryCard'
import sanityClient from '../sanity';


const Categories = () => {
  const [featuredCategories, setFeaturedCategories] = useState([])
  useEffect(() => {
      sanityClient.fetch(`*[_type == "category"]`).then((categories) => {
          setFeaturedCategories(categories)
      })
  }, [])
  return (
    <ScrollView 
      contentContainerStyle={{
        paddingHorizontal : 15,
        paddingTop: 10
      }}
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      {/* Category card */}
      {
        featuredCategories?.map(category => <CategoryCard key={category._id} title={category.title} imgUrl={category.image}/>)
      }
    </ScrollView>
  )
}

export default Categories