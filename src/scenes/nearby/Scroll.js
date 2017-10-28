import React from 'react'
import { ScrollView, View, Button } from 'react-native'

import * as lines from 'mycta/info/lines'
import * as stops from 'mycta/info/stops'
import Stop from 'src/components/Stop'

export default class Scroll extends React.Component {
  state = { lineName: '' }

  render () {
    return (
      <ScrollView>
        {
          Object.keys(lines[this.props.type]).map((lineName) => (
            <View key={lineName}>
              {
                lineName === this.state.lineName ? (
                  lines[this.props.type][lineName].map((stopId) => (
                    <View key={stopId}>
                      <Stop
                        toggleFavorite={this.props.toggleFavorite}
                        type={this.props.type}
                        stop={stops[this.props.type][stopId]}
                      />
                    </View>
                  ))
                ) : (
                  <Button
                    onPress={() => this.setState({
                      lineName: this.state.lineName === lineName ? '' : lineName
                    })}
                    title={lineName}
                  />
                )
              }
            </View>
          ))
        }
      </ScrollView>
    )
  }
}
