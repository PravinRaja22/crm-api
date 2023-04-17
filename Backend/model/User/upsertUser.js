const { MongoClient } = require('mongodb');
const { hashGenerate } = require("../../helpers/hashing")
const { hashValidator } = require("../../helpers/hashing")
const{tokenGenerator} = require('../../helpers/jwttoken')
var ObjectId = require('mongodb').ObjectId;
async function upsertUser(request) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("inside upsert user is ")
        console.log(request.body)

        const hashPassword = await hashGenerate(request.body.password)
        console.log(hashPassword);
        request.body.password = hashPassword
        await client.connect();

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                    console.log('inside upsert User function ');
                }
        }
        toObject(objdata, objvalues)
        console.log(result.body)
        let data = await updatesiglerecord(client, request._id, result.body)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
//upsertUser().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    //update single record
    console.log("inside upser user record")
    const result = await client.db("CRM").collection("User").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`

    }
    else {
        return `User Updated Succesfully`

    }
}


module.exports = { upsertUser }
