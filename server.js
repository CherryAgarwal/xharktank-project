const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/xharktank'
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const pitchRouter = require('./routes/pitches')
app.use('/pitches',pitchRouter)

app.listen(8081, () => {
    console.log('Server started')
})
