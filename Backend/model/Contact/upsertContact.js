const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        var updatedatas={
            AccountId:request.Account,
            salutation:request.salutation,
            firstName:request.firstName,
            lastName:request.lastName,
            date:request.date,
            phone:request.phone,
            department:request.department,
            leadSource:request.leadSource,
            email:request.email,
            mailingAddress:request.mailingAddress,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }

        var updatedataswithoutaccount={
            salutation:request.salutation,
            firstName:request.firstName,
            lastName:request.lastName,
            date:request.date,
            phone:request.phone,
            department:request.department,
            leadSource:request.leadSource,
            email:request.email,
            mailingAddress:request.mailingAddress,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        if(request.Account)
        {
            let data = await updatesiglerecord(client,request._id,updatedatas)
            return data;

        }
        else{
            let data = await updatesiglerecord(client,request._id,updatedataswithoutaccount)
            return data;
        }
      
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
upsertContact().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    const result = await client.db("CRM").collection("Contact").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        return `Contact Updated Succesfully`
    }
}


module.exports={upsertContact}
