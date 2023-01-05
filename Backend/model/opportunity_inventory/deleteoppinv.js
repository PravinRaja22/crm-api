const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteOpportunityInventory(dataid) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("inside oppinventory delete model");
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
deleteOpportunityInventory().catch(console.error);
async function deleteDatas(client,deleteOpportunitydata)
{
    const results = await client.db("CRM").collection("Opportunity Inventory").deleteOne({ _id: ObjectId(deleteOpportunitydata) })
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteOpportunityInventory}