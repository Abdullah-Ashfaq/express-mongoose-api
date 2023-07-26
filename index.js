const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const dotenv = require("dotenv")


const app = express()
// const User = require('./model/userSchema')
dotenv.config({path: './config.env'});
require("./db/conn")

const port = 5000;

// app.use(cors())
app.use(bodyParser.json())
app.use(require("./router/auth"))

app.get('/', (req, res) => {
    res.json({"Server": "The server is is live"})
})


// middleware

middleware = ((req, res, next) => {
    console.log("middleware is running on the about section")
    next();
})

app.use('/about', middleware, (req, res) => ( () => {

    res.json({"About": "we are on the About server"})

}))

app.get("/register", (req, res) => {
    res.send("register page")
})

app.listen(port, () => {
    console.log(`the server is live on ${port}`)
})
