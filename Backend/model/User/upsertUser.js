const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertUser(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside  upsert user "+request)
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
    console.log("inside update user "+id)
    console.log("User  "+ObjectId(id))
    const result = await client.db("CRM").collection("User").updateOne({"_id":ObjectId(id)},{$set:updatedatas},{upsert:true});
    if (result.upsertedCount > 0) {
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `Record inserted with the id ${result.upsertedId}`

    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `User Updated Succesfully`

    }
}


module.exports={upsertUser}
