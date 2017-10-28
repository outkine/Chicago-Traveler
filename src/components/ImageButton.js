import React from 'react'
import { View, TouchableNativeFeedback, Image } from 'react-native'

export default function ImageButton ({ onPress, source, style }) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      <View
        style={[style, {
          flex: 1,
          padding: 5,
          marginHorizontal: 20,
          borderRadius: 5,
          elevation: 12,
        }]}
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
