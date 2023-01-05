const { MongoClient } = require('mongodb');
async function getOpportunityInventorylookup(oppid) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
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
getOpportunityInventorylookup().catch(console.error);
async function getOpportunityDatas(client,oppid) {
    console.log("inside functionality inventory id "+oppid);
    const cursor = await client.db("CRM").collection("Opportunity Inventory").find({OpportunityId :new RegExp('^' + oppid)})
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log(results);
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getOpportunityInventorylookup
}

