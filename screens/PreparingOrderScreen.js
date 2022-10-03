import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { Text as AnimatedText, Image as AnimatedImage, View as AnimatedView } from "react-native-animatable"
import { Circle } from "react-native-progress"
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DeliveryScreen')
        }, 5*1000);
    }, [])
    
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1 bg-[#00CCBB] justify-center items-center">
            <AnimatedImage
                source={require('../assets/loading.gif')}
                animation="slideInUp"
                iterationCount={1}
                className="h-80 max-w-full"
            />
            <AnimatedText
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center"
            >
                Waiting for restaurant to accept your order!
            </AnimatedText>
            <AnimatedView animation="slideInUp" iterationCount={1}>
                <Circle size={60} indeterminate={true} color="white" />
            </AnimatedView>

        </SafeAreaView>
    )
}

export default PreparingOrderScreen