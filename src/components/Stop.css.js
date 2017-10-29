import { StyleSheet } from 'react-native'

import { fonts } from 'src/styles/constants'

export default StyleSheet.create({
  back: {
    width: '90%',
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    ...fonts[1],
  },
  subtitle: {
    ...fonts[2],
    marginBottom: 10,
  },
  predictions: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'rgb(230, 230, 230)',
    backgroundColor: 'rgb(250, 250, 250)',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 40,
  },
  button: {
    marginHorizontal: 20,
  }
})
