import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import { fonts } from 'src/styles/constants'

export default function Favorites ({ screenProps: { favorites, toggleFavorite } }) {
  return (
    <ScrollView>
      {
        Object.keys(favorites).map(type =>
          favorites[type].length > 0 &&
            <View key={type}>
              <Text style={{
                ...fonts[0],
                marginTop: 15,
              }}>
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
    </ScrollView>
  )
}
