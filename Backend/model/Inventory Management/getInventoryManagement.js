// const fastify = require('fastify')({ logger: false })
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => error ? console.log(error) : "plugin loaded successfully");
// fastify.ready(error => error ? console.log(error) : "All plugin loaded successfully");
// async function getProperty() {
//     console.log("inside get inventory of mongo db");
//     const inventoryCollection = await fastify.mongo.client.db('process.env.DB').collection('Inventory Management')
//     let results = await inventoryCollection.find().toArray();
//     if (results.length > 0) {
//         console.log(results);
//         return JSON.stringify(results)
//     }
//     else {
//         return "No data found";
//     }
// }
// module.exports = { getProperty }


const { MongoClient } = require('mongodb');
async function getProperty() {
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
//getProperty().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db(process.env.DB).collection("Inventory Management").find()
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
    getProperty
}

