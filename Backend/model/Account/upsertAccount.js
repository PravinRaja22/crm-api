// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({ logger: false })
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function upsertAccount(request) {
//     let results
//     const accountCollection = await fastify.mongo.client.db('CRM').collection('Account')
//     let upsertdatas = {
//         PropertyId: request.Inventory,
//         accountName: request.accountName,
//         accountNumber: request.accountNumber,
//         annualRevenue: request.annualRevenue,
//         rating: request.rating,
//         type: request.type,
//         phone: request.phone,
//         industry: request.industry,
//         billingAddress: request.billingAddress,
//         billingCountry: request.billingCountry,
//         billingCity: request.billingCity,
//         billingCities: request.billingCities,
//         shippingAddress: request.shippingAddress,
//         description: request.description,
//         createdbyId: request.createdbyId,
//         createdDate: request.createdDate,
//     }
//     let upsertdataswithoutinventory = {
//         accountName: request.accountName,
//         accountNumber: request.accountNumber,
//         annualRevenue: request.annualRevenue,
//         rating: request.rating,
//         type: request.type,
//         phone: request.phone,
//         industry: request.industry,
//         billingAddress: request.billingAddress,
//         billingCountry: request.billingCountry,
//         billingCity: request.billingCity,
//         shippingAddress: request.shippingAddress,
//         description: request.description,
//         createdbyId: request.createdbyId,
//         createdDate: request.createdDate,
//     }
//     let id=request._id;
//     if (request.Inventory) {
//         console.log("request.Inventory in account object");
//         results = await accountCollection.updateOne({ _id: ObjectId(id) },{ $set: upsertdatas }, { upsert: true });
//     }
//     else {
//         console.log("inventory not availabe in account object");
//         results = await accountCollection.updateOne({ _id: ObjectId(id) }, { $set:upsertdataswithoutinventory }, { upsert: true });
//     }
//     console.log("Results inside account upsert object  "+JSON.stringify(results));
//     if (results.upsertedCount > 0) {
//         return `Record inserted with the id ${results.upsertedId}`
//     }
//     else if(results.modifiedCount > 0){
//         return `Account Updated Succesfully`
//     }
//     else {
//         return 'No Data Inserted or Updated'
//     }
// }
// module.exports = { upsertAccount }






const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertAccount(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        var upsertdatas = {
            PropertyId: request.Inventory,
            accountName: request.accountName,
            accountNumber: request.accountNumber,
            annualRevenue: request.annualRevenue,
            rating: request.rating,
            type: request.type,
            phone: request.phone,
            industry: request.industry,
            billingAddress: request.billingAddress,
            billingCountry: request.billingCountry,
            billingCity: request.billingCity,
            billingCities: request.billingCities,
            shippingAddress: request.shippingAddress,
            description: request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        var upsertdataswithoutinventory = {
            accountName: request.accountName,
            accountNumber: request.accountNumber,
            annualRevenue: request.annualRevenue,
            rating: request.rating,
            type: request.type,
            phone: request.phone,
            industry: request.industry,
            billingAddress: request.billingAddress,
            billingCountry: request.billingCountry,
            billingCity: request.billingCity,
            shippingAddress: request.shippingAddress,
            description: request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        if (request.Inventory) {
            let data = await upsertSingleRecord(client, request._id, upsertdatas)
            return data
        }
        else {
            let data = await upsertSingleRecord(client, request._id, upsertdataswithoutinventory)
            return data
        }

    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
upsertAccount().catch(console.error);
async function upsertSingleRecord(client, id, upsertdatas) {
    //update single record
    const result = await client.db("CRM").collection("Account").updateOne({ _id: ObjectId(id) }, { $set: upsertdatas }, { upsert: true });
    console.log(JSON.stringify(result));
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Account Updated Succesfully`
    }
}


module.exports = { upsertAccount }
