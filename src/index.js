import React from 'react'
import { TabNavigator } from 'react-navigation'

import * as scenes from './scenes'

export default function App () {
  const Navigator = TabNavigator({
    map: { screen: scenes.map },
    favorites: { screen: scenes.favorites },
    nearby: { screen: scenes.nearby },
  })

  return <Navigator
  />
}
