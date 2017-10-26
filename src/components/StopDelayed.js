import React from 'react'
import { View, Text, Button } from 'react-native'

import { getPredictions } from 'mycta/jsclient'

export default class Stop extends React.Component {
  state = { predictions: [], active: false }

  render () {
    return (
      <View>
        <Text>{this.props.stop.title}</Text>
        {
          this.state.active ? (
            <Text>
              { this.state.predictions.length > 0
                ? this.state.predictions.join('\n')
                : 'Loading...' }
            </Text>
          ) : (
            <Button
              title='load'
              onPress={this.load}
            />
          )
        }
        <Text>
        </Text>
        <Button
          title='favorite'
          onPress={() => this.props.toggleFavorite(this.props.type, this.props.stop.id)}
        />
      </View>
    )
  }

  load = () => {
    getPredictions(this.props.type, this.props.stop.id, (predictions) => this.setState({ predictions, active: true }))
  }
}
