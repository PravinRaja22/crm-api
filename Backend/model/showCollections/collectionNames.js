const { MongoClient } = require('mongodb');
async function getCollections() {
    console.log("inside get collections")
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
async function getDatas(client) {
    const cursor = await client.db(process.env.DB).listCollections()
    const results = await cursor.toArray();
    console.log("result inside function ")
    console.log(results)
    if (results.length > 0) {
         //console.log(results);
         console.log(results)
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getCollections
 }