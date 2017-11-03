import React from 'react'
import { View, ScrollView, Text, } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import { fonts, } from 'src/styles/constants'

export default function SearchResults ({ search, toggleFavorite, favorites, }) {
  console.log('search', search)
  return (
    <ScrollView>
      <View style={{ height: 10, }} />
      {
        ['train', 'bus'].map(type => {
          const results = Object.values(stops[type])
            .filter(stop => (
              Object.values(stop.directions).reduce((acc, id) => acc || id.includes(search), false) ||
              stop.title.toLowerCase().includes(search)
            ))
          if (results.length > 0 && results.length < 50) {
            return (
              <View key={type}>
                <Text style={{
                  ...fonts[0],
                  marginTop: 15,
                }}>
                  {type.capitalize()}
                </Text>
                {
                  results.map(stop =>
                    <View key={stop.title}>
                      <Stop
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        type={type}
                        stop={stop}
                      />
                    </View>
                  )
                }
              </View>
            )
          }
        })
      }
      <View style={{ height: 10, }} />
    </ScrollView>
  )
}
