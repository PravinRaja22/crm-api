const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteUser(dataid) {

    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
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
deleteUser().catch(console.error);
async function deleteDatas(client, deleteaccountdata) {
    const results = await client.db("CRM").collection("User").deleteOne({ _id: ObjectId(deleteaccountdata) })
    if (results) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { deleteUser }