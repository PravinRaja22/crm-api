const { MongoClient } = require('mongodb');
async function getAccountInventory(inventoryId) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("Inventory Id for Account  "+inventoryId);
        await client.connect();
        let data = await getAccountDatas(client,inventoryId)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getAccountInventory().catch(console.error);
async function getAccountDatas(client,inventoryId) {
    console.log("inside functionality inventory id "+inventoryId);
    const cursor = await client.db("CRM").collection("Account").find({Inventory :new RegExp('^' + inventoryId)})
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
    getAccountInventory
}

