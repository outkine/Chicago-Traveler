import React from 'react'
import { View, TouchableNativeFeedback, Image } from 'react-native'

import { colors } from 'src/styles/constants'

export default function ImageButton ({ onPress, source, style }) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
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
        }, style]}
      >
        <Image
          resizeMode='contain'
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          source={source}
        />
      </View>
    </TouchableNativeFeedback>
  )
}
