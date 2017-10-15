import React from 'react'
import MapView from 'react-native-maps'
import { Text } from 'react-native'

import * as info from 'mycta/info'
import * as cta from 'mycta/jsclient'

export default class Map extends React.Component {
  state = {
    predictions: []
  }
  markers = {}

  render () {
    console.log('state', this.state.predictions)
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

  componentDidUpdate = () => {
    console.log('marker', this.state.activeMarker)
    console.log(this.markers[this.state.activeMarker])
    this.markers[this.state.activeMarker].hideCallout()
    setTimeout(() => this.markers[this.state.activeMarker].showCallout())
  }

  generateMarker = (stop, type) => {
    // console.log('state', this.state.predictions)
    return (
      <MapView.Marker
        key={stop.id}
        coordinate={stop.latlng}
        pinColor={type === 'train' ? 'red' : 'blue'}
        onPress={() => this.handlePress(stop.id, type)}
        ref={(element) => (this.markers[stop.id] = element)}
      >
        <MapView.Callout>
          <Text>{stop.title}</Text>
          <Text>{this.state.activeMarker === stop.id ? this.state.predictions.join('\n') : 'loading...'}</Text>
        </MapView.Callout>
      </MapView.Marker>
    )
  }

  handlePress = (id, type) => {
    cta.getPredictions(type, id, (data) => {
      console.log('final', data)
      this.setState({predictions: data, activeMarker: id})
    })
  }
}
