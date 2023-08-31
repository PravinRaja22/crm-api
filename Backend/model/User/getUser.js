const { MongoClient } = require('mongodb');
const { hashValidator } = require("../../helpers/hashing")
const { tokenGenerator } = require('../../helpers/jwttoken')
async function getUser() {
    const url = process.env.MONGODBURL;
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

    const cursor = await client.db(process.env.DB).collection("User").find({})
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
    console.log('GET SINGLE USER');
    console.log("Before TRY 1 ")
    console.log(process.env.MONGODBURL)
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("Before TRY")
    try {
        console.log('try')
        await client.connect();
        console.log("inside get user ")
        console.log(request.body)
        let data = await getDataslist(client, request)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getUser().catch(console.error);
async function getDataslist(client, request) {
    console.log("inside get Datas")
    const existingUser = await client.db(process.env.DB).collection("User").findOne({ userName: request.body.userName })
    console.log(existingUser)
    if (!existingUser) {
        console.log("inside not the existing user")
        return "Password or UserName is Wrong.Please Enter correct Details"

    }
    else {
        let checkkpassword = await hashValidator(request.body.password, existingUser.password)
        console.log(checkkpassword)
        if (!checkkpassword) {
            return "Password or UserName is Wrong.Please Enter correct Details"

        }
        else {
            console.log("inside password is correct")
            const token = await tokenGenerator(existingUser.userName)
            console.log("jwt token after checking user is ", token)

            // res.cookie("jwt",token)
            // res.send(token)

            console.log("jwt token", token)
            return {
                status: "success",
                content: token,
                userDetails: existingUser
            }
        }

    }

}


async function getSignUpPageUser(request) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside get user ")
        console.log(request.body)
        let data = await getSignUpPageUserlist(client, request)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getUser().catch(console.error);
async function getSignUpPageUserlist(client, request) {
    console.log("inside get Datas")
    const existingUser = await client.db(process.env.DB).collection("User").findOne({ userName: request.body.userName })
    console.log(existingUser)
    if (!existingUser) {
        console.log("inside not the existing user")
        return {status:"failure",content:"No user available with the given userName"}
    }
    else {
        return { status: "success", content: existingUser }

    }

}

// async function getRolebasedUser(role){

//     const url =process.env.MONGODBURL;
//     const client = new MongoClient(url);
//     try {
//         await client.connect();
//         console.log("inside get user ")
//         console.log(role)
//          let data = await getRolebasedUserId(client,role)
//          return data;
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }


// }

// async function getRolebasedUserId(client,role) {
//     console.log("inside get Datas")
//     if(role == 'admin'){
//         const UserId = await client.db(process.env.DB).collection("User").find()

//     }
//     else if (){

//     }
//     const UserId = await client.db(process.env.DB).collection("User").find({ role:role})
//     const results = await UserId.toArray();
//     if(results.length>0){
//         console.log("result of Id")
//         return {status:"failure",
//                  content:"No user available with the given userName"}
//     }
//     else{
//         return {status :"success",content:existingUser}

//     }

// }



module.exports = {
    getUser, getSingleUser, getSignUpPageUser
}