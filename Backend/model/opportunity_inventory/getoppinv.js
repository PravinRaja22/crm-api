const { MongoClient } = require('mongodb');
async function getOpportunityInventory() {
    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("inside get opp inventory");
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getOpportunityInventory().catch(console.error);
async function getDatas(client) {

    let queryobj = ([
        {
            $lookup:
            {
                from: 'Inventory Management',
                let: { "searchId": { $toObjectId: "$InventoryId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Inventorydetails'
            }
        },
        {
            $lookup:
            {
                from: 'Opportunity',
                let: { "searchId": { $toObjectId: "$OpportunityId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Opportunitydetails'
            }
        }
    ])
    const cursor = await client.db("CRM").collection("Opportunity Inventory").aggregate(queryobj)
    const results = await cursor.toArray();
    if (results.length > 0) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { getOpportunityInventory }

