import React from 'react'
import { View } from 'react-native'

import Map from './Map'
import Indicator from './Indicator'

export default class MainMap extends React.Component {
  state = { stop: null, closing: false }

  render () {
    return (
      <View style={{ height: '100%' }}>
        <Map
          location={this.props.screenProps.location}
          onMarkerPress={(stop, type) =>
            this.setState({ stop: { ...stop, type: type }, closing: false })
          }
          onMapPress={() => this.setState({ closing: true })}
        />
        {
          this.state.stop && (
            <Indicator
              {...this.state}
              toggleFavorite={this.props.screenProps.toggleFavorite}
            />
          )
        }
      </View>
    )
  }
}
