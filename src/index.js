import React from 'react'
import { AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Location } from 'expo'

import * as scenes from './scenes'

export default class App extends React.Component {
  Navigator = TabNavigator({
    map: { screen: scenes.map },
    favorites: { screen: scenes.favorites },
    nearby: { screen: scenes.nearby },
  })

  state = { favorites: { train: [], bus: [] }, location: {} }

  constructor (props) {
    super(props)

    AsyncStorage.getItem('trainFavorites', (trainFavorites) => {
      if (trainFavorites) this.setState({ favorites: { ...this.state.favorites, train: trainFavorites } })
    })

    AsyncStorage.getItem('busFavorites', (busFavorites) => {
      if (busFavorites) this.setState({ favorites: { ...this.state.favorites, bus: busFavorites } })
    })

    Location.getCurrentPositionAsync({ enableHighAccuracy: true }, (results) => {
      this.setState({ location: results })
    })
  }

  render () {
    return <this.Navigator screenProps={{ ...this.state, toggleFavorite: this.toggleFavorite }} />
  }

  toggleFavorite = (type, id) => {
    const favorites = this.state.favorites[type]

    if (!favorites.includes(id)) {
      favorites.push(id)
    } else {
      favorites.splice(favorites.indexOf(id), 1)
    }

    AsyncStorage.setItem(type + 'Favorites', favorites[type])
  }
}
