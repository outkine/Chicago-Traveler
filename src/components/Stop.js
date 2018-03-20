import React from 'react'
import { View, Text } from 'react-native'

import { getPredictions } from 'chicago-traveler/jsclient'
import ReloadButton from './ReloadButton'
import StarButton from './StarButton'
import { fonts, ctaColors, colors } from 'src/styles/constants'
import moment from 'moment'

function formatTime (moment_, displaySeconds) {
  // console.log(moment_.diff(moment(), 'seconds'))
  let seconds = moment_.diff(moment(), 's')
  if (seconds < 0) return 'due'
  moment_ = moment(0).hours(0).seconds(seconds)
  // console.log(moment_)
  let result = ''
  const minutes = String(moment_.minutes())
  if (minutes.length === 1) {
    result += 0
  }
  result += minutes + 'm '
  if (displaySeconds) {
    const seconds = String(moment_.seconds())
    if (seconds.length === 1) {
      result += 0
    }
    result += seconds + 's '
  } else {
    result += '     '
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
  }

  render () {
    // console.log('STOP RENDER')
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
          ...fonts[5],
          marginBottom: 2,
        }}>
          {Object.values(this.props.stop.directions).join(', ')}
        </Text>
        <Text style={{
          ...fonts[4],
          marginBottom: 7,
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
                    marginBottom: 5,
                  }}>
                    {
                      Object.keys(this.props.stop.directions).map(direction =>
                        <View key={direction} style={{ flex: 1 }}>
                          {
                            this.props.type === 'train' ? (
                              <View>
                                <Text style={{
                                  ...fonts[2],
                                }}>
                                  {direction.split('\n')[1]}
                                </Text>
                                <Text style={{
                                  ...fonts[4],
                                }}>
                                  {direction.split('\n')[0]}
                                </Text>
                              </View>
                            ) : (
                              <Text style={{
                                ...fonts[2],
                              }}>
                                {direction}
                              </Text>
                            )
                          }

                        </View>
                      )
                    }
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                    {
                      Object.keys(this.props.stop.directions).map(direction =>
                        <View key={direction}>
                          {this.predictions[direction] && (
                            this.predictions[direction].error ? (
                              <Text>{this.predictions[direction].error}</Text>
                            ) : (
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                  {
                                    this.predictions[direction].data.map((prediction, i) =>
                                      <View key={i} style={[{
                                        marginRight: 10,
                                      }, this.props.type === 'train' && {
                                        backgroundColor: ctaColors[prediction.line],
                                        height: 10,
                                        width: 10,
                                        marginVertical: 4.5,
                                      }, Object.keys(this.predictions).length === 4 && this.props.type === 'train' && {
                                        marginVertical: 3.25,
                                        marginRight: 5,
                                      }]}>
                                        {this.props.type === 'bus' &&
                                          <Text style={{
                                            color: colors.black[2],
                                            textAlign: 'right',
                                          }}>
                                            {prediction.line}
                                          </Text>
                                        }
                                      </View>
                                    )
                                  }
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                  {
                                    this.predictions[direction].data.map((prediction, i) =>
                                      <Text key={i} style={Object.keys(this.predictions).length === 4 && {
                                        fontSize: 12,
                                      }}>
                                        {prediction.arrival}
                                      </Text>
                                    )
                                  }
                                </View>
                              </View>
                            )
                          )}
                        </View>
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
    // console.log(
    //   (!this.props.pure && nextProps.favorites !== this.props.favorites),
    //   nextProps.stop.title !== this.props.stop.title ,
    //   nextState.loading !== this.state.loading
    // )
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

  reload = (update = true) => {
    // console.log(this.props)
    this.active = true
    this.predictions = {}
    if (update) this.setState({ loading: true })
    for (let direction of Object.keys(this.props.stop.directions)) {
      // console.log(direction, 'resetting')
      getPredictions(this.props.type, this.props.stop.directions[direction], (predictions, error) => {
        // console.log('predictions,', direction, predictions, error)
        this.predictions = {
          ...this.predictions,
          [direction]: {
            error: error,
            data: predictions && predictions.map((prediction, i) => (
              { ...prediction, arrival: formatTime(prediction.arrival, i === 0) }
            ))
          },
        }
        if (!Object.keys(this.props.stop.directions).reduce((bool, direction) => (
          bool || !this.predictions[direction]
        ), false)) this.setState({ loading: false })
      })
    }
  }
}
