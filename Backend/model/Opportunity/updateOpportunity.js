const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function updateOpportunity(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update route "+request)
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
updateOpportunity().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    console.log("inside update account "+id)
    console.log("inventory management "+ObjectId(id))
    const result = await client.db("CRM").collection("Opportunity").updateOne({"_id":ObjectId(id)},{$set:updatedatas});
    console.log("after set "+JSON.stringify(updatedatas));
    console.log("rsults inside update "+JSON.stringify(result))
    console.log(`${result.matchedCount} document(s) matched query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were Updated`);
}


module.exports={updateOpportunity}
