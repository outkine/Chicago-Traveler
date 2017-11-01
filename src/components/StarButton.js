import React from 'react'

import ImageButton from './ImageButton'
import { colors } from 'src/styles/constants'

export default class StarButton extends React.Component {
  render () {
    return (
      <ImageButton
        source={this.props.fullStar ? require('mycta/assets/full-star.png') : require('mycta/assets/empty-star.png')}
        onPress={this.props.onPress}
        style={[{ backgroundColor: colors.yellow[1] }, this.props.style]}
      />
    )
  }

  // shouldComponentUpdate () { return false }
}
