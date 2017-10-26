import React from 'react'
import { Text, ScrollView, View } from 'react-native'

import { StopDelayed } from 'src/components'
import * as info from 'mycta/info'

function findDistance (distance1, distance2) {
  return Math.sqrt(
    (distance1.latitude - distance2.latitude) ^ 2 +
    (distance1.longitude - distance2.longitude) ^ 2
  )
}

export default function Nearby ({ screenProps: { favorites, toggleFavorite, location } }) {
  return (
    <ScrollView>
      {
        ['train', 'bus'].map(type => (
          <View key={type}>
            <Text>{type}</Text>
            {
              Object.values(info[type])
                .sort((a, b) => (
                  findDistance(a.latlng, location) > findDistance(b.latlng, location) ? -1 : 1
                ))
                .map((stop) => (
                  <View key={stop.id}>
                    <StopDelayed
                      toggleFavorite={toggleFavorite}
                      type={type}
                      stop={stop}
                    />
                  </View>
                ))
            }
          </View>
        ))
      }
    </ScrollView>
  )
}
