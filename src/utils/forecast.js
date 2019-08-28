const request = require('request')

// Weather forecast function
const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/dcc3bb814926ce35c60f3113f8bbd456/' + lat + ',' + lng + '?units=si'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to access location service', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary)
        }

    })
}

module.exports = forecast