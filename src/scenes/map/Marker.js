import React from 'react'
import MapView from 'react-native-maps'
import { Text, Button } from 'react-native'

import * as cta from 'mycta/jsclient'

export default class Marker extends React.Component {
  state = { active: false }
  predictions = []

  render () {
    // console.log(this.props)
    const { stop, type, ...other } = this.props
    return (
      <MapView.Marker
        coordinate={stop.latlng}
        onPress={() => this.onPress()}
        ref={(element) => (this.element = element)}
        {...other}
      >
        <MapView.Callout>
          <Text>{stop.title}</Text>
          <Text>{this.state.active ? this.predictions.join('\n') : 'loading...                      \n\n\n\n\n'}</Text>
          <Button
            title='star'
            onPress={() => this.toggleFavorite(type, stop.id)}
          />
        </MapView.Callout>
      </MapView.Marker>
    )
  }

  componentDidUpdate = () => {
    this.element.hideCallout()
    setTimeout(() => this.element.showCallout())
  }

  onPress = () => {
    cta.getPredictions(this.props.type, this.props.stop.id, (data) => {
      this.predictions = data
      this.setState({ active: true })
    })
  }
}
