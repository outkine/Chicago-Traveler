import React from 'react'
import { View } from 'react-native'

import Scroll from './Scroll'
import ImageButton from 'src/components/ImageButton'

export default class All extends React.Component {
  state = { type: '', search: '' }

  render () {
    return (
      <View style={{ flex: 1 }}>
        {
          ['train', 'bus'].map(type =>
            <View key={type} style={!this.state.type && { flex: 1 }} >
              <View style={[
                this.state.type ? { height: 70 } : { flex: 1 }
              ]}>
                <ImageButton
                  source={
                    type === 'train'
                      ? require('mycta/assets/train.png')
                      : require('mycta/assets/bus.png')
                  }
                  onPress={() => this.setState({
                    type: this.state.type === type ? '' : type
                  })}
                  style={[
                    {
                      width: '90%'
                    },
                    !this.state.type ? {
                      margin: 20,
                    } : {
                      marginTop: 10,
                    }
                  ]}
                />
              </View>

              { this.state.type === type &&
                  <Scroll
                    type={this.state.type}
                    toggleFavorite={this.props.screenProps.toggleFavorite}
                  />
              }
            </View>
          )
        }
      </View>
    )
  }
}
