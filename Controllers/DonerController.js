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
const idorGuard = async(ID,email)=>{
var sqlStatement = "SELECT * FROM donations where id=?";
var params = [ID]
const donationDetails = await queryExecuter(sqlStatement,params)
if(donationDetails.length > 0){
    if(donationDetails[0].Doner_Email === email){
        return { status : true , msg : null, data :donationDetails[0]}
    }else{
        return { status : false ,msg : "Your Are Are trying To Perform IDOR attack HaHaHa!",data : null }
    }
}else{
    return { status : false,msg : "Invalid Entry" ,data : null}
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
            res.render("ManageDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole,data : donationsList})
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const getEditDonation = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            const donationID =   req.params.id
            const email = await userVerfier.data.email
            const idorCheck = await idorGuard(donationID,email)
            if(idorCheck.status){
                res.render("editDonations",{authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: userVerfier.data.userRole,data : idorCheck.data})
            }else{
                res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: idorCheck.msg, successMsg: null, userRole: userVerfier.data.userRole,data : null})
            }
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const EditDonation = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            const email = await userVerfier.data.email
            const idorCheck = await idorGuard(req.body.donationId,email)
            if(idorCheck.status){

                var sqlStatement = 'SELECT  id,Organization_Email,Organization_Name,Organization_PhoneNumber FROM users WHERE Organization_Email=?'
                var params = [userVerfier.data.email]
                const doner_Details = await queryExecuter(sqlStatement,params)
                var sqlStatement = 'UPDATE donations SET Doner_Id = ?, Doner_Email = ?, Doner_Phonenumber = ?, Donation_Type = ?, Donation_Description = ?, Donation_Amount = ?, Expiration_Date = ?, Dontaion_Pickup_Location = ?, Donation_Availability = ?, Doner_Name = ? WHERE id = ?';
                var params = [
                  doner_Details[0].id, 
                  doner_Details[0].Organization_Email, 
                  doner_Details[0].Organization_PhoneNumber, 
                  req.body.donationType, 
                  req.body.Donation_Description, 
                  req.body.quantity, 
                  req.body.Expiration_Date, 
                  req.body.location, 
                  true, 
                  doner_Details[0].Organization_Name,
                  req.body.donationId
                ];
                
                const donation_Add_Result = await queryExecuter(sqlStatement,params)
                console.log(req.body)
                res.render("editDonations",{authStatus: true, errorStatus: false, successStatus: true, errorMsg: null, successMsg: "Donation Updated Successfuly", userRole: userVerfier.data.userRole,data : idorCheck.data})
            }else{
                res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: idorCheck.msg, successMsg: null, userRole: userVerfier.data.userRole,data : null})
            }
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }

}
const removeDonation = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            const donationID =   req.body.donationId
            const email = await userVerfier.data.email
            const idorCheck = await idorGuard(donationID,email)
            if(idorCheck.status){
                var sqlStatement = 'DELETE FROM  donations  WHERE  id=?'
                var params = [donationID]
                const deleteResult = await queryExecuter(sqlStatement,params)
                res.render("home",{authStatus: true, errorStatus: false, successStatus: true, errorMsg: null, successMsg: "Donation Removed", userRole: userVerfier.data.userRole,data : idorCheck.data})
            }else{
                res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: idorCheck.msg, successMsg: null, userRole: userVerfier.data.userRole,data : null})
            }
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
const changeDonationStatus = async(req,res)=>{
    const tokenCheck = await JWT_verify(req)
    const userVerfier = Doner_Check(tokenCheck)
    if(userVerfier.status){
        if(userVerfier.data.userRole === "DONER"){
            const donationID =   req.body.donationId
            const email = await userVerfier.data.email
            const Donation_Availability_Status = req.body.Donation_Availability
            const idorCheck = await idorGuard(donationID,email)
            if(idorCheck.status){
                var sqlStatement;
                if(Donation_Availability_Status === "1"){
                    sqlStatement = 'UPDATE donations SET Donation_Availability=0 WHERE id=?'
                }else{
                    sqlStatement = 'UPDATE donations SET Donation_Availability=1 WHERE id=?'

                }
                var params = [donationID]
                const donation_Status_update_Result = await queryExecuter(sqlStatement,params)
                //res.render("ManageDonations",{authStatus: true, errorStatus: false, successStatus: true, errorMsg: null, successMsg: "Donation Status updated", userRole: userVerfier.data.userRole,data : idorCheck.data})
                res.redirect("/doner/manageDonations")
            }else{
                res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: idorCheck.msg, successMsg: null, userRole: userVerfier.data.userRole,data : null})
            }
        }else{
            res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})

        }
    }else{
        res.render("home",{authStatus: false, errorStatus: true, successStatus: false, errorMsg: userVerfier.msg, successMsg: null, userRole: null})
    }
}
module.exports = {
    getAddDonation,
    addDonation,
    getManageDonations,
    getEditDonation,
    EditDonation,
    removeDonation,
    changeDonationStatus
}