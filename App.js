import { Permissions } from 'expo'

import App from './src'

export default App

Permissions.askAsync(Permissions.LOCATION, (status) => {
  if (status !== 'granted') throw new Error('Location permission not granted')
})
