import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SafeViewAndroid from '../components/SafeViewAndroid'

const DeliveryScreen = () => {
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="flex-1 bg-[#00CCBB]">
            <Text>DeliveryScreen</Text>
        </SafeAreaView>
    )
}

export default DeliveryScreen