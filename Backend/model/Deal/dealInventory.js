const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function getDealInventorylookup(dealid) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Inventory Id for Deal  "+dealid);
        await client.connect();
        let data = await getOpportunityDatas(client,dealid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {

        await client.close();
    }
}
//getOpportunityInventorylookup().catch(console.error);
async function getDealDatas(client,dealid) {
    var InventoryId = []
    console.log("inside functionality inventory id "+dealid);
    const cursor = await client.db(process.env.DB).collection("Opportunity Inventory").find({OpportunityId :new RegExp('^' + dealid)})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        console.log("inside result of Deal inventory");
        console.log('Deal Id '+JSON.stringify(results));
        results.forEach(function(variable){
            console.log(variable.InventoryId);
            InventoryId.push(new ObjectId(variable.InventoryId));
            console.log("inventory Id ",InventoryId);
        });
        console.log("outside block "+InventoryId);
        console.log("data base check");
        const cursorI = await client.db(process.env.DB).collection("Inventory").find({ _id:{ $in:InventoryId}})
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
    getDealInventorylookup
}

