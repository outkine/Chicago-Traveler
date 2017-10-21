import React from 'react'
import { View } from 'react-native'

import * as components from './components'
import { getPredictions } from 'mycta/jsclient'

export default class MainMap extends React.Component {
  state = { stop: null, predictions: [], closing: false }

  render () {
    return (
      <View style={{ height: '100%' }}>
        <components.Map
          location={this.props.screenProps.location}
          onMarkerPress={this.onMarkerPress}
          onMapPress={() => this.setState({ closing: true, predictions: [] })}
        />
        {
          this.state.stop && (
            <components.Indicator
              {...this.state}
            />
          )
        }
      </View>
    )
  }

  onMarkerPress = (stop, type) => {
    this.setState({ stop: stop, closing: false })
    getPredictions(type, stop.id, (data) => {
      this.setState({ predictions: data })
    })
  }
}
