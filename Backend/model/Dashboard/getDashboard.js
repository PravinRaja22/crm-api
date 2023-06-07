const { MongoClient } = require('mongodb');
async function getDashboard() {
    console.log("inside get all dashbord data route ")
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
//getAccountdata().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db(process.env.DB).collection("Dashboard").find()
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
    getDashboard
 }
