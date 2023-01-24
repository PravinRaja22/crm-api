const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertLead(request) {
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
                    console.log('inside upsert lead function ' + result);
                }
        }
        toObject(objdata, objvalues)

        //     var updatedatas={
        //         salutation: request.salutation,
        //         firstName: request.firstName,
        //         lastName: request.lastName,
        //         fullName:request.firstName+' '+request.lastName,
        //         phone: request.phone,
        //         leadSource: request.leadSource,
        //         industry: request.industry,
        //         leadStatus: request.leadStatus,
        //         email: request.email,
        //         createdbyId: request.createdbyId,
        //         createdDate: request.createdDate,
        //         modifiedDate:request.modifiedDate,
        //     }
        //     console.log("object of lead "+JSON.stringify(updatedatas));
        // let data =  await updatesiglerecord(client,request._id,updatedatas)
        // return data

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
upsertLead().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    //update single record
    const result = await client.db("CRM").collection("Lead").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Lead  Updated Succesfully`
    }


}
module.exports = { upsertLead }
