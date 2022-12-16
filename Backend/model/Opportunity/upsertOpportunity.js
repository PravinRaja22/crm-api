const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertOpportunity(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        var updatedataswithpropandlead={
            propertyId:request.Inventory,
            LeadId:request.Lead,
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
        var updatedataswithprop={
            propertyId:request.Inventory,
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
        var updatedataswithlead={
            
            LeadId:request.Lead,
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
        var updatedataswithoutpropandlead={
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
        if(request.Inventory && request.Lead){
            let data = await updatesiglerecord(client,request._id,updatedataswithpropandlead)
            return data
        }
        else if(request.Inventory && !request.Lead){
            let data = await updatesiglerecord(client,request._id,updatedataswithprop)
            return data

        }
        else if(request.Lead && !request.Inventory){
            let data = await updatesiglerecord(client,request._id,updatedataswithlead)
            return data

        }
        else {
            let data = await updatesiglerecord(client,request._id,updatedataswithoutpropandlead)
            return data
        }
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
    const result = await client.db("CRM").collection("Opportunity").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`

    }
    else {
        return `Opportunity  Updated Succesfully`
    }
}

module.exports={upsertOpportunity}
