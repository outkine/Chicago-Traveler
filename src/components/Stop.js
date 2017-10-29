import React from 'react'
import { View, Text } from 'react-native'

import { getPredictions } from 'mycta/jsclient'
import styles from './Stop.css'
import ReloadButton from './ReloadButton'
import StarButton from './StarButton'
import ImageButton from './ImageButton'

export default class Stop extends React.Component {
  state = { predictions: [] }

  constructor (props) {
    super(props)

    if (this.props.immediate) {
      this.getPredictions()
    }
  }

  render () {
    return (
      <View style={styles.back}>
        <Text style={styles.title}>
          {this.props.stop.title}
        </Text>
        { this.active &&
          <Text style={styles.predictions}>
            {this.state.predictions.length > 0 ? this.state.predictions.join('\n') : 'Loading...'}
          </Text>
        }
        <View style={styles.buttonRow}>
          <ReloadButton
            onPress={() => this.getPredictions()}
            style={styles.button}
          />
          <StarButton
            onPress={() => this.props.toggleFavorite(this.props.type, this.props.stop.id)}
            style={styles.button}
          />
        </View>
      </View>
    )
  }

  getPredictions = () => {
    this.active = true
    getPredictions(this.props.type, this.props.stop.id, (predictions) =>
      this.setState({ predictions })
    )
  }
}
