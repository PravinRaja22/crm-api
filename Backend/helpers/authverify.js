const { tokenValidator } = require('./jwttoken')

let authVerify = async (req, res, next) => {
    console.log("inside token validator funciton");
   // console.log("cookie ", req.getHeader('set-cookie'));
   console.log("inside Auth Verification Page")
   console.log(req.cookies)
    console.log(req.cookies.jwt)
    try {
        const {jwt} = await req.cookies;
        console.log("jet id ", jwt);
        const valid = await tokenValidator(jwt)
        console.log("Valid ", valid);
        if (valid) {
            
            console.log("inside valid")
            next()
        } else {
            console.log("accessDenied section")
            res.send("Access Denied")
        }

    }
    catch (error) {
        res.send("error")
    }

}
module.exports ={authVerify}