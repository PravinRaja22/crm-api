const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertOpportunityInventory(request) {
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
                    console.log('inside upsert Opportunity inventory junction ' + result);
                }
        }
        toObject(objdata, objvalues)
        let data = await updatesiglerecord(client,request._id,result)
        return data
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
//upsertOpportunityInventory().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    const result = await client.db("CRM").collection("Opportunity Inventory").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`

    }

    else {
        return `Opportunity  Updated Succesfully`
    }
}

module.exports={upsertOpportunityInventory}
