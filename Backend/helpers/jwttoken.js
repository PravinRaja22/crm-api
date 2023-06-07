const jwt = require('jsonwebtoken')
const tokenGenerator = async (userName) => {
    //creating json token using jwt.sign()
    const token = await jwt.sign(
        { userName },
        "jwttokenkey",
    // { expiresIn: "2minutes" }//this is optional
    )
    console.log("token data " + token);
    return token;
}
//we are using token validator to know wheter the login id is vallid or not
//we are calling this in authverify file
const tokenValidator = async (token) => {
    console.log("token validator ", token);
    try {
        console.log("inside try ",token);
        //in this code validiating is failing in evry time while checking not completed this scenario
        const dataa = await jwt.verify(token,"jwttokenkey");
        console.log("dataa ", dataa);
        return dataa;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports.tokenGenerator = tokenGenerator
module.exports.tokenValidator = tokenValidator