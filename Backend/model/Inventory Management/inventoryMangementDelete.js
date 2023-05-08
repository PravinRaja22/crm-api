// const { ObjectId } = require('@fastify/mongodb')
// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function deleteProperty(deleteInventorydata){
//     console.log("inside Delete Inventory  of mongo db");
//     console.log("Inventory id is : ",deleteInventorydata);
//     const inventoyCollection = await fastify.mongo.client.db('process.env.DB').collection('Inventory Management')
//     let results =await  inventoyCollection.deleteOne({ _id: ObjectId(deleteInventorydata) });
//     if (results) {
//                 console.log('inside if of delete Inventory');
//                 return results
//             }
//             else {
//                 console.log("inside else of delete Inventory");
//                 return "no data found";
//             }
// }
// module.exports = {deleteProperty}

const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteProperty(dataid) {
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
//deleteProperty().catch(console.error);
async function deleteDatas(client, deletepropertydata) {
    const results = await client.db(process.env.DB).collection("Inventory Management").deleteOne({ _id: ObjectId(deletepropertydata) })
    if (results) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { deleteProperty }