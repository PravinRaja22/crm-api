const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertLead(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside upsert Lead"+request)
        console.log("update id is "+request._id);
        var updatedatas={
            salutation: request.salutation,
            firstName: request.firstName,
            lastName: request.lastName,
            company: request.company,
            phone: request.phone,
            leadSource: request.leadSource,
            industry: request.industry,
            leadStatus: request.leadStatus,
            email: request.email,
            fax: request.fax,
            description: request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
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
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Lead  Updated Succesfully`
    }
}
module.exports={upsertLead}
