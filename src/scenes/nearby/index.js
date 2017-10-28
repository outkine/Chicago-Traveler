import React from 'react'
import { View, TextInput, Button } from 'react-native'

import Scroll from './Scroll'
import SearchResults from './SearchResults'

export default class All extends React.Component {
  state = { type: '', search: '' }

  render () {
    return (
      <View>
        <TextInput
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
        />

        {
          this.state.search ? (
            <SearchResults
              search={this.state.search.toLowerCase()}
              toggleFavorite={this.props.screenProps.toggleFavorite}
            />
          ) : (
            ['train', 'bus'].map(type => (
              <View key={type}>
                {
                  type === this.state.type ? (
                    <Scroll
                      type={type}
                      toggleFavorite={this.props.screenProps.toggleFavorite}
                    />
                  ) : (
                    <Button
                      title={type}
                      onPress={() => this.setState({
                        type: this.state.type === type ? '' : type
                      })}
                    />
                  )
                }
              </View>
            ))
          )
        }
      </View>
    )
  }
}
