import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

import * as stops from 'mycta/info/stops'
import { Loading } from 'src/components'

export default class Map extends React.Component {
  state = {
    region: {
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
      ...this.props.location,
    },
    ready: false
  }

  render () {
    return (
      <View style={{ height: '100%' }}>
        <MapView
          style={{ height: '100%', position: 'absolute', width: '100%' }}
          region={this.state.region}
          onRegionChange={(region) => this.setState({ region })}
          onRegionChangeComplete={(region) => this.setState({ region })}
          loadingEnabled={true}
          showsUserLocation={true}
          onPress={this.props.onMapPress}
          onMapReady={() => this.setState({ ready: true })}
        >
          {
            ['train', 'bus'].map(type => (
              <View key={type}>
                {
                  Object.values(stops[type]).map(stop => this.generateMarker(stop, type))
                }
              </View>
            ))
          }
        </MapView>

        { !this.state.ready && <Loading /> }
      </View>
    )
  }

  generateMarker = (stop, type) => {
    return (
      <MapView.Marker
        key={stop.id}
        coordinate={stop.latlng}
        pinColor={type === 'train' ? 'red' : 'blue'}
        onPress={() => this.props.onMarkerPress(stop, type)}
      />
    )
  }
}
