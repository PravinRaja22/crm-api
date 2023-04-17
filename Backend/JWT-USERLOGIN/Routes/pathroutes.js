const express = require('express')
const authRoutes = express.Router()
const user = require('../model/user')
const { hashGenerate } = require("../helpers/hashing")
const { hashValidator } = require("../helpers/hashing")
const{tokenGenerator} = require('../helpers/jwttoken')
const authVerify = require("../helpers/authverify")
//using async method 
authRoutes.post('/signup', async (req, res) => {
    try {
        const hashPassword = await hashGenerate(req.body.password)
        const users = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
            // password:req.body.password
            //we commenting above line and using hashed password
        })
        const savedUser = await users.save()
        res.send(savedUser)
    }
    catch (error) {
        console.log("error in sign up ", error);
        res.send("Emial Id is Already Registered")
    }
})
authRoutes.post("/signin", async (req, res) => {
    try {
        const existingUser = await user.findOne({ email: req.body.userName });
        if (!existingUser) {
            res.send("No User Found for this Email Id")
        }
        else {
            const checkPassword = await hashValidator(req.body.password, existingUser.password)
            if (!checkPassword) {
                res.send("password id Invalid")
            }else{
                const token= await tokenGenerator(existingUser.userName)
                console.log("jwt token",token)
                res.cookie("jwt",token)
                res.send(token)

            }
        }
    }
    catch (error) {
        console.log("inside catch ", error);
    }
})

authRoutes.post("/protected",authVerify,(req,res)=>{
    res.send("i am protected route")
})
//exporting this to make of this in other files
module.exports = authRoutes;
