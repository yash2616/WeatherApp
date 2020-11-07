const request = require('request')

const weatherStack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b18caed834c13f11bcbccd120386912d&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to reach the API.', undefined)
        }
        else if(response.body.error){
            callback('Location not found.', undefined)
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0])
        }
    })
}

module.exports = weatherStack