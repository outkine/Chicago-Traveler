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
          id: stop.stop_id,
          title: stop.stop_name,
          latlng: processLocation(stop.location),
          lines: generateTrainLines(stop),
          direction: stop.direction_id,
        }
      ))
    } else {
      result = result.map(stop => (
        {
          id: stop.systemstop,
          title: stop.public_nam,
          latlng: { latitude: parseFloat(stop.point_x), longitude: parseFloat(stop.point_y) },
          lines: stop.routesstpg.split(','),
          direction: stop.dir.replace('B', ''),
        }
      ))
    }

    let objectResult = result.reduce((accumulator, value) => {
      accumulator[value.id] = value
      return accumulator
    }, {})

    fs.writeFileSync(path.join(__dirname, `./${type}_stops.json`), JSON.stringify(objectResult))

    const lines = {}
    for (let stop of result) {
      for (let line of stop.lines) {
        if (!(line in lines)) lines[line] = []
        lines[line].push(stop.id)
      }
    }
    fs.writeFileSync(path.join(__dirname, `./${type}_lines.json`), JSON.stringify(lines))
  })
}

function processLocation (location) {
  location = location.replace(/(\(|\))/g, '').split(',')
  return { latitude: parseFloat(location[0]), longitude: parseFloat(location[1]) }
}

const L_COLORS = {
  red: 'red',
  blue: 'blue',
  g: 'green',
  brn: 'brown',
  p: 'purple',
  pnk: 'pink',
  o: 'orange',
}
function generateTrainLines (stop) {
  const lines = []
  for (let color in L_COLORS) {
    if (stop[color] === 'TRUE') lines.push(L_COLORS[color])
  }
  return lines
}
