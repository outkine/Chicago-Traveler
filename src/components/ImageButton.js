import React from 'react'
import { View, TouchableNativeFeedback, Image } from 'react-native'

import { colors } from 'src/styles/constants'

export default class ImageButton extends React.Component {
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View
          style={[{
            flex: 1,
            padding: 5,
            borderRadius: 5,
            elevation: 12,
            backgroundColor: colors.blue[1],
            alignSelf: 'center',
          }, this.props.style]}
        >
          <Image
            resizeMode='contain'
            style={{
              flex: 1,
              height: undefined,
              width: undefined,
            }}
            source={this.props.source}
          />
        </View>
      </TouchableNativeFeedback>
    )
  }

  shouldComponentUpdate (nextProps) { return this.props.source !== nextProps.source }
}
