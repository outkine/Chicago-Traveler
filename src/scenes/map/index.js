import React from 'react'
import MapView from 'react-native-maps'

import * as info from 'mycta/info'

export default class Map extends React.Component {
  render () {
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
        {info.trainStops.map(stop => (
          <MapView.Marker
            key={stop.title}
            coordinate={stop.latlng}
            title={'title'}
            description={'description'}
          />
        ))}
        {info.busStops.map(stop => (
          <MapView.Marker
            key={stop.title}
            coordinate={stop.latlng}
            title={'title'}
            description={'description'}
          />
        ))}
      </MapView>
    )
  }
}
