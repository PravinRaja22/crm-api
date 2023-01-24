const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertTask(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);




// if(request.startDate &&request.EndDate ){
//     let startdatestring = request.startDate;
//     console.log("upsert contact date field "+startdatestring);
//     let startdateformatfield=new Date(startdatestring);
//     console.log("date formated field "+startdateformatfield);
//     var startdate = startdateformatfield.getTime();

//     let enddatestring = request.EndDate;
//     console.log("upsert contact date field "+enddatestring);
//     let enddateformatfield=new Date(enddatestring);
//     console.log("date formated field "+enddateformatfield);
//     var enddate = enddateformatfield.getTime();
// }
//    else if(request.startDate && ! request.EndDate){
//     let startdatestring = request.startDate;
//     console.log("upsert contact date field "+startdatestring);
//     let startdateformatfield=new Date(startdatestring);
//     console.log("date formated field "+startdateformatfield);
//     var startdate = startdateformatfield.getTime();

//     }
//     else if(request.EndDate && !request.startDate){
//         let enddatestring = request.EndDate;
//     console.log("upsert contact date field "+enddatestring);
//     let enddateformatfield=new Date(enddatestring);
//     console.log("date formated field "+enddateformatfield);
//     var enddate = enddateformatfield.getTime();
//     }
//     else{
//         var startdate = request.startDate;
//         var enddate = request.EndDate
//     }
//     console.log("attachemnent inside task ",request.attachments);
    try {
        await client.connect();

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};
    
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id' ) {
                result[names[i]] = values[i];
                console.log('inside upsert Task function ' + result);
        }
    }
        toObject(objdata, objvalues)
        // var updatedatas = {
        //     subject: request.subject,
        //     nameofContact: request.nameofContact,
        //     realatedTo: request.realatedTo,
        //     attachments:request.attachments,
        //     assignedTo: request.assignedTo,
        //     startDate: startdate,
        //     startTime: request.startTime,
        //     EndDate: enddate,
        //     EndTime: request.EndTime,
        //     description: request.description,
        //     attachments: request.attachments,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithaccount = {
        //     AccountId: request.AccountId,
        //     subject: request.subject,
        //     nameofContact: request.nameofContact,
        //     object:request.object,
        //     attachments:request.attachments,
        //     realatedTo: request.realatedTo,
        //     assignedTo: request.assignedTo,
        //     startDate: startdate,
        //     startTime: request.startTime,
        //     EndDate: enddate,
        //     EndTime: request.EndTime,
        //     description: request.description,
        //     attachments: request.attachments,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithLead = {
        //     LeadId: request.LeadId,
        //     subject: request.subject,
        //     nameofContact: request.nameofContact,
        //     object:request.object,
        //     attachments:request.attachments,
        //     realatedTo: request.realatedTo,
        //     assignedTo: request.assignedTo,
        //     startDate: startdate,
        //     startTime: request.startTime,
        //     EndDate: request.EndDate,
        //     EndTime: enddate,
        //     description: request.description,
        //     attachments: request.attachments,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithopportunity = {
        //     OpportunityId: request.OpportunityId,
        //     attachments:request.attachments,
        //     subject: request.subject,
        //     nameofContact: request.nameofContact,
        //     realatedTo: request.realatedTo,
        //     assignedTo: request.assignedTo,
        //     startDate: startdate,
        //     startTime: request.startTime,
        //     EndDate:enddate,
        //     EndTime: request.EndTime,
        //     description: request.description,
        //     attachments: request.attachments,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // if (request.AccountId) {
        //     let data = await updatesiglerecord(client, request._id, updatedataswithaccount)
        //     return data
        // }
        // else if (request.LeadId) {
        //     let data = await updatesiglerecord(client, request._id, updatedataswithLead)
        //     return data
        // }
        // else if (request.OpportunityId) {
        //     let data = await updatesiglerecord(client, request._id, updatedataswithopportunity)
        //     return data
        // }
        // else {
        //     let data = await updatesiglerecord(client, request._id, updatedatas)
        //     return data
        // }
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
