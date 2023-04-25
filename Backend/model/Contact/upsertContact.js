// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({ logger: false })
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function upsertContact(request) {
//     let results
//     const contactCollection = await fastify.mongo.client.db('CRM').collection('Contact')
//     var updatedatas={
//                     AccountId:request.Account,
//                     salutation:request.salutation,
//                     firstName:request.firstName,
//                     lastName:request.lastName,
//                     date:request.date,
//                     phone:request.phone,
//                     department:request.department,
//                     leadSource:request.leadSource,
//                     email:request.email,
//                     mailingAddress:request.mailingAddress,
//                     description:request.description,
//                     createdbyId: request.createdbyId,
//                     createdDate: request.createdDate,
//                 }
//                 var updatedataswithoutaccount={
//                     salutation:request.salutation,
//                     firstName:request.firstName,
//                     lastName:request.lastName,
//                     date:request.date,
//                     phone:request.phone,
//                     department:request.department,
//                     leadSource:request.leadSource,
//                     email:request.email,
//                     mailingAddress:request.mailingAddress,
//                     description:request.description,
//                     createdbyId: request.createdbyId,
//                     createdDate: request.createdDate,
//                 }
//     let id=request._id;
//     if (request.Account) {
//         console.log("request.Account in contact object fastify");
//         results = await contactCollection.updateOne({ _id: ObjectId(id) },{ $set: updatedatas }, { upsert: true });
//     }
//     else {
//         console.log("Account not availabe in contact object fastify");
//         results = await contactCollection.updateOne({ _id: ObjectId(id) },{ $set:updatedataswithoutaccount }, { upsert: true });
//     }
//     console.log("Results inside contact upsert object  "+JSON.stringify(results));
//     if (results.upsertedCount > 0) {
//         return `Record inserted with the id ${results.upsertedId}`
//     }
//     else if(results.modifiedCount > 0){
//         return `Contact Updated Succesfully`
//     }
//     else {
//         return 'No Data Inserted or Updated'
//     }
// }
// module.exports = { upsertContact }



const { keys } = require('lodash');
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("inside funnctiolity "+JSON.stringify(request));

let objdata = Object.keys(request);
let objvalues = Object.values(request);
let result = {};

function toObject(names, values) {
    for (let i = 0; i < names.length; i++)
    if(names[i] != '_id'){
        result[names[i]] = values[i];
        console.log('inside UPSERT CONTACT function '+result); ;
   }
       
}
toObject(objdata,objvalues)


console.log("outside of the functionality "+JSON.stringify(result));
//converting date field in to epoch time 
    // if(request.date){
    //     let datestring = request.dob;
    //     console.log("upsert contact date field "+datestring);
    //     let dateformatfield=new Date(datestring);
    //     console.log("date formated field "+dateformatfield);
    //     var contactdate = dateformatfield.getTime();
    // }
    // else{
    //     var contactdate = request.date;
    // }
    try {
        await client.connect();
    //     var updatedatas={
    //         AccountId:request.Account,
    //         salutation:request.salutation,
    //         firstName:request.firstName,
    //         lastName:request.lastName,
    //         fullName:request.fullName,
    //         dob:contactdate,
    //         phone:request.phone,
    //         department:request.department,
    //         leadSource:request.leadSource,
    //         email:request.email,
    //         fullAddress:request.fullAddress,
    //         description:request.description,
    //         createdbyId: request.createdbyId,
    //         createdDate: request.createdDate,
    //         modifiedDate:request.modifiedDate
    //     }
    //     var updatedataswithoutaccount={
    //         salutation:request.salutation,
    //         firstName:request.firstName,
    //         lastName:request.lastName,
    //         fullName:request.fullName,
    //         dob:contactdate,
    //         phone:request.phone,
    //         department:request.department,
    //         leadSource:request.leadSource,
    //         email:request.email,
    //         fullAddress:request.fullAddress,
    //         description:request.description,
    //         createdbyId: request.createdbyId,
    //         createdDate: request.createdDate,
    //         modifiedDate:request.modifiedDate
    //     }
    //     console.log("JSON ",JSON.stringify(updatedatas));
    //     if(request.Account)
    //     {
    //         let data = await (client,request._id,updatedatas)
    //         return data;
    //     }
    //     else{
    //         let data = await updatesiglerecord(client,request._id,updatedataswithoutaccount)
    //         return data;
    //     }
console.log("REQUEST ID "+request._id);
        let data = await updatesiglerecord(client,request._id,result);
        return data;

    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
//upsertContact().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    console.log("id inside function "+id);
    console.log("functionality inside data "+JSON.stringify(updatedatas));
    const result = await client.db("CRM").collection("Contact").updateOne({'_id':ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Contact Updated Succesfully`
    }
}
module.exports={upsertContact}
