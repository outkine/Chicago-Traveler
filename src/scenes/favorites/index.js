import React from 'react'
import { ScrollView, View, Text, RefreshControl } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import { fonts } from 'src/styles/constants'

// TODO: make it so that when you unstar a stop it still remains in the view
export default class Favorites extends React.Component {
  stops = []
  state = { refreshing: false }

  render () {
    const { favorites, toggleFavorite } = this.props.screenProps

    if (Object.keys(favorites).length === 0) {
      return (
        <Text>
          No starred stops. Go add some!
        </Text>
      )
    }

    return (
      // <SectionList
      //   renderSectionHeader={({ section }) =>
      //     <Text style={{
      //       ...fonts[0],
      //       marginTop: 20,
      //     }}>
      //       {section.type.capitalize()}
      //     </Text>
      //   }
      //   renderItem={({ item }) =>
      //     <Stop
      //       immediate
      //       toggleFavorite={toggleFavorite}
      //       favorites={favorites}
      //       type={type}
      //       stop={stops[type][title]}
      //     />
      //   }
      //   sections={
      //     Object.keys(favorites).map(type =>
      //       {data: }
      //     )
      //   }
      // />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.stops.forEach(stop => stop.reload())
              this.setState({ refreshing: false })
            }}
          />
        }
      >
        {
          Object.keys(favorites).map(type =>
            favorites[type].length > 0 &&
            <View key={type}>
              <Text style={{
                ...fonts[0],
                marginTop: 20,
              }}>
                {type.capitalize()}
              </Text>
              {
                favorites[type].map((title) =>
                  <View key={title}>
                    <Stop
                      immediate
                      toggleFavorite={toggleFavorite}
                      favorites={favorites}
                      type={type}
                      stop={stops[type][title]}
                      ref={(element) => element && this.stops.push(element)}
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
}
