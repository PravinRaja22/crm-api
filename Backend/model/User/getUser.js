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
module.exports = { 
    getUser
 }