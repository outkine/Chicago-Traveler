import React from 'react'
import { Animated, Text, Button } from 'react-native'

import Stop from 'src/components/Stop'

export default class Indicator extends React.Component {
  state = { translateY: new Animated.Value(1) }

  constructor (props) {
    super(props)
    console.log('INITIALIZED')
    this.animation = Animated.timing(
      this.state.translateY,
      {
        toValue: 0,
      }
    )
    this.animation.start()
  }

  toggleAnimation () {
    console.log('RESETING ANIMATION')
    const value = this.props.closing ? 0 : 1
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
    console.log('UPDATED', this.props.closing !== nextProps.closing)
    if (this.props.closing !== nextProps.closing) this.toggleAnimation()
  }

  render () {
    console.log('ANIMATION', this.state.translateY._value)
    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: this.state.translateY.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '-50%']
          }),
          right: 0,
          left: 0,
        }}
      >
        <Stop
          immediate
          stop={this.props.stop}
          type={this.props.stop.type}
          toggleFavorite={this.props.toggleFavorite}
          favorites={this.props.favorites}
        />
      </Animated.View>
    )
  }
}
