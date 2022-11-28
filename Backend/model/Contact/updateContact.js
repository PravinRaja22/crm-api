const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function updateContact(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update route "+request)
        console.log("update id is "+request._id);
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
        await updatesiglerecord(client,request._id,updatedatas)
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
updateContact().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    console.log("inside update account "+id)
    console.log("inventory management "+ObjectId(id))
    const result = await client.db("CRM").collection("Contact").updateOne({"_id":ObjectId(id)},{$set:updatedatas});
    console.log("after set "+JSON.stringify(updatedatas));
    console.log("rsults inside update "+JSON.stringify(result))
    console.log(`${result.matchedCount} document(s) matched query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were Updated`);
}


module.exports={updateContact}
