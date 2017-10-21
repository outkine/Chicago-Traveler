import React from 'react'
import { Animated, Text } from 'react-native'

export default class Indicator extends React.Component {
  state = { translateY: new Animated.Value(0) }

  constructor (props) {
    super(props)

    this.animation = Animated.timing(
      this.state.translateY,
      {
        toValue: -100,
      }
    )
    this.animation.start()
  }

  toggleAnimation () {
    const value = this.props.closing ? -100 : 0
    this.animation.stop()
    this.animation = Animated.timing(
      this.state.translateY,
      {
        toValue: value,
      }
    )
    this.animation.start()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.closing !== nextProps.closing) this.toggleAnimation()
  }

  render () {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.translateY }],
          position: 'absolute',
          top: '100%',
          right: 0,
          left: 0,
          backgroundColor: '#ffffff',
          width: '100%',
          height: 300,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >{this.props.stop.title}</Text>
        <Text>{this.props.predictions.join('\n')}</Text>
      </Animated.View>
    )
  }
}
