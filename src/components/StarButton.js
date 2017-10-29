import React from 'react'

import ImageButton from './ImageButton'
import { colors } from 'src/styles/constants'

export default function StarButton ({ onPress, style, fullStar }) {
  return (
    <ImageButton
      source={fullStar ? require('mycta/assets/full-star.png') : require('mycta/assets/empty-star.png')}
      onPress={onPress}
      style={[{ backgroundColor: colors.yellow[1] }, style]}
    />
  )
}
