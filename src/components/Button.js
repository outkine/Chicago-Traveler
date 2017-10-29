import React from 'react'
import { View, TouchableNativeFeedback, Text } from 'react-native'

import { colors } from 'src/styles/constants'

export default function Button ({ onPress, title, style }) {
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
          backgroundColor: '#ef6c00'
        }, style]}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}
