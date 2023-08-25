const { MongoClient } = require('mongodb');
async function getAccountInventory(inventoryId) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log('Get Account Inventory')
        console.log("Inventory Id for Account  " + inventoryId);
        await client.connect();
        let data = await getAccountDatas(client, inventoryId)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getAccountDatas(client, inventoryId) {
    console.log("inside functionality inventory id " + inventoryId);
    const cursor = await client.db(process.env.DB).collection("Account").find({ InventoryId: new RegExp('^' + inventoryId) })
    console.log("data base is " + process.env.DB)
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        return JSON.stringify(results)
    }
    else {
        return 'No Data Found'
    }
}
module.exports = {
    getAccountInventory
}

