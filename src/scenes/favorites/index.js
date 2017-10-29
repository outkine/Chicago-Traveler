import React from 'react'
import { View, Text } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import styles from './Favorites.css'

export default function Favorites ({ screenProps: { favorites, toggleFavorite } }) {
  return (
    <View style={styles.back}>
      {
        Object.keys(favorites).map(type =>
          favorites[type].length > 0 &&
            <View key={type} style={styles.typeSection}>
              <Text style={styles.typeTitle}>
                {type.capitalize()}
              </Text>
              {
                favorites[type].map((id) =>
                  <View key={id}>
                    <Stop
                      immediate
                      toggleFavorite={toggleFavorite}
                      type={type}
                      stop={stops[type][id]}
                    />
                  </View>
                )
              }
            </View>
        )
      }
    </View>
  )
}
