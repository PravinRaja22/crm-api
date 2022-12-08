const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside upsert contact  "+request)
        var updatedatas={
            AccountId:request.Account,
            Salutation:request.salutation,
            FirstName:request.firstName,
            LastName:request.lastName,
            Date:request.date,
            Phone:request.phone,
            Department:request.department,
            LeadSource:request.leadSource,
            Email:request.email,
            MailingAddress:request.mailingAddress,
            Description:request.description,
            CreatedbyId: request.createdbyId,
            CreatedDate: request.createdDate,
        }
        let data = await updatesiglerecord(client,request._id,updatedatas)
        return data;
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
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `Record inserted with the id ${result.upsertedId}`
    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Contact Updated Succesfully`
    }
}


module.exports={upsertContact}
