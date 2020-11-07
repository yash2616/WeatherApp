const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weatherStack = require('./utils/weatherStack.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yash Srivastava'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yash Srivastava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Yash Srivastava'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Enter address to get forecast."
        })
    }

    geocode(req.query.address.toString(), (geoError, geoData) => {
        if(geoError){
            // console.log('Error : ', error)
            res.send({
                error: geoError
            })
        }
        else{
            weatherStack(geoData[0].toString(), geoData[1].toString(), (weatherError, weatherData) => {
                if(weatherError){
                    // console.log('Error : ', weatherError)
                    res.send({
                        error: weatherError
                    })
                } 
                else{
                    // console.log('Data : ', weatherData)
                    res.send({
                        place: req.query.address,
                        forecast: weatherData,
                        location: geoData
                    })
                }
            })
        }
    })

    // res.send({
    //     location: [0,0],
    //     place: req.query.address,
    //     forecast: "Life is black" 
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Srivastava',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yash Srivastava',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})