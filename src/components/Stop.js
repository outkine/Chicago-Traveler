import React from 'react'
import { View, Text } from 'react-native'

import { getPredictions } from 'mycta/jsclient'
import styles from './Stop.css'
import ReloadButton from './ReloadButton'
import StarButton from './StarButton'

export default class Stop extends React.Component {
  state = { predictions: [], active: false }

  constructor (props) {
    super(props)

    if (this.props.immediate) {
      this.reload(false)
    }
  }

  render () {
    return (
      <View style={styles.back}>
        <Text style={styles.title}>
          {this.props.stop.title}
        </Text>
        <Text style={styles.subtitle}>
          {this.props.stop.lines.join(', ')}
        </Text>
        { this.active &&
          <Text style={styles.predictions}>
            {this.state.predictions.length > 0 ? this.state.predictions.join('\n') : 'Loading...'}
          </Text>
        }
        <View style={styles.buttonRow}>
          <ReloadButton
            onPress={() => this.reload()}
            style={styles.button}
          />
          <StarButton
            fullStar={this.props.favorites[this.props.type].includes(this.props.stop.id)}
            onPress={() => this.props.toggleFavorite(this.props.type, this.props.stop.id)}
            style={styles.button}
          />
        </View>
      </View>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.stop.id !== this.props.stop.id) this.reload()
  }

  reload = (update = true) => {
    if (update) this.setState({ predictions: [] })
    this.active = true
    getPredictions(this.props.type, this.props.stop.id, (predictions, error) =>
      this.setState({ predictions: error ? [error] : predictions })
    )
  }
}
