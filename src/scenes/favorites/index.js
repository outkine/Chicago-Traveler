import React from 'react'
import { Text, View, Button } from 'react-native'

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
                  <Text>
                    {info[type][id].title}
                  </Text>
                  <Button
                    title='unstar'
                    onPress={() => toggleFavorite(type, id)}
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
