const express = require('express')
const route = express.Router()
const userHome = require('.././Controllers/userController')
route.get("/",userHome)
module.exports = route