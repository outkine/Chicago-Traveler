import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function Loading () {
  return (
    <View style={{
      height: '100%',
      width: '100%',
      position: 'absolute',
      justifyContent: 'center'
    }}>
      <ActivityIndicator size='large' />
    </View>
  )
}
