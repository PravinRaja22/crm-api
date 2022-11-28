const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function updateProperty(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside update route "+request)
        console.log("update id is "+request._id);
        var updatedatas={
            projectName:request.projectName,
            propertyName:request.propertyName,
            propertyUnitNumber:request.propertyUnitNumber,
            type:request.type,
            tower:request.tower,
            country:request.country,
            city: request.city,
            floor:request.floor,
            status:request.status,
            totalArea:request.totalArea,
            createdbyId:request.createdbyId,
            createdDate:request.createdDate,
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
updateProperty().catch(console.error);
async function updatesiglerecord(client,id,updatedatas){
    //update single record
    console.log("inside update account "+id)
    console.log("inventory management "+ObjectId(id))
    const result = await client.db("CRM").collection("Inventory Management").updateOne({"_id":ObjectId(id)},{$set:updatedatas});
    console.log("after set "+JSON.stringify(updatedatas));
    console.log("rsults inside update "+JSON.stringify(result))
    console.log(`${result.matchedCount} document(s) matched query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were Updated`);
}


module.exports={updateProperty}
