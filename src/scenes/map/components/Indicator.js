import React from 'react'
import { Animated, Text, Button } from 'react-native'

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
    console.log('ANIMATION', this.state.translateY._value, 'PREDICTIONS', this.props.predictions)
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
          backgroundColor: '#ffffff',
          width: '100%',
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >{this.props.stop.title}</Text>
        <Text>{this.props.predictions.length > 0 ? this.props.predictions.join('\n') : 'Loading...'}</Text>
        <Button
          title='favorite'
          onPress={() => this.props.toggleFavorite(this.props.stop.type, this.props.stop.id)}
        />
      </Animated.View>
    )
  }
}
