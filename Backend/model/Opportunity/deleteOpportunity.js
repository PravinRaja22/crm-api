const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteOpportunity(dataid) {
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
deleteOpportunity().catch(console.error);
async function deleteDatas(client,deleteOpportunitydata)
{
    const results = await client.db("CRM").collection("Opportunity").deleteOne({ _id: ObjectId(deleteOpportunitydata) })
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteOpportunity}