const db = require("../config/db.js")
const bcrypt = require("bcrypt")
const secretToken = "a6c769a1f1dc30ea6c8cf130fc17e2fc"
const queryExecuter = require("../models/QueryExecuter.js")
const verifyJWT_Token = require("../middleware/JWT_verify.js")
const jwt = require("jsonwebtoken")

const home = async (req, res) => {
  const tokeneVerifiication = await verifyJWT_Token(req)
  console.log(tokeneVerifiication)
  if (tokeneVerifiication.AuthStatus) {
    res.render("home.ejs", { authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: tokeneVerifiication.data.userRole })
  } else {
    res.render("home.ejs", { authStatus: false, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null, userRole: null })

  }
}
const getLogin = (req, res) => {
  //this returns the login page 
  res.render("login", { authStatus: false, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null })
}
const login = async (req, res) => {

  const { email, password } = req.body
  var sqlStatement = 'SELECT `Organization_Email` FROM `users` WHERE Organization_Email=?'
  var params = [email]
  const emailCheck = await queryExecuter(sqlStatement, params)
  if (emailCheck.length > 0) {
    //check password , generate jwt ,  set details and take user home 
    var sqlStatement = 'SELECT `password` FROM `users` where Organization_Email=? '
    var params = [email]
    const hashedPassword = await queryExecuter(sqlStatement, params)
    const checkPasswordSame = await bcrypt.compare(password, hashedPassword[0].password)
    if (checkPasswordSame) {
      //if true  generate jwt , save it in a cookie and set auth to true and success message to login success 
      var sqlStatement = 'SELECT `Account_Type` FROM users WHERE Organization_Email=?'
      var params = [email]
      var roleSearchResult = await queryExecuter(sqlStatement,params)
      var userRole = await roleSearchResult[0].Account_Type
      const jwtToken = jwt.sign({ email,userRole }, secretToken)
      res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        sameSite: 'strict'
      })
      var sqlStatement = 'SELECT `Account_Type` from `users` where Organization_Email=?'
      var params = [email]
      var userRole = await queryExecuter(sqlStatement, params)
      userRole = userRole[0].Account_Type
      res.render('home', { authStatus: true, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null ,userRole : userRole })
    } else {
      res.render('login', { authStatus: false, errorStatus: true, successStatus: false, errorMsg: "wrong Email Or Password", successMsg: null })
    }
  } else {
    res.render("login", { authStatus: false, errorStatus: true, successStatus: false, errorMsg: "wrong Email Or Password", successMsg: null })
  }
}

const getRegister = (req, res) => {
  //this return the register page 
  res.render("register", { authStatus: false, errorStatus: false, successStatus: false, errorMsg: null, successMsg: null })

}
const register = async (req, res) => {
  const { Organization_Email,
    Organization_Name,
    Organization_PhoneNumber,
    Organization_Password,
    Account_Type
  } = req.body
  var sqlStatement = 'SELECT `Organization_Email` FROM `users` WHERE Organization_Email=?'
  var params = [Organization_Email]
  const emailCheck = await queryExecuter(sqlStatement, params)
  console.log(emailCheck)
  if (emailCheck.length > 0) {
    res.render("register", { authStatus: false, errorStatus: true, successStatus: false, errorMsg: "Email Already Exist", successMsg: null })

  } else {
    var sqlStatement = 'SELECT `Organization_Name` FROM `users` WHERE Organization_Name=?'
    var params = [Organization_Name]
    const organizationNameCheck = queryExecuter(sqlStatement, params)
    if (organizationNameCheck.length > 0) {//check is organizational name exists
      res.render("register", { authStatus: false, errorStatus: true, successStatus: false, errorMsg: "Name Already Exist", successMsg: null })
    } else {
      var sqlStatement = 'SELECT `Organization_PhoneNumber` FROM `users` WHERE Organization_PhoneNumber=?'
      var params = [Organization_PhoneNumber]
      const organizationPhoneNumberCheck = queryExecuter(sqlStatement, params)
      if (organizationPhoneNumberCheck.length > 0) {//checks if the phonenumber exists
        res.render("register", { authStatus: false, errorStatus: true, successStatus: false, errorMsg: "Phonenumber  Already Exist", successMsg: null })
      } else {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(Organization_Password, salt)
        var sqlStatement = 'INSERT INTO users (`Organization_Email`,`Organization_Name`,`Organization_PhoneNumber`,`Password`,`Account_Type`) VALUES(?,?,?,?,?);'
        var params = [Organization_Email, Organization_Name, Organization_PhoneNumber, hashedPassword, Account_Type]
        await queryExecuter(sqlStatement, params)
        res.render("login", { authStatus: false, errorStatus: false, successStatus: true, errorMsg: null, successMsg: "Account Created Successfuly PLease Log in " })

      }
    }
  }
}
const logout = (req,res)=>{
  res.cookie("jwtToken", "", {
    httpOnly: true,
    secure: false,
    maxAge: -3600000,
    sameSite: 'strict'
  })
  res.redirect("/")
}
module.exports = {
  home: home,
  getLogin: getLogin,
  getRegister: getRegister,
  register: register,
  login: login,
  logout
}