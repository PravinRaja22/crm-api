const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function getInventoryDealsjn(invid) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Inventory Id for Opportunity  "+invid);
        await client.connect();
        let data = await getDealsDatas(client,invid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {

        await client.close();
    }
}
//getInventoryOpportunityjn().catch(console.error);
async function getDealsDatas(client,invid) {
    var OpportunityId =[]
    console.log("inside functionality inventory id "+invid);
    const cursor = await client.db(process.env.DB).collection("Deal").find({InventoryId :new RegExp('^' + invid)})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        console.log("inside result of deal inventory");
        console.log('Opp Id '+JSON.stringify(results));
        results.forEach(function(variable){
            OpportunityId.push(new ObjectId(variable._id));
            console.log("deal Id ",OpportunityId);
        });
        const cursorI = await client.db(process.env.DB).collection("Deal").find({_id :{$in:OpportunityId}})
        const resultsI = await cursorI.toArray();
        console.log('result'+resultsI);
        if (resultsI.length > 0) {
            console.log("inside deal find of object "+JSON.stringify(resultsI));
            return JSON.stringify(resultsI)
        }
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getInventoryDealsjn
}

