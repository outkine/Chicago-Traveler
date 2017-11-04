import React from 'react'
import { /*SectionList,*/ ScrollView, View, Text, RefreshControl } from 'react-native'

import Stop from 'src/components/Stop'
import * as stops from 'mycta/info/stops'
import { fonts } from 'src/styles/constants'

export default class Favorites extends React.Component {
  stops = []
  state = { refreshing: false, }

  render () {
    const { favorites, toggleFavorite, } = this.props.screenProps
    // console.log(favorites)

    this.stops = []

    if (!Object.values(favorites).reduce((bool, favorites) => (
      bool || favorites.length !== 0
    ), false)) {
      return (
        <Text style={{
          textAlign: 'center',
          margin: 20,
        }}>
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
      //   renderItem={({ item, section }) =>
      //     <Stop
      //       immediate
      //       toggleFavorite={toggleFavorite}
      //       favorites={favorites}
      //       type={section.type}
      //       stop={stops[section.type][item]}
      //     />
      //   }
      //   keyExtractor={key => key}
      //   sections={
      //     Object.keys(favorites).map(type => ({
      //       type, data: favorites[type]
      //     }))
      //   }
      // />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.stops.forEach(stop => stop.reload())
              this.setState({ refreshing: false, })
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
                        toggleFavorite={(type, title) => toggleFavorite(type, title)}
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

  // shouldComponentUpdate ({ screenProps: { favorites } }) {
  //   return Object.keys(favorites).reduce((bool, type) => (
  //     bool || favorites[type].length > this.props.screenProps.favorites[type]
  //   ), false)
  // }
}
