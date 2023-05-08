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
        console.log(request)

        const hashPassword = await hashGenerate(request.password)
        console.log(hashPassword);
        request.password = hashPassword
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
        console.log(request)
        console.log(request._id,"id")
        let data = await upsertSingleRecord(client, request._id, result)
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
async function upsertSingleRecord(client, id, upsertdatas) {
    //update single record
    console.log("upsert single user "+id)
    console.log("upsert data is "+upsertdatas)
    const result = await client.db(process.env.DB).collection("User").updateOne({ _id: ObjectId(id) }, { $set: upsertdatas }, { upsert: true });
    console.log(JSON.stringify(result));
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `User Updated Succesfully`
    }
}


module.exports = { upsertUser }
