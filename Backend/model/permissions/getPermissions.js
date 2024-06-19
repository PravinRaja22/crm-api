const { MongoClient } = require('mongodb');
async function getPermission() {
    console.log("inside get Permssions")
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
    const cursor = await client.db(process.env.DB).collection("Permissions").find()
    const results = await cursor.toArray();
    if (results.length > 0) {
        return JSON.stringify(results)
    }
    else {
      return "no data found";
    }
}
module.exports = { 
    getPermission
 }
