import React from 'react'
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native'

import * as lines from 'mycta/info/lines'
import * as stops from 'mycta/info/stops'
import { StopDelayed } from 'src/components'

export default class Scroll extends React.Component {
  state = { lineName: '' }

  render () {
    return (
      <ScrollView>
        {
          Object.keys(lines[this.props.type]).map((lineName) => (
            <TouchableWithoutFeedback
              key={lineName}
              onPress={() => this.setState({ lineName })}
            >
              <View>
                { lineName === this.state.lineName &&
                  lines[this.props.type][lineName].map((stopId) => (
                    <View key={stopId}>
                      <StopDelayed
                        toggleFavorite={this.props.toggleFavorite}
                        type={this.props.type}
                        stop={stops[this.props.type][stopId]}
                      />
                    </View>
                  ))
                }
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </ScrollView>
    )
  }
}
