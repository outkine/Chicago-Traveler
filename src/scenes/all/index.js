import React from 'react'
import { View } from 'react-native'

import Scroll from './Scroll'
import ImageButton from 'src/components/ImageButton'

export default class All extends React.Component {
  state = { type: '', search: '' }

  render () {
    return (
      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        <View style={{
          flexDirection: 'row',
          height: 70,
          padding: 10,
          elevation: 5,
          backgroundColor: 'white',
        }}>
          {
            ['train', 'bus'].map(type =>
              <View key={type} style={{ flex: 1 }}>
                <ImageButton
                  source={
                    type === 'train'
                      ? require('mycta/assets/train.png')
                      : require('mycta/assets/bus.png')
                  }
                  onPress={() => this.setState({ type })}
                  style={{
                    marginHorizontal: 20,
                    width: '50%'
                  }}
                />
              </View>
            )
          }
        </View>

        { !!this.state.type &&
          <Scroll
            type={this.state.type}
            toggleFavorite={this.props.screenProps.toggleFavorite}
            favorites={this.props.screenProps.favorites}
          />
        }
      </View>
    )
  }
}
