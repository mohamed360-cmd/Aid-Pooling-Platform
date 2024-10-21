const JWT_verify = require("../middleware/JWT_verify")
const jwt = require("jsonwebtoken")
const queryExecuter = require("../models/QueryExecuter")
const Doner_Check = (ValidToken)=>{
    if(ValidToken.AuthStatus){
        if(ValidToken.data.userRole == "DONER"){
            return {status : true, msg : null, data : ValidToken.data} 
        }else{
            return {status : false, msg : "Action Not Permited", data : ValidToken.data} 
        }
    }else{
        return {status : false,msg:"Please Log In",data : null}
    }
}

const getAddDonation = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
        res.render("addDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole})
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const addDonation = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            var sqlStatement = 'SELECT  id,Organization_Email,Organization_Name,Organization_PhoneNumber FROM users WHERE Organization_Email=?'
            var params = [userVerfier.data.email]
            const doner_Details = await queryExecuter(sqlStatement,params)
            var sqlStatement = 'INSERT INTO  donations (Doner_Id,Doner_Email,Doner_Phonenumber,Donation_Type,Donation_Description,Donation_Amount, Expiration_Date,Dontaion_Pickup_Location,Donation_Availability,Doner_Name) VALUES(?,?,?,?,?,?,?,?,?,?)'
            var params = [doner_Details[0].id,doner_Details[0].Organization_Email, doner_Details[0].Organization_PhoneNumber, req.body.donationType, req.body.donationDescription,req.body.quantity,req.body.expiryDate,req.body.location,true,doner_Details[0].Organization_Name]
            const donation_Add_Result = await queryExecuter(sqlStatement,params)
           // console.log(donation_Add_Result)
            res.render("addDonations",{authStatus: true, errorStatus: false, successStatus: true, errorMsg: null, successMsg: " 🎉 Donation Added", userRole: userVerfier.data.userRole})
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const getManageDonations =  async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            var sqlStatement = 'SELECT *  FROM donations WHERE Doner_Email=?'
            var params = [userVerfier.data.email]
            const donationsList = await queryExecuter(sqlStatement,params)
            console.log(donationsList)
            res.render("ManageDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole,data : donationsList})
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
module.exports = {getAddDonation,addDonation,getManageDonations}