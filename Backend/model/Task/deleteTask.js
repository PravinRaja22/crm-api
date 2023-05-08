const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteTask(dataid) {
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
//deleteTask().catch(console.error);
async function deleteDatas(client, deleteTaskdata) {
    const results = await client.db(process.env.DB).collection("Task").deleteOne({ _id: ObjectId(deleteTaskdata) })
    if (results) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { deleteTask }