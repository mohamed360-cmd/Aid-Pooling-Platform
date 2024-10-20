const db = require("../config/db")
const queryExecuter = (sqlStatement, sqlParams) => {//this functiuon is for executing sql statements
    return new Promise((resolve, regect) => {
      db.query(sqlStatement, sqlParams, (err, results) => {
        if (err) {
          console.log("This error happend in the queryExecuter function", err)
          resolve(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  module.exports = queryExecuter