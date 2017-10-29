import React from 'react'
import { ScrollView, View } from 'react-native'

import Button from 'src/components/Button'
import * as lines from 'mycta/info/lines'
import * as stops from 'mycta/info/stops'
import Stop from 'src/components/Stop'
import { ctaColors } from 'src/styles/constants'

export default class Scroll extends React.Component {
  state = { lineName: '' }

  render () {
    return (
      <ScrollView style={{ padding: 10 }}>
        {
          Object.keys(lines[this.props.type]).map((lineName) => (
            <View key={lineName} style={{ flex: 1 }}>
              <Button
                onPress={() => this.setState({
                  lineName: this.state.lineName === lineName ? '' : lineName
                })}
                title={lineName}
                style={[{
                  width: '85%',
                  elevation: 10,
                  margin: 3,
                  alignSelf: 'center',
                }, this.props.type === 'train' && {
                  backgroundColor: ctaColors[lineName]
                }]}
              />

              { lineName === this.state.lineName &&
                  lines[this.props.type][lineName].map((stopId) =>
                    <View key={stopId}>
                      <Stop
                        toggleFavorite={this.props.toggleFavorite}
                        type={this.props.type}
                        stop={stops[this.props.type][stopId]}
                      />
                    </View>
                  )
              }
            </View>
          ))
        }
        <View style={{ height: 20 }} />
      </ScrollView>
    )
  }
}
