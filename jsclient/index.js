import { busKey, trainKey } from 'mycta/keys'
import { stringify } from 'querystring'
import moment from 'moment'

export function getPredictions (type, id, callback) {
  if (type === 'train') {
    trainRequest('ttarrivals', { stpid: id }, (data) => callback(
      data.errNm ? [data.errNm] : data.eta
        .map(prediction => moment(prediction.arrT).fromNow(true))
    ))
  } else {
    busRequest('getpredictions', { stpid: id }, (data) => callback(
      data.error ? [data.error[0].msg] : data.prd
        .map(prediction => moment(prediction.prdtm, 'YYYYMMDD HH:mm').fromNow(true))
    ))
  }
}

function get (uri, callback) {
  fetch(uri)
    .then(resp => resp.json())
    .then(data => { console.log(data); callback(data) })
}

function busRequest (type, parameters, callback) {
  get(`http://ctabustracker.com/bustime/api/v2/${type}?` + stringify({
    key: busKey,
    format: 'JSON',
    ...parameters
  }), data => callback(data['bustime-response']))
}

function trainRequest (type, parameters, callback) {
  get(`http://lapi.transitchicago.com/api/1.0/${type}.aspx?` + stringify({
    key: trainKey,
    outputType: 'JSON',
    ...parameters
  }), data => callback(data.ctatt))
}
