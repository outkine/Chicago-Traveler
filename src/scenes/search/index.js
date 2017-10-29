import React from 'react'
import { View, TextInput } from 'react-native'

import SearchResults from './SearchResults'
import { colors } from 'src/styles/constants'

export default class All extends React.Component {
  state = { search: '' }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
          style={{
            width: '90%',
            marginTop: 10,
            backgroundColor: colors.black[0],
            elevation: 4,
            alignSelf: 'center',
          }}
          underlineColorAndroid='transparent'
        />
        { !!this.state.search &&
            <SearchResults
              search={this.state.search.toLowerCase()}
              toggleFavorite={this.props.screenProps.toggleFavorite}
              favorites={this.props.screenProps.favorites}
            />
        }
      </View>
    )
  }
}
