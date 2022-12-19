const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertLead(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("full Name "+request.fullName);
        var updatedatas={
            salutation: request.salutation,
            firstName: request.firstName,
            lastName: request.lastName,
            fullName:request.fullName,
            phone: request.phone,
            leadSource: request.leadSource,
            industry: request.industry,
            leadStatus: request.leadStatus,
            email: request.email,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate,
        }
    let data =  await updatesiglerecord(client,request._id,updatedatas)
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
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    const result = await client.db("CRM").collection("Lead").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Lead  Updated Succesfully`
    }
}
module.exports={upsertLead}
