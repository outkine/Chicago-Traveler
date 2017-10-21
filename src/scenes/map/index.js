import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

import * as info from 'mycta/info'
import Marker from './Marker'

export default class Map extends React.Component {
  state = { ready: false }

  render () {
    console.log('state', this.state)
    return (
      <View style={{ height: '100%' }}>
        <MapView
          style={{ height: '100%', position: 'absolute', width: '100%' }}
          region={{
            latitude: 41.89,
            longitude: -87.6923,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          }}
          loadingEnabled={true}
          showsUserLocation={true}
        >
          {Object.values(info.train).map(stop => this.generateMarker(stop, 'train'))}
          {Object.values(info.bus).map(stop => this.generateMarker(stop, 'bus'))}
        </MapView>
      </View>
    )
  }

  generateMarker = (stop, type) => {
    // console.log('state', this.state.predictions)
    return (
      <Marker
        key={stop.id}
        stop={stop}
        type={type}
        pinColor={type === 'train' ? 'red' : 'blue'}
        onFavoritesChange={this.props.screenProps.toggleFavorite}
        favorites={this.props.screenProps.favorites[type]}
      />
    )
  }
}
