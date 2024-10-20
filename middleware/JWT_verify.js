 const jwt = require("jsonwebtoken")
 const secretToken = "a6c769a1f1dc30ea6c8cf130fc17e2fc"

const verifyJWT_Token = async (request) => {
    try {
      if (!request.cookies || !request.cookies.jwtToken) {
        return { AuthStatus: false, data: null };
      }
  
      const jwttoken = request.cookies.jwtToken;
      const decodedData = await jwt.verify(jwttoken, secretToken);
  
      return { AuthStatus: true, data: decodedData };
    } catch (error) {
      console.log("Error in the verifyJWT_Token function", error);
      return { AuthStatus: false, data: null };
    }
  };
  module.exports = verifyJWT_Token