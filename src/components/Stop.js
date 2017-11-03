import React from 'react'
import { View, Text } from 'react-native'

import { getPredictions } from 'mycta/jsclient'
import ReloadButton from './ReloadButton'
import StarButton from './StarButton'
import { fonts } from 'src/styles/constants'
import moment from 'moment'

function formatTime (moment_, displaySeconds) {
  // console.log(moment_.diff(moment(), 'seconds'))
  moment_ = moment(0).hours(0).seconds(moment_.diff(moment(), 's'))
  // console.log(moment_)
  let result = ''
  const minutes = String(moment_.minutes())
  if (minutes.length === 1) {
    result += 0
  }
  result += minutes + 'm  '
  if (displaySeconds) {
    const seconds = String(moment_.seconds())
    if (seconds.length === 1) {
      result += 0
    }
    result += seconds + 's  '
  } else {
    result += '      '
  }
  return result
}

export default class Stop extends React.Component {
  state = { loading: false, }
  predictions = {}
  active = false

  constructor (props) {
    super(props)

    if (this.props.immediate) {
      this.state.loading = true
      this.reload(false)
    }

    if (this.props.pure) {
      this.state.starred = this.props.favorites[this.props.type].includes(this.props.stop.title)
    }

    // this.timer = window.setInterval(() => this.forceUpdate())
  }

  render () {
    // console.log(this.state)
    console.log('STOP RENDER', this.state, this.props, this.predictions)
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
          {this.props.stop.displayTitle}
        </Text>
        <Text style={{
          ...fonts[4],
          marginBottom: 10,
        }}>
          {this.props.stop.lines.join(', ')}
        </Text>
        { this.active && (
          <View style={{
            borderWidth: 1,
            padding: 5,
            borderColor: 'rgb(230, 230, 230)',
            backgroundColor: 'rgb(250, 250, 250)',
            marginBottom: 10,
          }}>
            {
              !this.state.loading ? (
                <View>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    {
                      Object.keys(this.props.stop.directions).map(direction =>
                        <Text key={direction} style={{
                          ...fonts[2],
                          flex: 1,
                        }}>
                          {direction}
                        </Text>
                      )
                    }
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                    {
                      Object.keys(this.props.stop.directions).map(direction =>
                        <Text key={direction}>
                          {this.predictions[direction] && (
                            this.predictions[direction].error
                              ? this.predictions[direction].error
                              : this.predictions[direction].data.map((prediction, i) => (
                                formatTime(prediction, i === 0)
                              )).join('\n')
                          )}
                        </Text>
                      )
                    }
                  </View>
                </View>
              ) : (
                <Text style={{
                  textAlign: 'center',
                }}>Loading...</Text>
              )
            }
          </View>
        )}
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
            fullStar={
              this.props.pure
                ? this.state.starred
                : this.props.favorites[this.props.type].includes(this.props.stop.title)
            }
            onPress={() => {
              if (this.props.pure) this.setState({ starred: !this.state.starred, })
              this.props.toggleFavorite(this.props.type, this.props.stop.title)
            }}
            style={{
              marginHorizontal: 20,
            }}
          />
        </View>
      </View>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(
      (!this.props.pure && nextProps.favorites !== this.props.favorites),
      nextProps.stop.title !== this.props.stop.title ,
      nextState.loading !== this.state.loading
    )
    return (
      (!this.props.pure && nextProps.favorites !== this.props.favorites) ||
      nextProps.stop.title !== this.props.stop.title ||
      nextState.loading !== this.state.loading ||
      nextState.starred !== this.state.starred
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.stop.title !== this.props.stop.title) this.reload()
  }
  // componentWillUnmount () {
  //   // window.clearInterval(this.timer)
  // }

  reload = (update = true) => {
    // console.log(this.props)
    this.active = true
    this.predictions = {}
    if (update) this.setState({ loading: true })
    for (let direction of Object.keys(this.props.stop.directions)) {
      // console.log(direction, 'resetting')
      getPredictions(this.props.type, this.props.stop.directions[direction], (predictions, error) => {
        console.log('predictions,', direction, predictions)
        this.predictions = {
          ...this.predictions,
          [direction]: {
            error: error,
            data: predictions,
          },
        }
        if (!Object.keys(this.props.stop.directions).reduce((bool, direction) => (
          bool || !this.predictions[direction]
        ), false)) this.setState({ loading: false })
      })
    }
  }
}
