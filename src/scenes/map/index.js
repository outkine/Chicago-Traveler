import React from 'react'
import { View } from 'react-native'

import Map from './Map'
import Indicator from './Indicator'

export default class MainMap extends React.Component {
  state = { stop: null, closing: false }

  render () {
    // console.log('INDEX RENDER', this.state)
    return (
      <View style={{ height: '100%' }}>
        <Map
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
              favorites={this.props.screenProps.favorites}
            />
          )
        }
      </View>
    )
  }
}
