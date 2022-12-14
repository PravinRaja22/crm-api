const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteContact(dataid) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        
    let data =     await deleteDatas(client,dataid)
    return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
deleteContact().catch(console.error);
async function deleteDatas(client,deletecontactdata)
{
const results = await client.db("CRM").collection("Contact").deleteOne({_id:ObjectId(deletecontactdata)})
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteContact}