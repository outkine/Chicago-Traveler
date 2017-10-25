import React from 'react'
import { AsyncStorage, View } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Location, Constants } from 'expo'

import { Loading } from './components'
import * as scenes from './scenes'

export default class App extends React.Component {
  Navigator = TabNavigator({
    map: { screen: scenes.map },
    favorites: { screen: scenes.favorites },
    nearby: { screen: scenes.nearby },
  })

  state = { favorites: { train: [], bus: [] }, location: null }

  constructor (props) {
    super(props)

    AsyncStorage.getItem('trainFavorites', (trainFavorites) => {
      if (trainFavorites) this.setState({ favorites: { ...this.state.favorites, train: trainFavorites } })
    })

    AsyncStorage.getItem('busFavorites', (busFavorites) => {
      if (busFavorites) this.setState({ favorites: { ...this.state.favorites, bus: busFavorites } })
    })

    Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((results) => {
        this.setState({ location: results.coords })
      })
  }

  render () {
    console.log(this.state)
    if (!this.state.location) {
      return <Loading />
    }
    return (
      <View style={{ height: '100%', paddingTop: Constants.statusBarHeight }}>
        <this.Navigator
          screenProps={{ ...this.state, toggleFavorite: this.toggleFavorite }}
        />
      </View>
    )
  }

  toggleFavorite = (type, id) => {
    console.log('FAVORITES TOGGLED')
    const favorites = this.state.favorites[type]

    if (!favorites.includes(id)) {
      favorites.push(id)
    } else {
      favorites.splice(favorites.indexOf(id), 1)
    }

    this.forceUpdate()
    AsyncStorage.setItem(type + 'Favorites', favorites[type])
  }
}
