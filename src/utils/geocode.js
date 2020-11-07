const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaDI2MTYiLCJhIjoiY2tnd2Nvd3Q4MDByaDMwb3NmdnN5eHIwdyJ9.vyYm5PFR_iSu25DXLPLoDQ&limit=1';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to reach the API.', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, response.body.features[0].center)
        }
    })
}

module.exports = geocode