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
let ObjectId = require('mongodb').ObjectId;
async function deleteInventory(dataid) {
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

    try {
        const objectIdArray = deletepropertydata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Inventory").deleteMany({ _id:{$in:objectIdArray }});
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Inventory`);
            return result.deletedCount;
        }
        else {
            return null;
        }

    }
    catch (e) {
        console.log('Catch Block Delete Account');
        return e.message;

    }
    // const results = await client.db(process.env.DB).collection("Inventory").deleteOne({ _id: ObjectId(deletepropertydata) })
    // if (results) {
    //     return JSON.stringify(results)
    // }
    // else {
    //     console.log("no data found");
    // }
}
module.exports = { deleteInventory }