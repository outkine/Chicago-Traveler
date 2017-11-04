import React from 'react'
import { AsyncStorage, View } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Constants } from 'expo'

import * as scenes from './scenes'
import { colors } from 'src/styles/constants'

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export default class App extends React.Component {
  Navigator = TabNavigator({
    starred: { screen: scenes.favorites },
    map: { screen: scenes.map },
    search: { screen: scenes.search },
    all: { screen: scenes.all },
  }, {
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: colors.blue[1],
      },
      indicatorStyle: {
        backgroundColor: colors.yellow[1],
      }
    }
  })

  state = { favorites: { train: [], bus: [] } }

  constructor (props) {
    super(props)

    // AsyncStorage.setItem('trainFavorites', '[]')
    // AsyncStorage.setItem('busFavorites', '[]')

    AsyncStorage.getItem('trainFavorites', (err, trainFavorites) => {
      // console.log('train', trainFavorites, err)
      if (err) console.log(err)
      if (trainFavorites) this.setState({ favorites: { ...this.state.favorites, train: JSON.parse(trainFavorites) } })
    })

    AsyncStorage.getItem('busFavorites', (err, busFavorites) => {
      // console.log('bus', busFavorites, err)
      if (err) console.log(err)
      if (busFavorites) this.setState({ favorites: { ...this.state.favorites, bus: JSON.parse(busFavorites) } })
    })
  }

  render () {
    // console.log(this.state)
    return (
      <View style={{ height: '100%', paddingTop: Constants.statusBarHeight }}>
        <this.Navigator
          screenProps={{ favorites: this.state.favorites, toggleFavorite: this.toggleFavorite }}
        />
      </View>
    )
  }

  toggleFavorite = (type, title) => {
    // console.log(this.state.favorites, type, title)
    let newFavorites
    if (!this.state.favorites[type].includes(title)) {
      // console.log('add')
      newFavorites = { ...this.state.favorites, [type]: [...this.state.favorites[type], title] }
    } else {
      // console.log('subtract')
      newFavorites = { ...this.state.favorites, [type]: this.state.favorites[type].filter(stopTitle => stopTitle !== title) }
    }
    this.setState({ favorites: newFavorites })
    // console.log('FAVORITES SET', type + 'Favorites', newFavorites)
    AsyncStorage.setItem(type + 'Favorites', JSON.stringify(newFavorites[type]), (err) => {
      console.log(err)
    })
  }
}
