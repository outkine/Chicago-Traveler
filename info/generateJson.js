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

function getDirection (stop) {
  return stop.stop_name.substring(stop.stop_name.lastIndexOf('(') + 1, stop.stop_name.lastIndexOf(')'))
}

const CTA_DIRECTIONS = {
  s: 'South',
  n: 'North',
  e: 'East',
  w: 'West',
  ne: 'Northeast',
  nw: 'Northwest',
  se: 'Southeast',
  sw: 'Southwest',
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
          direction: CTA_DIRECTIONS[stop.direction_id.toLowerCase()] + '\n' + getDirection(stop),
        }
      ))
    } else {
      result = result
        .filter(stop => stop.routesstpg)
        .map(stop => (
          {
            id: stop.systemstop,
            displayTitle: stop.public_nam,
            title: stop.public_nam + ' ' + stop.cross_st,
            latlng: { latitude: parseFloat(stop.point_y), longitude: parseFloat(stop.point_x) },
            lines: stop.routesstpg.split(',').filter(route => route),
            direction: CTA_DIRECTIONS[stop.dir.replace('B', '').toLowerCase()] + '-bound',
          }
        ))
    }

    const objectResult = result.reduce((stops, stop) => {
      if (stop.title in stops) {
        stops[stop.title].directions[stop.direction] = stop.id
        for (let line of stop.lines) {
          if (!stops[stop.title].lines.includes(line)) {
            stops[stop.title].lines.push(line)
          }
        }
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
        if (!line) console.log(stopTitle)
        if (!(line in lines)) lines[line] = []
        lines[line].push(stopTitle)
      }
    }
    fs.writeFileSync(path.join(__dirname, `./${type}_lines.json`), JSON.stringify(lines))
  })
}
