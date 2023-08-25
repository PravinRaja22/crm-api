// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({ logger: false })
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function upsertContact(request) {
//     let results
//     const inventoyCollection = await fastify.mongo.client.db('process.env.DB').collection('Inventory Management')
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
//         console.log("request.Account in Inventory object fastify");
//         results = await inventoyCollection.updateOne({ _id: ObjectId(id) },{ $set: updatedatas }, { upsert: true });
//     }
//     else {
//         console.log("Account not availabe in inventory object fastify");
//         results = await inventoyCollection.updateOne({ _id: ObjectId(id) },{ $set:updatedataswithoutaccount }, { upsert: true });
//     }
//     console.log("Results inside inventory upsert object  "+JSON.stringify(results));
//     if (results.upsertedCount > 0) {
//         return `Record inserted with the id ${results.upsertedId}`
//     }
//     else if(results.modifiedCount > 0){
//         return `Inventory Updated Succesfully`
//     }
//     else {
//         return 'No Data Inserted or Updated'
//     }
// }
// module.exports = { upsertContact }
const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function upsertInventory(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};
    
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                    console.log('inside upsert Inventory Management function ' + result);
                }
        }
        toObject(objdata, objvalues)

        // var updatedatas = {
        //     projectName: request.projectName,
        //     propertyName: request.propertyName,
        //     propertyUnitNumber: request.propertyUnitNumber,
        //     type: request.type,
        //     tower: request.tower,
        //     country: request.country,
        //     city: request.city,
        //     propertyCities:request.propertyCities,
        //     floor: request.floor,
        //     status: request.status,
        //     totalArea: request.totalArea,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // let data =  await updatesiglerecord(client, request._id, updatedatas)
        // return data

        let data =  await updatesiglerecord(client, request._id, result)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
//upsertProperty().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    console.log("inventory id is "+id)
    console.log(ObjectId(id))
    const result = await client.db(process.env.DB).collection("Inventory").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, {upsert: true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Inventory Updated Succesfully`
    }
}


module.exports = { upsertInventory }
