import React from 'react'
import MapView from 'react-native-maps'
import { View, Switch, Text } from 'react-native'

// shoutout to ya boy kenny G
// oooh oooh Imma have to say yes

import * as stops from 'mycta/info/stops'
import Loading from 'src/components/Loading'
import { colors } from 'src/styles/constants'

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
              <MapView.Marker
                key={stop.id}
                coordinate={stop.latlng}
                onPress={() => this.props.onMarkerPress(stop, this.state.isTypeTrain ? 'train' : 'bus')}
              />
            )
          }
        </MapView>
        <View style={{
          backgroundColor: 'white',
          alignSelf: 'flex-end',
          margin: 10,
          borderRadius: 5,
        }}>
          <Text style={{
            textAlign: 'center',
            color: colors.black[2],
          }}>
            {this.state.isTypeTrain ? 'train' : 'bus'}
          </Text>
          <Switch
            onValueChange={(isTypeTrain) => this.setState({ isTypeTrain })}
            value={this.state.isTypeTrain}
            onTintColor={colors.yellow[2]}
            thumbTintColor={colors.yellow[1]}
            tintColor={colors.black[1]}
          />
        </View>

        { !this.state.ready && <Loading /> }
      </View>
    )
  }
}
