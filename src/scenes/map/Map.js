import React from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'
import { Permissions, Location } from 'expo'

// shoutout to ya boy kenny G
// oooh oooh Imma have to say yes

import * as stops from 'chicago-traveler/info/stops'
import Loading from 'src/components/Loading'
import MapSwitch from './MapSwitch'

const DEFAULT_REGION = {
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
  latitude: 41.89,
  longitude: -87.6923,
}

export default class Map extends React.Component {
  state = {
    region: null,
    ready: false,
    isTypeTrain: true
  }

  constructor (props) {
    super(props)

    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        // console.log(status)
        if (status === 'granted') {
          Location.getCurrentPositionAsync({ enableHighAccuracy: true })
            .then((results) => {
              // console.log(results)
              this.setState({
                region: {
                  latitude: results.coords.latitude,
                  longitude: results.coords.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }
              })
            })
        } else {
          this.setState({ region: DEFAULT_REGION })
        }
      })
      .catch(() => {
        this.setState({ region: DEFAULT_REGION })
      })
  }

  render () {
    // console.log(this.state)
    // console.log('MAP RENDER', this.state)
    if (!this.state.region) return <Loading />
    return (
      <View style={{ height: '100%' }}>
        <MapView
          style={{ height: '100%', position: 'absolute', width: '100%' }}
          region={this.state.region}
          onRegionChange={(region) => this.setState({ region })}
          onRegionChangeComplete={(region) => this.setState({ region })}
          showsUserLocation={true}
          onPress={this.props.onMapPress}
          onMapReady={() => this.setState({ ready: true })}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsMyLocationButton={true}
        >
          {
            (this.state.isTypeTrain ? Object.values(stops['train']) : Object.values(stops['bus'])).map(stop =>
              <MapView.Marker
                key={stop.title}
                coordinate={stop.latlng}
                onPress={() => this.props.onMarkerPress(stop, this.state.isTypeTrain ? 'train' : 'bus')}
              />
            )
          }
        </MapView>

        <MapSwitch
          value={this.state.isTypeTrain}
          onChange={isTypeTrain => this.setState({ isTypeTrain })}
        />

        { !this.state.ready && <Loading /> }
      </View>
    )
  }
}
