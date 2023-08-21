// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function deleteAccount(deleteaccountdata){
//     console.log("inside Delete Account  of mongo db");
//     console.log("deleted account id is : ",deleteaccountdata);
//     const accountCollection = await fastify.mongo.client.db('process.env.DB').collection('Account')
//     let results =await  accountCollection.deleteOne({ _id: ObjectId(deleteaccountdata) });
//     if (results) {
//                 console.log('inside if of delete Account');
//                 return results
//             }
//             else {
//                 console.log("inside else of delete Account");
//                 return "no data found";
//             }
// }
// module.exports = {deleteAccount}


const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteAccount(dataid) {

    //filter the data based on the bedrooms bathroom and beds
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await deleteDatas(client, dataid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//deleteAccount().catch(console.error);
async function deleteDatas(client, deleteaccountdata) {
    const results = await client.db(process.env.DB).collection("Account").deleteOne({ _id: ObjectId(deleteaccountdata) })
    if (results) {
        return results
    }
    else {
        return "no data found";
    }
}
module.exports = { deleteAccount }