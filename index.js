const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 2000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/home', (req, res) => {
    res.sendStatus(200)
})

const {parkCarRouter} = require('./routers')

app.use('/parkCar', parkCarRouter)
app.listen(port, () => console.log(`connected to port: ${port}`))