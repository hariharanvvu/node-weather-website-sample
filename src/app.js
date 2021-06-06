const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Hariharan'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Hariharan'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Hariharan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a Address!"
        })
    }

    res.send({
        forecast: 'It is cloudy',
        location: 'Chennai',
        address: req.query.address
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Hariharan'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Hariharan'
    })
})

app.listen(port,(res) => {
    console.log('Server is up and running in port ' + port)
})