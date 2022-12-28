const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertOpportunity(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("opportunity daate outside if "+request.closeDate);
    console.log('close date is : '+request.closeDate);
if(request.closeDate){
    console.log("inside if of epoch time");
    console.log("inside upsert opportunity ",request);
    let oppclosedate = request.closeDate;
    let formatdateopp = new Date(oppclosedate);
    var getepochtime = formatdateopp.getTime();
    console.log("opportunity epoch time "+getepochtime);

}
else{
console.log("inside else of epoch time");
    var getepochtime = request.closeDate
}

    try {
        await client.connect();

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = {};
    
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                    console.log('inside upsert Opportunity function ' + result);
                }
        }
        toObject(objdata, objvalues)

        // var updatedataswithpropandlead={
        //     InventoryId:request.Inventory,
        //     LeadId:request.Lead,
        //     opportunityName:request.opportunityName,
        //     type:request.type,
        //     leadSource:request.leadSource,
        //     amount:request.amount,
        //     closeDate:getepochtime,
        //     stage:request.stage,
        //     description:request.description,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithprop={
        //     InventoryId:request.Inventory,
        //     opportunityName:request.opportunityName,
        //     type:request.type,
        //     leadSource:request.leadSource,
        //     amount:request.amount,
        //     closeDate:getepochtime,
        //     stage:request.stage,
        //     description:request.description,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithlead={
        //     LeadId:request.Lead,
        //     opportunityName:request.opportunityName,
        //     type:request.type,
        //     leadSource:request.leadSource,
        //     amount:request.amount,
        //     closeDate:getepochtime, 
        //     stage:request.stage,
        //     description:request.description,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // var updatedataswithoutpropandlead={
        //     opportunityName:request.opportunityName,
        //     type:request.type,
        //     leadSource:request.leadSource,
        //     amount:request.amount,
        //     closeDate:getepochtime,
        //     stage:request.stage,
        //     description:request.description,
        //     createdbyId: request.createdbyId,
        //     createdDate: request.createdDate,
        //     modifiedDate:request.modifiedDate
        // }
        // if(request.Inventory && request.Lead){
        //     let data = await updatesiglerecord(client,request._id,updatedataswithpropandlead)
        //     return data
        // }
        // else if(request.Inventory && !request.Lead){
        //     let data = await updatesiglerecord(client,request._id,updatedataswithprop)
        //     return data

        // }
        // else if(request.Lead && !request.Inventory){
        //     let data = await updatesiglerecord(client,request._id,updatedataswithlead)
        //     return data

        // }
        // else {
        //     let data = await updatesiglerecord(client,request._id,updatedataswithoutpropandlead)
        //     return data
        // }

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
