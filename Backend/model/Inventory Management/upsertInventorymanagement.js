const { stubTrue } = require('lodash');
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertProperty(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside upsert  inventory " + request)
        console.log("update id is " + request._id);
        var updatedatas = {
            projectName: request.projectName,
            propertyName: request.propertyName,
            propertyUnitNumber: request.propertyUnitNumber,
            type: request.type,
            tower: request.tower,
            country: request.country,
            city: request.city,
            floor: request.floor,
            status: request.status,
            totalArea: request.totalArea,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        console.log("update inventory  datas " + JSON.stringify(updatedatas))
        await updatesiglerecord(client, request._id, updatedatas)
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
upsertProperty().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    //update single record
    console.log("inside update inventory  " + id)
    console.log("inventory management " + ObjectId(id))
    const result = await client.db("CRM").collection("Inventory Management").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        console.log(`one document was inserted with the id ${result.upsertedId}`);
       return `one document was inserted with the id ${result.upsertedId}`
    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Inventory Management  Updated Succesfully`
    }
}


module.exports = { upsertProperty }
