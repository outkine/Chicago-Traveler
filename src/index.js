import React from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './scenes/home'

export default function App () {
  const Navigator = StackNavigator({
    Home: { screen: HomeScreen }
  })

  return <Navigator />
}
