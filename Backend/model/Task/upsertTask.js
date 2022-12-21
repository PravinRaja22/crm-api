const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertTask(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        var updatedatas = {
            subject: request.subject,
            nameofContact: request.nameofContact,
            realatedTo: request.realatedTo,
            attachments:request.attachments,
            assignedTo: request.assignedTo,
            startDate: request.startDate,
            startTime: request.startTime,
            EndDate: request.EndDate,
            EndTime: request.EndTime,
            description: request.description,
            attachments: request.attachments,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }
        var updatedataswithaccount = {
            AccountId: request.AccountId,
            subject: request.subject,
            nameofContact: request.nameofContact,
            object:request.object,
            attachments:request.attachments,
            realatedTo: request.realatedTo,
            assignedTo: request.assignedTo,
            startDate: request.startDate,
            startTime: request.startTime,
            EndDate: request.EndDate,
            EndTime: request.EndTime,
            description: request.description,
            attachments: request.attachments,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }
        var updatedataswithLead = {
            LeadId: request.LeadId,
            subject: request.subject,
            nameofContact: request.nameofContact,
            object:request.object,
            attachments:request.attachments,
            realatedTo: request.realatedTo,
            assignedTo: request.assignedTo,
            startDate: request.startDate,
            startTime: request.startTime,
            EndDate: request.EndDate,
            EndTime: request.EndTime,
            description: request.description,
            attachments: request.attachments,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }
        var updatedataswithopportunity = {
            OpportunityId: request.OpportunityId,
            attachments:request.attachments,
            subject: request.subject,
            nameofContact: request.nameofContact,
            realatedTo: request.realatedTo,
            assignedTo: request.assignedTo,
            startDate: request.startDate,
            startTime: request.startTime,
            EndDate: request.EndDate,
            EndTime: request.EndTime,
            description: request.description,
            attachments: request.attachments,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
            modifiedDate:request.modifiedDate
        }
        if (request.AccountId) {
            let data = await updatesiglerecord(client, request._id, updatedataswithaccount)
            return data
        }
        else if (request.LeadId) {
            let data = await updatesiglerecord(client, request._id, updatedataswithLead)
            return data
        }
        else if (request.OpportunityId) {
            let data = await updatesiglerecord(client, request._id, updatedataswithopportunity)
            return data
        }
        else {
            let data = await updatesiglerecord(client, request._id, updatedatas)
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
upsertTask().catch(console.error);
async function updatesiglerecord(client, id, updatedatas) {
    //update single record
    const result = await client.db("CRM").collection("Task").updateOne({ "_id": ObjectId(id) }, { $set: updatedatas }, { upsert: true });
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Task  Updated Succesfully`
    }
}
module.exports = { upsertTask }
