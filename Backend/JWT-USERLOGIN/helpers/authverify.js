const { tokenValidator } = require('./jwttoken')

module.exports = async (req, res, next) => {
    console.log("inside token validator funciton");
    console.log("cookie ", req.cookies);
    try {
        const {jwt} = await req.cookies;
        console.log("jet id ", jwt);
        const valid = await tokenValidator(jwt)
        console.log("Valid ", valid);
        if (valid) {
            next()
        } else {
            res.send("Access Denied")
        }

    }
    catch (error) {
        res.send("error")
    }

}