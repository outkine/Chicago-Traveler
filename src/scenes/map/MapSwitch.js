import React from 'react'
import { View, Text, Switch } from 'react-native'

import { fonts, colors } from 'src/styles/constants'

export default class MapSwitch extends React.Component {
  render () {
    // console.log('MAP_SWITCH RENDER')
    return (
      <View style={{
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        margin: 10,
        borderRadius: 3,
        elevation: 2,
      }}>
        <Text style={{
          ...fonts[3]
        }}>
          {this.props.value ? 'Train' : 'Bus'}
        </Text>
        <Switch
          onValueChange={this.props.onChange}
          value={this.props.value}
          onTintColor={colors.yellow[2]}
          thumbTintColor={colors.yellow[1]}
          tintColor={colors.black[1]}
        />
      </View>
    )
  }

  // shouldComponentUpdate (nextProps) {
  //   return nextProps.value !== this.props.value
  // }
}
