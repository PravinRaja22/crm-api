const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertProperty(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
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
        let data =  await updatesiglerecord(client, request._id, updatedatas)
        return data
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
    const result = await client.db("CRM").collection("Inventory Management").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Inventory Management  Updated Succesfully`
    }
}


module.exports = { upsertProperty }
