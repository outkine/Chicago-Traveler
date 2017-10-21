import React from 'react'
import { Animated, Text } from 'react-native'

export default class Indicator extends React.Component {
  state = { translateY: new Animated.Value(0) }

  constructor (props) {
    super(props)

    console.log('INDICATOR INITIALIZED')
    Animated.timing(
      this.state.translateY,
      {
        toValue: -120,
      }
    ).start()
  }

  render () {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.translateY.interpolate + '%' }],
          position: 'absolute',
          top: '100%',
        }}
      >
        <Text>{this.props.stop.title}</Text>
        <Text>{this.props.predictions.join('\n')}</Text>
      </Animated.View>
    )
  }
}
