const request = require('request')

const geocode = (address, callback) => {
    const url = "http://api.openweathermap.org/geo/1.0/direct?q=" + address + "&limit=1&appid=" + process.env.OPEN_WEATHER_API_KEY

    request({ url, json: true}, (error, {body}) => {
        console.log(body)
        if (error) {
            callback("Unable to connect to location services!", undefined)
        } else if (body.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            let state = ""
            if (body[0].state) {
                state = ", " + body[0].state
            }
            let country = ""
            if (body[0].country) {
                country = ", " + body[0].country
            }
            callback(undefined, {
                longitude: body[0].lon,
                latitude: body[0].lat,
                location: body[0].name + state + country
            })
        }
    })
}

module.exports = geocode