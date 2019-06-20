const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budgetDB', {useNewUrlParser: true})
mongoose.set('useFindAndModify', false)


const app = express()
if (!process.env.NODE_ENV === "production") {
    console.log("here")
    app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
            next()
        })
}
else {
    app.use(express.static(path.join(__dirname, 'build')))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 3723
app.listen(process.env.PORT || port)