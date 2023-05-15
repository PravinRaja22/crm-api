const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deletePermissions(dataid) {

    //filter the data based on the bedrooms bathroom and beds
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
//deleteAccount().catch(console.error);
async function deleteDatas(client, deleteaccountdata) {
    const results = await client.db(process.env.DB).collection("Permissions").deleteOne({ _id: ObjectId(deleteaccountdata) })
    if (results) {
        return results
    }
    else {
        return "no data found";
    }
}
module.exports = { deletePermissions }