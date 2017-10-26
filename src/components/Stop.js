import React from 'react'
import { View, Text, Button } from 'react-native'

import { getPredictions } from 'mycta/jsclient'

export default class Stop extends React.Component {
  state = { predictions: [] }

  constructor (props) {
    super(props)

    getPredictions(props.type, props.stop.id, (predictions) => this.setState({ predictions }))
  }

  render () {
    return (
      <View>
        <Text>{this.props.stop.title}</Text>
        <Text>
          {this.state.predictions.length > 0 ? this.state.predictions.join('\n') : 'Loading...'}
        </Text>
        <Button
          title='favorite'
          onPress={() => this.props.toggleFavorite(this.props.type, this.props.stop.id)}
        />
      </View>
    )
  }
}
