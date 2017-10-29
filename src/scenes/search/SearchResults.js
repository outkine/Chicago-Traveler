import React from 'react'
import { View, ScrollView, Text } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import { fonts } from 'src/styles/constants'

export default function SearchResults ({ search, toggleFavorite }) {
  return (
    <ScrollView>
      {
        ['train', 'bus'].map(type => {
          const results = Object.values(stops[type])
            .filter(stop => (
              stop.id.includes(search) || stop.title.toLowerCase().includes(search)
            ))

          return (
            results.length > 0 &&
              <View key={type}>
                <Text style={{
                  ...fonts[0],
                  marginTop: 15,
                }}>
                  {type.capitalize()}
                </Text>
                {
                  results.map(stop =>
                    <View key={stop.id}>
                      <Stop
                        toggleFavorite={toggleFavorite}
                        type={type}
                        stop={stop}
                      />
                    </View>
                  )
                }
              </View>
          )
        })
      }
    </ScrollView>
  )
}
