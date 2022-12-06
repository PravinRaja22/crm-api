const { MongoClient } = require('mongodb');
async function getAccount() {
    console.log("inside get Account")
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
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
getAccount().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db("CRM").collection("Account").find({})
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
    getAccount
 }

