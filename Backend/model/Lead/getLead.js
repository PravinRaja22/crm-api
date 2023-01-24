// const fastify = require('fastify')({ logger: false })
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => error ? console.log(error) : "plugin loaded successfully");
// fastify.ready(error => error ? console.log(error) : "All plugin loaded successfully");
// async function getLead() {
//     console.log("inside get Lead of mongo db");
//     const leadCollection = await fastify.mongo.client.db('CRM').collection('Lead')
//     let results = await leadCollection.find().toArray();
//     if (results.length > 0) {
//         console.log(results);
//         return JSON.stringify(results)
//     }
//     else {
//         return "No data found";
//     }
// }
// module.exports = { getLead }
const { MongoClient } = require('mongodb');
async function getLead(){
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
    let data =     await getDatas(client)
    return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getLead().catch(console.error);
async function getDatas(client)
{
const cursor = await client.db("CRM").collection("Lead").find({})
const results = await cursor.toArray();
    if(results.length >0){
   
    return JSON.stringify(results)
}
else{
    console.log("no data found");
}
}
module.exports= {getLead}

