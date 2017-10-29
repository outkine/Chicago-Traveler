import React from 'react'
import { View, Text } from 'react-native'

import { getPredictions } from 'mycta/jsclient'
import ReloadButton from './ReloadButton'
import StarButton from './StarButton'
import { fonts } from 'src/styles/constants'

export default class Stop extends React.Component {
  state = { predictions: {}, active: false }

  constructor (props) {
    super(props)

    if (this.props.immediate) {
      this.reload(false)
    }
  }

  render () {
    return (
      <View style={{
        width: '90%',
        elevation: 2,
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        margin: 10,
      }}>
        <Text style={{
          ...fonts[1],
        }}>
          {this.props.stop.title}
        </Text>
        <Text style={{
          ...fonts[2],
          marginBottom: 10,
        }}>
          {this.props.stop.lines.join(', ')}
        </Text>
        { this.active &&
          <View style={{
            borderWidth: 1,
            padding: 5,
            borderColor: 'rgb(230, 230, 230)',
            backgroundColor: 'rgb(250, 250, 250)',
            marginBottom: 10,
            flexDirection: 'row',
          }}>
            {
              Object.keys(this.props.stop.directions).map(direction =>
                <View key={direction}>
                  <Text style={{
                    ...fonts[1],
                  }}>
                    {direction}
                  </Text>
                  <Text>
                    {this.state.predictions[direction] && this.state.predictions[direction].length > 0 ? this.state.predictions[direction].join('\n') : 'Loading...'}
                  </Text>
                </View>
              )
            }
          </View>
        }
        <View style={{
          flexDirection: 'row',
          height: 40,
        }}>
          <ReloadButton
            onPress={() => this.reload()}
            style={{
              marginHorizontal: 20,
            }}
          />
          <StarButton
            fullStar={this.props.favorites[this.props.type].includes(this.props.stop.title)}
            onPress={() => this.props.toggleFavorite(this.props.type, this.props.stop.title)}
            style={{
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.stop.title !== this.props.stop.title) this.reload()
  }

  reload = (update = true) => {
    console.log(this.props)
    this.active = true
    for (let direction of Object.keys(this.props.stop.directions)) {
      if (update) this.setState({ predictions: { ...this.state.predictions, [direction]: [] } })
      getPredictions(this.props.type, this.props.stop.directions[direction], (predictions, error) => {
        console.log('predictions!!!!')
        this.setState({ predictions: { ...this.state.predictions, [direction]: error ? [error] : predictions } })
      })
    }
  }
}
