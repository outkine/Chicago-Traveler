import { busKey, trainKey } from 'mycta/keys'
import { stringify } from 'querystring'

function formatTime (milliseconds) {
  let seconds = Math.floor(milliseconds / 1000)
  let result = ''
  console.log(seconds)

  if (seconds >= 60) {
    result += addUnit(Math.floor(seconds / 60), 'minute') + ' '
    seconds -= 60 * Math.floor(seconds / 60)
  }

  if (seconds) {
    result += addUnit(seconds, 'second')
  }

  return result
}

function addUnit (value, type) {
  return value + ' ' + type + (value > 1 ? 's' : '')
}

function formatBusDateTime (dateTime) {
  let list = dateTime.split('')
  list.splice(4, 0, '-')
  list.splice(7, 0, '-')
  list.splice(10, 1, 'T')
  return list.join('')
}

function getTimeDiff (dateTime) {
  return new Date(dateTime) - new Date()
}

export function getPredictions (type, id, callback) {
  if (type === 'train') {
    trainRequest('ttarrivals', { stpid: id }, (data) => callback(
      data.eta
        .filter(prediction => getTimeDiff(prediction.arrT) > 0)
        .map(prediction => formatTime(getTimeDiff(prediction.arrT)))
    ))
  } else {
    busRequest('getpredictions', { stpid: id }, (data) => callback(
      data.error ? [data.error[0].msg] : data.prd
        .filter(prediction => getTimeDiff(formatBusDateTime(prediction.prdtm)) > 0)
        .map(prediction => formatTime(getTimeDiff(formatBusDateTime(prediction.prdtm))))
    ))
  }
}

function busRequest (type, parameters, callback) {
  fetch(`http://ctabustracker.com/bustime/api/v2/${type}?` + stringify({
    key: busKey,
    format: 'json',
    ...parameters
  }))
    .then((resp) => resp.json())
    .then((data) => { console.log(data); callback(data['bustime-response']) })
}

function trainRequest (type, parameters, callback) {
  fetch(`http://lapi.transitchicago.com/api/1.0/${type}.aspx?` + stringify({
    key: trainKey,
    outputType: 'JSON',
    ...parameters
  }))
    .then((resp) => resp.json())
    .then((data) => { console.log(data); callback(data.ctatt) })
}
