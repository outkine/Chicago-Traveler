import React from 'react'
import { AsyncStorage, View } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Location, Constants, Permissions } from 'expo'

import Loading from 'src/components/Loading'
import * as scenes from './scenes'
import { colors } from 'src/styles/constants'

const DEFAULT_LOCATION = {
  location: {
    latitude: 41.89,
    longitude: -87.6923,
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export default class App extends React.Component {
  Navigator = TabNavigator({
    search: { screen: scenes.search },
    all: { screen: scenes.all },
    starred: { screen: scenes.favorites },
    map: { screen: scenes.map },
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

  state = { favorites: { train: [], bus: [] }, location: null }

  constructor (props) {
    super(props)

    AsyncStorage.getItem('trainFavorites', (err, trainFavorites) => {
      console.log('train', trainFavorites, err)
      if (err) console.log(err)
      if (trainFavorites) this.setState({ favorites: { ...this.state.favorites, train: JSON.parse(trainFavorites) } })
    })

    AsyncStorage.getItem('busFavorites', (err, busFavorites) => {
      console.log('bus', busFavorites, err)
      if (err) console.log(err)
      if (busFavorites) this.setState({ favorites: { ...this.state.favorites, bus: JSON.parse(busFavorites) } })
    })

    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        console.log(status)
        if (status !== 'granted') {
          this.setState(DEFAULT_LOCATION)
        } else {
          Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            .then((results) => {
              this.setState({ location: results.coords })
              console.log('result')
            })
            .catch((err) => {
              console.log(err)
              this.setState(DEFAULT_LOCATION)
            })
        }
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
    console.log('FAVORITES SET', type + 'Favorites', favorites)
    AsyncStorage.setItem(type + 'Favorites', JSON.stringify(favorites), (err) => {
      console.log(err)
    })
  }
}
