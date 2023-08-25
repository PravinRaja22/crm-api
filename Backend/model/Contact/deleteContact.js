// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function deleteContact(deletecontactdata){
//     console.log("inside Delete Contact  of mongo db");
//     console.log("deleted Contact id is : ",deletecontactdata);
//     const contactCollection = await fastify.mongo.client.db('process.env.DB').collection('Contact')
//     let results =await  contactCollection.deleteOne({ _id: ObjectId(deletecontactdata)});
//     if (results){
//                 console.log('Inside if of Delete contact fastify');
//                 return results
//             }
//             else{
//                 console.log("Inside else of Delete contact fastify");
//                 return "no data found";
//             }
// }
// module.exports = {deleteContact}

const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function deleteContact(dataid) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
    let data =     await deleteDatas(client,dataid)
    return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//deleteContact().catch(console.error);
async function deleteDatas(client,deletecontactdata)
{
const results = await client.db(process.env.DB).collection("Contact").deleteOne({_id:ObjectId(deletecontactdata)})
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteContact}