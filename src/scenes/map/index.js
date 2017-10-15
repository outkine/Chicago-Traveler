import React from 'react'
import MapView from 'react-native-maps'

import * as info from 'mycta/info'
import Marker from './Marker'

export default class Map extends React.Component {
  render () {
    // console.log('state', this.state.predictions)
    return (
      <MapView
        style={{height: '100%', position: 'absolute', width: '100%'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {info.trainStops.map(stop => this.generateMarker(stop, 'train'))}
        {info.busStops.map(stop => this.generateMarker(stop, 'bus'))}
      </MapView>
    )
  }

  generateMarker = (stop, type) => {
    // console.log('state', this.state.predictions)
    return (
      <Marker
        key={stop.id}
        stop={stop}
        pinColor={type === 'train' ? 'red' : 'blue'}
      />
    )
  }
}
