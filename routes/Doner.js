const express = require("express")
const route = express.Router()
//this is the donners routes will be handled
const {getAddDonation,addDonation} = require("../Controllers/DonerController")
route.get('/addDonation',getAddDonation)
route.post('/addDonation',addDonation)
module.exports = route