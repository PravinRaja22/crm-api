const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteProperty(dataid) {
    console.log('data id :' + dataid);

    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("inside delete property");
        await client.connect();

        let data = await deleteDatas(client, dataid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
deleteProperty().catch(console.error);
async function deleteDatas(client, deletepropertydata) {
    console.log("inside data deleteing " + deletepropertydata)
    const results = await client.db("CRM").collection("Inventory Management").deleteOne({ _id: ObjectId(deletepropertydata) })
    console.log("results " + JSON.stringify(results))
    if (results) {
        console.log(results);
        console.log(`${result.deletedCount} documents deleted in the Database`);
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { deleteProperty }