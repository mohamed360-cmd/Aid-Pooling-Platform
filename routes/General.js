const express = require('express')
const route = express.Router()
const {home,getLogin,getRegister,register} = require('../Controllers/generalController')
route.get("/",home)
route.get("/login",getLogin)
route.get("/register",getRegister)
route.post("/register",register)
module.exports = route