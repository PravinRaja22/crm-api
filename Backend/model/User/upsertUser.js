const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertUser(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
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
       let result =  await updatesiglerecord(client,request._id,updatedatas)
       return result
    } 
    catch (e) {
        console.error(e);
    } 
    finally {
        await client.close();
    }
}
upsertUser().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    const result = await client.db("CRM").collection("User").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        return `Record inserted with the id ${result.upsertedId}`

    }
    else {
        return `User Updated Succesfully`

    }
}


module.exports={upsertUser}
