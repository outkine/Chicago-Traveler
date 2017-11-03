import React from 'react'

import ImageButton from './ImageButton'
import { colors } from 'src/styles/constants'

export default class ReloadButton extends React.Component {
  render () {
    return (
      <ImageButton
        source={require('mycta/assets/refreshing.png')}
        onPress={this.props.onPress}
        style={[{ backgroundColor: colors.blue[1] }, this.props.style]}
      />
    )
  }

  shouldComponentUpdate () { return false }
}
