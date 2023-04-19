const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteFile(dataid) {

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
async function deleteDatas(client, deleteFiledata) {
    console.log("inside delete files")
    console.log("id is "+deleteFiledata)
    const results = await client.db("CRM").collection("Files").deleteOne({ _id: ObjectId(deleteFiledata) })
    if (results) {
        return results
    }
    else {
        return "no data found";
    }
}
module.exports = { deleteFile }