const { tokenValidator } = require('./jwttoken')

let authVerify = async (request, reply, next) => {
   // console.log("cookie ", req.getHeader('set-cookie'));
   console.log("inside Auth Verification Page")
   console.log(request.headers)
   console.log(request.headers.Authorization)
   reply.setCookie("jwt",request.headers.Authorization)
   console.log(request.cookies)
    try {
        const {jwt} = await request.cookies;
        console.log("jet id ", jwt);
        const valid = await tokenValidator(jwt)
        console.log("Valid ", valid);
        if (valid) {
            console.log("inside valid")
            next()
        } else {
            console.log("accessDenied section")
            reply.send("Access Denied")
        }

    }
    catch (error) {
        reply.send("error")
    }

}
module.exports ={authVerify}