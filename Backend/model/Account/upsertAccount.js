const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function upsertAccount(request) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("UPSEERT ACCOUNT FUNCTION");
        await client.connect();
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++){
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                }
            }
        }
        toObject(objdata, objvalues);
        let data = await upsertSingleRecord(client, request._id, result)
        return data;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
async function upsertSingleRecord(client, id, upsertdatas) {
    const result = await client.db(process.env.DB).collection("Account").updateOne({ _id: ObjectId(id) }, { $set: upsertdatas }, { upsert: true });
    console.log(JSON.stringify(result));
    if (result.upsertedCount > 0) {
        return (`Record inserted with the id ${result.upsertedId}`)
    }
    else {
        return `Account Updated Succesfully`
    }
}


module.exports = { upsertAccount }
