import React from 'react'
import { TabNavigator } from 'react-navigation'

import * as scenes from './scenes'

export default function App () {
  const Navigator = TabNavigator({
    favorites: { screen: scenes.favorites },
    map: { screen: scenes.map },
    nearby: { screen: scenes.nearby },
  })

  return <Navigator
  />
}
