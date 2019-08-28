const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Get the path to the directories to use with Express
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

const app = express()

// Configure Handlebars for Express
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Akora Ing. DKB',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Akora Ing. DKB',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            statusCode: 400,
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, lng, add } = {}) => {
        if (error) {
            return res.send({
                statusCode: 400,
                error: error,
            })
        }

        forecast(lat, lng, (error, data) => {
            if (error) {
                return res.send({
                    statusCode: 400,
                    error: error,
                })
            }
            res.send({
                address: add,
                forecast: data
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Requested page not found'
    })
})

app.listen(port, () => {
    console.log('Firing up the server on port ' + port)
})