const express = require("express")
const routes = express.Router()
const {getAvailableDonations} = require("../Controllers/RecipientController")
routes.get("/availableDonations",getAvailableDonations)
module.exports = routes