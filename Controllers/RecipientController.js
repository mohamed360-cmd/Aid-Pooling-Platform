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
        res.render("availableDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole, data : donationsList})
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const donationRequest = async(req,res)=>{
//check if first their are a recipient , check if they already requested for that donation then save the request 
const tokenCheck = await JWT_verify(req)
const userVerfier = Recipient_Check(tokenCheck)
if(userVerfier.status){
    const donationID = req.body.donationId
    var sqlStatement = 'SELECT * from donation_requests where Donation_Id=?';
    var params = [donationID]
    const requestedDonationCheckResult = await queryExecuter(sqlStatement,params)
    if(requestedDonationCheckResult.length > 0){
         sqlStatement = 'SELECT * from donations';
         params = []
        const donationsList = await queryExecuter(sqlStatement,params)
        res.render("availableDonations",{authStatus: true, errorStatus: true, successStatus: false, errorMsg: "You Have Already Requested for this Donation", successMsg: null, userRole: userVerfier.data.userRole, data : donationsList})
    }else{
         sqlStatement = 'SELECT Organization_Email,Organization_Name FROM users WHERE Organization_Email=?'
         params = [userVerfier.data.email]
        const infoRequestResult = await queryExecuter(sqlStatement,params)
        sqlStatement = 'INSERT INTO donation_requests (Recipient_Name,Recipient_Email,Requested_Time,Donation_Id,Request_Approval) VALUES (?,?,?,?,?)'
        const date = new Date()
        params = [infoRequestResult[0].Organization_Name,infoRequestResult[0].Organization_Email,date,donationID,"pending"]
        const addDonationRequest = await queryExecuter(sqlStatement,params)
        sqlStatement = 'SELECT * from donations';
        params = []
       const donationsList = await queryExecuter(sqlStatement,params)
        res.render("availableDonations",{authStatus: true, errorStatus: false, successStatus: true, errorMsg: null, successMsg: "request Sent", userRole: userVerfier.data.userRole, data : donationsList})

    }
}else{
    res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
}
}
const getMyRequest = async (req, res) => {
    try {
        const tokenCheck = await JWT_verify(req);
        const userVerfier = await Recipient_Check(tokenCheck);

        if (userVerfier.status) {
            const sqlStatement = 'SELECT * FROM donation_requests WHERE Recipient_Email = ?';
            const params = [userVerfier.data.email];
            const donationRequestsDBQuery = await queryExecuter(sqlStatement, params);

            const requestInfo = [];
            
            for (const request of donationRequestsDBQuery) {
                const donationSqlStatement = 'SELECT * FROM donations WHERE id = ?';
                const donationParams = [request.Donation_Id];
                const donationDbQuery = await queryExecuter(donationSqlStatement, donationParams);

                if (donationDbQuery.length > 0) {
                    const generalResult = {
                        Donation_Type: donationDbQuery[0].Donation_Type,
                        Donation_Description: donationDbQuery[0].Donation_Description,
                        RequestStatus: request.Request_Approval,
                        RequestDate : request.Requested_Time
                    };
                    requestInfo.push(generalResult);
                }
            }

            console.log(requestInfo);
            res.render("myRequest", {
                authStatus: true, 
                errorStatus: false, 
                successStatus: false, 
                errorMsg: null, 
                successMsg: null, 
                userRole: userVerfier.data.userRole, 
                data: requestInfo
            });
        } else {
            res.render("home", {
                authStatus: false, 
                errorStatus: true, 
                successStatus: false, 
                errorMsg: userVerfier.msg, 
                successMsg: null, 
                userRole: null
            });
        }
    } catch (error) {
        console.error("Error in getMyRequest:", error);
        res.render("home", {
            authStatus: false, 
            errorStatus: true, 
            successStatus: false, 
            errorMsg: "An error occurred while processing your request.", 
            successMsg: null, 
            userRole: null
        });
    }
};

module.exports = {getAvailableDonations,donationRequest,getMyRequest}