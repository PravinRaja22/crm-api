const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("inside Contact Upsert " + JSON.stringify(request));
    let objdata = Object.keys(request);
    let objvalues = Object.values(request);
    let result = {};

    function toObject(names, values) {
        for (let i = 0; i < names.length; i++)
            if (names[i] != '_id') {
                result[names[i]] = values[i];
            }
    }
    toObject(objdata, objvalues)
    try {
        await client.connect();
        console.log("REQUEST ID " + request._id);
        let data = await updatesiglerecord(client, request._id, result);
        return data;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
async function updatesiglerecord(client, id, updatedatas) {
    const result = await client.db(process.env.DB).collection("Contact").updateOne({ '_id': ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Contact Updated Succesfully`
    }
}
module.exports = { upsertContact }
