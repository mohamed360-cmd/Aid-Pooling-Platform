const JWT_verify = require("../middleware/JWT_verify")
const jwt = require("jsonwebtoken")
const queryExecuter = require("../models/QueryExecuter")
const Recipient_Check = (ValidToken)=>{
    if(ValidToken.AuthStatus){
        if(ValidToken.data.userRole == "RECIPIENT"){
            return {status : true, msg : null, data : ValidToken.data} 
        }else{
            return {status : false, msg : "Action Not Permited", data : ValidToken.data} 
        }
    }else{
        return {status : false,msg:"Please Log In",data : null}
    }
}
const getAvailableDonations = async (req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Recipient_Check(tokenCheck)
    if(userVerfier.status){
        var sqlStatement = 'SELECT * from donations';
        var params = []
        const donationsList = await queryExecuter(sqlStatement,params)
        console.log(donationsList)
        res.render("availableDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole, data : donationsList})
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
module.exports = {getAvailableDonations}