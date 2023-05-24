const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deletedeal(dataid) {
    const url = process.env.MONGODBURL;
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
//deleteOpportunity().catch(console.error);
async function deleteDatas(client, deleteDealdata) {
    const results = await client.db(process.env.DB).collection("Deal").deleteOne({ _id: ObjectId(deleteDealdata) })
    if (results) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { deletedeal }