import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from '#navigators/TabNavigator'
import TweetDetailsScreen from '#screens/TweetDetailsScreen'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ animation: 'default' }} />

      <Stack.Screen
        name="TweetDetails"
        component={TweetDetailsScreen}
        options={{ animation: 'default' }}
      />
    </Stack.Navigator>
  )
}

export default MainStackNavigator
