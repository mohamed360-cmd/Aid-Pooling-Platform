const mysql = require("mysql2")
const connection = mysql.createConnection({
host : 'localhost',
user : "root",
database : "myaid",
password : "12345"
})
connection.connect((err)=>{
    if(err){
        console.log("Error In Connecting to the Database")
    }else{
        console.log("Successfuly  Connected to the Database")

    }
})
module.exports = connection