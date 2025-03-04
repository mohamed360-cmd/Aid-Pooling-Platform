const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressLayout = require("express-ejs-layouts")
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.set("view engine","ejs")
app.use(expressLayout)
app.use("/public",express.static("public"))
const general = require('./routes/General')
const doner = require('./routes/Doner')
const recipient = require('./routes/Recipient')
app.use("/",general)
app.use("/doner",doner)
app.use("/recipient",recipient)
app.listen(8080,()=>{
    console.log("Server Active And Listening")
})