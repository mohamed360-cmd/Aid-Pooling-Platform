const home = (req,res)=>{
    res.render("home.ejs",{Name : "Mohamed",authStatus : false})
    }
const getLogin = (req,res)=>{
    res.render("login",{Name : "Mohamed",authStatus : false})
}
const getRegister = (req,res)=>{
    res.render("register",{authStatus : false})

}
const register = (req,res)=>{
    console.log(req.body)
}
module.exports = {
  home:  home,
    getLogin : getLogin,
    getRegister : getRegister,
    register: register
}