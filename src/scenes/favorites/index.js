import React from 'react'
import { View } from 'react-native'

import { Stop } from 'src/components'
import * as info from 'mycta/info'

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
                    stop={info[type][id]}
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
