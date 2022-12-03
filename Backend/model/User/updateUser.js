const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function updateUser(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update route "+request)
        console.log("update id is "+request._id);
        var updatedatas={
            firstName:request.firstName,
            lastName: request.lastName,
            username: request.username,
            phone: request.phone,
            company: request.company,
            email: request.email,
            role: request.role,
            access: request.access
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
updateUser().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    console.log("inside update account "+id)
    console.log("inventory management "+ObjectId(id))
    const result = await client.db("CRM").collection("User").updateOne({"_id":ObjectId(id)},{$set:updatedatas});
    console.log("after set "+JSON.stringify(updatedatas));
    console.log("rsults inside update "+JSON.stringify(result))
    console.log(`${result.matchedCount} document(s) matched query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were Updated`);
}


module.exports={updateUser}
