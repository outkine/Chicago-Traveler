import React from 'react'
import { Text, View } from 'react-native'

export default function Loading () {
  return (
    <View style={{
      height: '100%',
      width: '100%',
      position: 'absolute',
      backgroundColor: '#ffffff',
    }}>
      <Text>
        Loading...
      </Text>
    </View>
  )
}
