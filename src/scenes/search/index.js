import React from 'react'
import { View, TextInput } from 'react-native'

import SearchResults from './SearchResults'

export default class All extends React.Component {
  state = { search: '' }

  render () {
    return (
      <View>
        <TextInput
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
        />
        { !!this.state.search &&
            <SearchResults
              search={this.state.search.toLowerCase()}
              toggleFavorite={this.props.screenProps.toggleFavorite}
            />
        }
      </View>
    )
  }
}
