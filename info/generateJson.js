import fs from 'fs'
import path from 'path'

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
  pexp: 'purple',
  y: 'yellow',
  pnk: 'pink',
  o: 'orange',
}
function generateTrainLines (stop) {
  const lines = []
  for (let color in L_COLORS) {
    if (stop[color] === 'true' && !lines.includes(L_COLORS[color])) lines.push(L_COLORS[color])
  }
  return lines
}

const L_DIRECTIONS = {
  s: 'South-bound',
  n: 'North-bound',
  e: 'East-bound',
  w: 'West-bound',
  ne: 'Northeast-bound',
  nw: 'Northwest-bound',
  se: 'Southeast-bound',
  sw: 'Southwest-bound',
}

for (const type of ['bus', 'train']) {
  fs.readFile(path.join(__dirname, `./${type}_stops.csv`), 'utf8', (err, data) => {
    if (err) throw err
    const stops = data.split('\n')
    const keys = stops.shift().split(',').map(value => value.toLowerCase())
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
          displayTitle: stop.station_name,
          title: stop.station_descriptive_name,
          latlng: processLocation(stop.location),
          lines: generateTrainLines(stop),
          direction: L_DIRECTIONS[stop.direction_id.toLowerCase()],
        }
      ))
    } else {
      result = result.map(stop => (
        {
          id: stop.systemstop,
          displayTitle: stop.public_nam,
          title: stop.public_nam,
          latlng: { latitude: parseFloat(stop.point_y), longitude: parseFloat(stop.point_x) },
          lines: stop.routesstpg.split(','),
          direction: L_DIRECTIONS[stop.dir.replace('B', '').toLowerCase()],
        }
      ))
    }

    const objectResult = result.reduce((stops, stop) => {
      if (stop.title in stops) {
        stops[stop.title].directions[stop.direction] = stop.id
      } else {
        // warning: causing mutable changes below
        stop.directions = { [stop.direction]: stop.id }
        delete stop.id
        delete stop.direction
        stops[stop.title] = stop
      }
      return stops
    }, {})

    fs.writeFileSync(path.join(__dirname, `./${type}_stops.json`), JSON.stringify(objectResult))


    const lines = {}
    for (let stopTitle in objectResult) {
      for (let line of objectResult[stopTitle].lines) {
        if (!(line in lines)) lines[line] = []
        lines[line].push(stopTitle)
      }
    }
    fs.writeFileSync(path.join(__dirname, `./${type}_lines.json`), JSON.stringify(lines))
  })
}
