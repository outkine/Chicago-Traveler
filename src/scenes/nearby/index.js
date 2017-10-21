import React from 'react'
import { Text, View } from 'react-native'

import * as info from 'mycta/info'

function findDistance (distance1, distance2) {
  return Math.sqrt(
    (distance1.latitude - distance2.latitude) ^ 2 +
    (distance1.longitude - distance2.longitude) ^ 2
  )
}

export default function Nearby ({ screenProps: { favorites, toggleFavorite, location } }) {
  return (
    <View>
      {
        Object.keys(favorites).map(type => (
          <View key={type}>
            {
              favorites[type]
                .sort((a, b) => (
                  findDistance(a, location) > findDistance(b, location) ? -1 : 1
                ))
                .map((id) => (
                  <View key={id}>
                    <Text>
                      {info[type][id].latlng}
                    </Text>
                  </View>
                ))
            }
          </View>
        ))
      }
    </View>
  )
}
