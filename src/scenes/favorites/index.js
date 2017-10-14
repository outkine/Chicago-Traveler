import React from 'react'
import { Text, View } from 'react-native'

import styles from 'src/styles'

export default function App (props) {
  console.log(props)
  return (
    <View style={styles.container}>
      <Text>favorites</Text>
    </View>
  )
}
