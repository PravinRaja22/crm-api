const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function deleteOpportunityInventory(dataid) {
    const url = process.env.MONGODBURL;
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
//deleteOpportunityInventory().catch(console.error);
async function deleteDatas(client,deleteOpportunitydata)
{
    const results = await client.db(process.env.DB).collection("Opportunity Inventory").deleteOne({ _id: ObjectId(deleteOpportunitydata) })
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteOpportunityInventory}