const express = require("express")
const routes = express.Router()
const {getAvailableDonations,donationRequest,getMyRequest} = require("../Controllers/RecipientController")
routes.get("/availableDonations",getAvailableDonations)
routes.post("/donationRequest",donationRequest)
routes.get("/myRequest",getMyRequest)

module.exports = routes