import React from 'react'
import { ScrollView, View } from 'react-native'

import Button from 'src/components/Button'
import * as lines from 'chicago-traveler/info/lines'
import * as stops from 'chicago-traveler/info/stops'
import Stop from 'src/components/Stop'
import { ctaColors } from 'src/styles/constants'

// class Header extends React.Component {
//   render () {
//     return (
//       <Button
//         onPress={() => this.setState({
//           line: this.state.line === section.line ? '' : section.line
//         })}
//         title={section.line}
//         style={[{
//           width: '85%',
//           elevation: 10,
//           margin: 3,
//           alignSelf: 'center',
//         }, this.props.type === 'train' && {
//           backgroundColor: ctaColors[section.line]
//         }]}
//       />
//     )
//   }

//   shouldComponentUpdate () { return false }
// }

export default class Scroll extends React.Component {
  state = { lineName: '', }

  render () {
    // console.log('ALL RENDER')
    // console.log(Object.keys(lines[this.props.type]).map(line => (
    //   { line, data: lines[this.props.type][line] }
    // )))
    return (
    //   <SectionList
    //     renderSectionHeader={({ section }) => {
    //       console.log(section.line)
    //       return (
    //         <Button
    //           onPress={() => this.setState({
    //             line: this.state.line === section.line ? '' : section.line,
    //           })}
    //           title={section.line}
    //           style={[{
    //             width: '85%',
    //             elevation: 10,
    //             margin: 3,
    //             alignSelf: 'center',
    //           }, this.props.type === 'train' && {
    //             backgroundColor: ctaColors[section.line],
    //           }]}
    //         />
    //       )
    //     }}
    //     renderItem={({ item, section }) => {
    //       // console.log('item')
    //       return (
    //         <Stop
    //           toggleFavorite={this.props.toggleFavorite}
    //           favorites={this.props.favorites}
    //           type={this.props.type}
    //           stop={stops[this.props.type][item]}
    //         />
    //       )
    //     }}
    //     keyExtractor={key => key}
    //     sections={
    //       Object.keys(lines[this.props.type]).map(line => (
    //         { line, data: line === this.state.line ? lines[this.props.type][line] : [] }
    //       ))
    //     }
    //     line={this.state.lineName}
    //   />
    //   )
    // }

      <ScrollView>
        <View style={{ height: 10 }} />
        {
          Object.keys(lines[this.props.type]).map((lineName) => (
            <View key={lineName} style={{ flex: 1 }}>
              <Button
                onPress={() => this.setState({
                  lineName: this.state.lineName === lineName ? '' : lineName,
                })}
                title={lineName}
                style={[{
                  width: '80%',
                  elevation: 10,
                  margin: 3,
                  alignSelf: 'center',
                }, this.props.type === 'train' && {
                  backgroundColor: ctaColors[lineName],
                }]}
              />

              { lineName === this.state.lineName &&
                  lines[this.props.type][lineName].map((stopTitle) =>
                    <View key={stopTitle}>
                      <Stop
                        toggleFavorite={this.props.toggleFavorite}
                        favorites={this.props.favorites}
                        type={this.props.type}
                        stop={stops[this.props.type][stopTitle]}
                        pure
                      />
                    </View>
                  )
              }
            </View>
          ))
        }
        <View style={{ height: 20 }} />
      </ScrollView>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({ lineName: '' })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log(this.state)
    return (
      this.state !== nextState ||
      this.props.type !== nextProps.type
    )
  }
}
