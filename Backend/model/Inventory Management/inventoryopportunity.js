const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function getInventoryOpportunityjn(invid) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("Inventory Id for Opportunity  "+invid);
        await client.connect();
        let data = await getOpportunityDatas(client,invid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {

        await client.close();
    }
}
getInventoryOpportunityjn().catch(console.error);
async function getOpportunityDatas(client,invid) {
    var OpportunityId =[]
    console.log("inside functionality inventory id "+invid);
    const cursor = await client.db("CRM").collection("Opportunity Inventory").find({InventoryId :new RegExp('^' + invid)})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        console.log("inside result of opp inventory");
        console.log('Opp Id '+JSON.stringify(results));
        results.forEach(function(variable){
            console.log(variable.OpportunityId);
            OpportunityId.push(new ObjectId(variable.OpportunityId));
            console.log("Opportunity Id ",OpportunityId);
        });
        console.log("outside block "+JSON.stringify(OpportunityId));
        console.log("data base check");
        const cursorI = await client.db("CRM").collection("Opportunity").find({ _id:{ $in:OpportunityId}})
        const resultsI = await cursorI.toArray();
        if (resultsI.length > 0) {
            console.log("inside opportunity find of object "+JSON.stringify(resultsI));
            return JSON.stringify(resultsI)
        }
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getInventoryOpportunityjn
}

