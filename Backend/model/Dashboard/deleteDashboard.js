const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteDashboard(dataid) {
    const url =process.env.MONGODBURL;
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
async function deleteDatas(client, deletedashboarddata) {
    const results = await client.db(process.env.DB).collection("Account").deleteOne({ _id: ObjectId(deletedashboarddata) })
    if (results) {
        return results
    }
    else {
        return "no data found";
    }
}
module.exports = { deleteDashboard }