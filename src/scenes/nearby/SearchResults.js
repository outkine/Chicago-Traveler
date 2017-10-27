import React from 'react'
import { View, ScrollView } from 'react-native'

import { StopDelayed } from 'src/components'
import * as stops from 'mycta/info/stops'

export default function SearchResults ({ search, toggleFavorite }) {
  return (
    <ScrollView>
      {
        ['train', 'bus'].map(type => (
          Object.values(stops[type])
            .filter(stop => (
              stop.id.includes(search) || stop.title.toLowerCase().includes(search)
            ))
            .map(stop => (
              <View key={stop.id}>
                <StopDelayed
                  toggleFavorite={toggleFavorite}
                  type={type}
                  stop={stop}
                />
              </View>
            ))
        ))
      }
    </ScrollView>
  )
}
