const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertOpportunity(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update opportunity route "+request)
        console.log("update id is "+request._id);
        var updatedatas={
            accountName:request.accountName,
            opportunityName:request.opportunityName,
            type:request.type,
            leadSource:request.leadSource,
            amount:request.amount,
            closeDate:request.closeDate,
            stage:request.stage,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        console.log("update object datas "+JSON.stringify(updatedatas))
        await updatesiglerecord(client,request._id,updatedatas)
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
upsertOpportunity().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    console.log("inside update opportunity "+id)
    console.log("opportunity  "+ObjectId(id))
    const result = await client.db("CRM").collection("Opportunity").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `one document was inserted with the id ${result.upsertedId}`

    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Opportunity  Updated Succesfully`
    }
}

module.exports={upsertOpportunity}
