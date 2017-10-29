import { busKey, trainKey } from 'mycta/keys'
import { stringify } from 'querystring'
import moment from 'moment'

export function getPredictions (type, id, callback) {
  if (type === 'train') {
    trainRequest('ttarrivals', { stpid: id }, (data, error) => {
      if (error) callback(null, error)
      else if ('eta' in data) {
        callback(data.eta.map(prediction => moment(prediction.arrT).fromNow(true)))
      } else callback(null, 'no arrival times')
    })
  } else {
    busRequest('getpredictions', { stpid: id }, (data, error) => {
      if (error) callback(null, error)
      else if ('prd' in data) {
        callback(data.prd.map(prediction => moment(prediction.prdtm, 'YYYYMMDD HH:mm').fromNow(true)))
      } else callback(null, 'no arrival times')
    })
  }
}

function get (uri, callback) {
  fetch(uri)
    .then(resp => { console.log(resp); return resp.json() })
    .then(data => { console.log(data); callback(data) })
}

function busRequest (type, parameters, callback) {
  get(`http://ctabustracker.com/bustime/api/v2/${type}?` + stringify({
    key: busKey,
    format: 'json',
    ...parameters
  }), data => {
    data = data['bustime-response']
    if (data.error) callback(null, data.error[0].msg)
    else callback(data)
  })
}

function trainRequest (type, parameters, callback) {
  get(`http://lapi.transitchicago.com/api/1.0/${type}.aspx?` + stringify({
    key: trainKey,
    outputType: 'JSON',
    ...parameters
  }), data => {
    data = data.ctatt
    if (data.errNm) callback(null, data.errNm)
    else callback(data)
  })
}
