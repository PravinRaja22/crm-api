const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function getOpportunityInventorylookup(oppid) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Inventory Id for Opportunity  "+oppid);
        await client.connect();
        let data = await getOpportunityDatas(client,oppid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {

        await client.close();
    }
}
//getOpportunityInventorylookup().catch(console.error);
async function getOpportunityDatas(client,oppid) {
    var InventoryId = []
    console.log("inside functionality inventory id "+oppid);
    const cursor = await client.db(process.env.DB).collection("Opportunity Inventory").find({OpportunityId :new RegExp('^' + oppid)})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        console.log("inside result of opp inventory");
        console.log('Opp Id '+JSON.stringify(results));
        results.forEach(function(variable){
            console.log(variable.InventoryId);
            InventoryId.push(new ObjectId(variable.InventoryId));
            console.log("inventory Id ",InventoryId);
        });
        console.log("outside block "+InventoryId);
        console.log("data base check");
        const cursorI = await client.db(process.env.DB).collection("Inventory Management").find({ _id:{ $in:InventoryId}})
        const resultsI = await cursorI.toArray();
        if (resultsI.length > 0) {
            console.log("inside Inventory find of object "+JSON.stringify(resultsI));
            return JSON.stringify(resultsI)
        }
       
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getOpportunityInventorylookup
}

