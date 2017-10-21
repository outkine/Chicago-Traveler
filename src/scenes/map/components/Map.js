import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

import * as info from 'mycta/info'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      region: {
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
        ...props.location,
      }
    }
  }

  render () {
    console.log(this.state.region)
    return (
      <View style={{ height: '100%' }}>
        <MapView
          style={{ height: '100%', position: 'absolute', width: '100%' }}
          region={this.state.region}
          onRegionChange={(region) => this.setState({ region })}
          loadingEnabled={true}
          showsUserLocation={true}
          onPress={this.props.onMapPress}
        >
          {Object.values(info.train).map(stop => this.generateMarker(stop, 'train'))}
          {Object.values(info.bus).map(stop => this.generateMarker(stop, 'bus'))}
        </MapView>
      </View>
    )
  }

  generateMarker = (stop, type) => {
    // console.log('state', this.state.predictions)
    // return (
    //   <Marker
    //     key={stop.id}
    //     stop={stop}
    //     type={type}
    //     pinColor={type === 'train' ? 'red' : 'blue'}
    //     onFavoritesChange={this.props.screenProps.toggleFavorite}
    //     favorites={this.props.screenProps.favorites[type]}
    //   />
    // )

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
