import fs from 'fs'
import path from 'path'

for (const type of ['bus', 'train']) {
  fs.readFile(path.join(__dirname, `./${type}_stops.csv`), 'utf8', (err, data) => {
    if (err) throw err
    const stops = data.split('\n')
    const keys = stops.shift().split(',').map(value => value.toLocaleLowerCase())
    let previousValue = ''
    let inList = false
    let index
    let result = []
    stops.forEach((stop, i) => {
      if (!stop) return

      const object = {}
      index = 0
      stop = stop.split('')
      stop.forEach((char, i) => {
        if (char === '"') {
          inList = !inList
        }

        if ((char === ',' && !inList) || i === stop.length - 1) {
          object[keys[index]] = previousValue
          index++
          previousValue = ''
        } else if (char !== '"') {
          previousValue += char
        }
      })
      result.push(object)
    })

    if (type === 'train') {
      result = result.map(stop => (
        {
          id: parseInt(stop.stop_id),
          title: stop.stop_name,
          latlng: processLocation(stop.location)
        }
      ))
    } else {
      result = result.map(stop => (
        {
          id: parseInt(stop.stop_id),
          title: stop['cta stop name'],
          latlng: processLocation(stop.location)
        }
      ))
    }

    fs.writeFileSync(path.join(__dirname, `./${type}_stops.json`), JSON.stringify(result))
  })
}

function processLocation (location) {
  location = location.replace(/(\(|\))/g, '').split(',')
  return {latitude: parseFloat(location[0]), longitude: parseFloat(location[1])}
}
