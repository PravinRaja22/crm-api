const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertContact(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update contact Route "+request)
        console.log("update id contact route  "+request._id);
      var updatedatas={
            accountName:request.accountName,
            salutation:request.salutation,
            firstName:request.firstName,
            lastName:request.lastName,
            dop:request.dop,
            phone:request.phone,
            department:request.department,
            leadSource:request.leadSource,
            email:request.email,
            mailingAddress:request.mailingAddress,
            description:request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        }
        console.log("update object datas "+JSON.stringify(updatedatas))
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
    //update single record
    console.log("inside upsert  contact "+id)
    console.log("inside upsert contact "+ObjectId(id))
    const result = await client.db("CRM").collection("Contact").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `one record inserted with the id ${result.upsertedId}`
    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Contact Updated Succesfully`
    }
}


module.exports={upsertContact}
