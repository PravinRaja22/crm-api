// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function getAccountdata(){
//     console.log("inside get Account  of mongo db");
//     let queryobj = ([
//                 {
//                     $lookup:
//                     {
//                         from: 'Inventory Management',
//                         let: { "searchId": { $toObjectId: "$PropertyId" } },
//                         pipeline: [
//                             { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
//                         ],
//                         as: 'Propertydetails'
//                     }
//                 },
//             ])
//     const accountCollection = await fastify.mongo.client.db('CRM').collection('Account')
//     let result =await  accountCollection.aggregate(queryobj).toArray();
//     return result;
// }
// module.exports = {getAccountdata}

const { MongoClient } = require('mongodb');
async function getAccountdata() {
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
getAccountdata().catch(console.error);
async function getDatas(client) {

    let queryobj = ([
        {
            $lookup:
            {
                from: 'Inventory Management',
                let: { "searchId": { $toObjectId:"$InventoryId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id","$$searchId"] } } },
                ],
                as: 'Propertydetails'
            }
        },
    ])
    const cursor = await client.db("CRM").collection("Account").aggregate(queryobj)
    const results = await cursor.toArray();
    if (results.length > 0) {
         //console.log(results);
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getAccountdata
 }
