// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => error ? console.log(error):"plugin loaded successfully");
// fastify.ready(error => error ? console.log(error):"All plugin loaded successfully");
// async function getUser(){
//     console.log("inside get User of mongo db");
//     const userCollection = await fastify.mongo.client.db('CRM').collection('User')
//     let results =await  userCollection.find().toArray();
//     if (results.length > 0) {
//                 // console.log(results);
//                 return results
//             }
//             else {
//                 return "No data found";
//             }
// }
// module.exports = {getUser}

const { MongoClient } = require('mongodb');
const { hashValidator } = require("../../helpers/hashing")
const{tokenGenerator} = require('../../helpers/jwttoken')
async function getUser() {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getUser().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db("CRM").collection("User").find({})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}


async function getSingleUser(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside get user ")
        console.log(request.body)
         let data = await getDataslist(client,request)
         return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getUser().catch(console.error);
async function getDataslist(client,request) {
    console.log("inside get Datas")
    const existingUser = await client.db("CRM").collection("User").findOne({ userName: request.body.userName })
    console.log(existingUser)
    if(!existingUser){
        console.log("inside not the existing user")
        return {status:"failure",
                 content:"Password or UserName is Wrong.Please Enter correct Details"}
    }
    else{
        let checkkpassword =await hashValidator(request.body.password,existingUser.password)
        console.log(checkkpassword)
        if(!checkkpassword){
            return {status:"failure",
                     content:"Password or UserName is Wrong.Please Enter correct Details"}
        }
        else{
            console.log("inside password is correct")
            const token= await tokenGenerator(existingUser.userName)
            console.log("jwt token",token)
            // res.cookie("jwt",token)
            // res.send(token)
            return {status:"success",
                    content:token}
        }

    }
 
}


async function getSignUpPageUser(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside get user ")
        console.log(request.body)
         let data = await getSignUpPageUserlist(client,request)
         return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getUser().catch(console.error);
async function getSignUpPageUserlist(client,request) {
    console.log("inside get Datas")
    const existingUser = await client.db("CRM").collection("User").findOne({ userName: request.body.userName })
    console.log(existingUser)
    if(!existingUser){
        console.log("inside not the existing user")
        return {status:"failure",
                 content:"No user available with the given userName"}
    }
    else{
        return {status :"success",content:existingUser}

    }
 
}



module.exports = { 
    getUser,getSingleUser,getSignUpPageUser
 }