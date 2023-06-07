const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertEnquiry(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};

        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                    console.log( result);
                }
        }
        toObject(objdata, objvalues)
        let data = await updatesiglerecord(client, request._id, result)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
//upsertLead().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    //update single record
    const result = await client.db(process.env.DB).collection("Enquiry").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Enquiry  Updated Succesfully`
    }


}
module.exports = { upsertEnquiry }
