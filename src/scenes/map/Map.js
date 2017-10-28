import React from 'react'
import MapView from 'react-native-maps'
import { View, Switch, Text } from 'react-native'

// shoutout to ya boy kenny G
// oooh oooh Imma have to say yes

import * as stops from 'mycta/info/stops'
import Loading from 'src/components/Loading'
import styles from './Map.css'

export default class Map extends React.Component {
  state = {
    region: {
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
      ...this.props.location,
    },
    ready: false,
    isTypeTrain: true
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
            Object.values(stops[this.state.isTypeTrain ? 'train' : 'bus']).map(stop =>
              this.generateMarker(stop, this.state.isTypeTrain ? 'train' : 'bus')
            )
          }
        </MapView>
        <View style={styles.typeSwitchBack}>
          <Text style={styles.typeSwitchText}>
            {this.state.isTypeTrain ? 'train' : 'bus'}
          </Text>
          <Switch
            onValueChange={(isTypeTrain) => this.setState({ isTypeTrain })}
            value={this.state.isTypeTrain}
            style={styles.typeSwitch}
          />
        </View>

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
