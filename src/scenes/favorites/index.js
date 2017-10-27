import React from 'react'
import { View } from 'react-native'

import { Stop } from 'src/components'
import * as stops from 'mycta/info/stops'

export default function Favorites ({ screenProps: { favorites, toggleFavorite } }) {
  return (
    <View>
      {
        Object.keys(favorites).map(type => (
          <View key={type}>
            {
              favorites[type].map((id) => (
                <View key={id}>
                  <Stop
                    toggleFavorite={toggleFavorite}
                    type={type}
                    stop={stops[type][id]}
                  />
                </View>
              ))
            }
          </View>
        ))
      }
    </View>
  )
}
