import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

import * as info from 'mycta/info'

export default class Map extends React.Component {
  state = {
    region: {
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
      ...this.props.location,
    }
  }
  constructor(props){
    super(props);console.log('map initializeD!')
  }

  render () {
    return (
      <View style={{ height: '100%' }}>
        <MapView
          style={{ height: '100%', position: 'absolute', width: '100%' }}
          region={this.state.region}
          onRegionChange={(region) => {console.log(1, region);this.setState({ region })}}
          onRegionChangeComplete={(region) => { console.log(2, region); this.setState({ region }) }}
          loadingEnabled={true}
          showsUserLocation={true}
          onPress={this.props.onMapPress}
        >
          {
            ['train', 'bus'].map(type => (
              <View key={type}>
                {
                  Object.values(info[type]).map(stop => this.generateMarker(stop, type))
                }
              </View>
            ))
          }
        </MapView>
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
