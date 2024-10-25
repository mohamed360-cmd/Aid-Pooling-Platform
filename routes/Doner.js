const express = require("express")
const route = express.Router()
//this is the donners routes will be handled
const {getAddDonation,
    addDonation,
    getManageDonations,
    getEditDonation,
    EditDonation,
    removeDonation,
    changeDonationStatus,
    seeDonationRequests,
    denyDonationRequest,
    approveDonationRequest
} = require("../Controllers/DonerController")
route.get('/addDonation',getAddDonation)
route.post('/addDonation',addDonation)
route.get('/manageDonations',getManageDonations)
route.get('/manageDonations/editDonations/:id',getEditDonation)
route.post('/manageDonations/editDonations',EditDonation)
route.post('/manageDonations/removeDonation',removeDonation)
route.post('/manageDonations/changeDonationStatus',changeDonationStatus)

route.post('/manageDonations/seeDonationRequests',seeDonationRequests)
route.post('/manageDonations/seeDonationRequests/denyDonationRequest',denyDonationRequest)
route.post('/manageDonations/seeDonationRequests/approveDonationRequest',approveDonationRequest)


module.exports = route