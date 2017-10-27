import React from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'

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
              <TouchableWithoutFeedback
                key={type}
                onPress={() => this.setState({ type })}
              >
                <Scroll
                  type={type}
                  toggleFavorite={this.props.screenProps.toggleFavorite}
                />
              </TouchableWithoutFeedback>
            ))
          )
        }
      </View>
    )
  }
}
