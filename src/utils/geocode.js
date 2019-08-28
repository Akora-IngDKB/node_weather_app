const request = require('request')

// Geocode function
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGVla2F5YmVlIiwiYSI6ImNqejVuaDk0bTBkYzMzY282YmZ6Y2NoZHAifQ.eB6hqtGL2v0O0-nbOEOpdw"

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to geocode provided location. Try another search', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lng: response.body.features[0].center[0],
                add: address,
            })
        }
    })
}

module.exports = geocode