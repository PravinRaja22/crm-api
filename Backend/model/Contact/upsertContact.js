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



const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    let datestring = request.date;
    console.log("upsert contact date field "+datestring);
    let dateformatfield=new Date(datestring);
    console.log("date formated field "+dateformatfield);
    let contactdate = dateformatfield.getTime();

    try {
        await client.connect();
        var updatedatas={
            AccountId:request.Account,
            salutation:request.salutation,
            firstName:request.firstName,
            lastName:request.lastName,
            date:contactdate,
            phone:request.phone,
            department:request.department,
            leadSource:request.leadSource,
            email:request.email,
            mailingAddress:request.mailingAddress,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }

        var updatedataswithoutaccount={
            salutation:request.salutation,
            firstName:request.firstName,
            lastName:request.lastName,
            date:contactdate,
            phone:request.phone,
            department:request.department,
            leadSource:request.leadSource,
            email:request.email,
            mailingAddress:request.mailingAddress,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }
        if(request.Account)
        {
            let data = await updatesiglerecord(client,request._id,updatedatas)
            return data;

        }
        else{
            let data = await updatesiglerecord(client,request._id,updatedataswithoutaccount)
            return data;
        }
      
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
upsertContact().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    const result = await client.db("CRM").collection("Contact").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Contact Updated Succesfully`
    }
}


module.exports={upsertContact}
