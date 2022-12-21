const { MongoClient } = require('mongodb');
async function getTask() {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error("get task catch block " +e);
        return e.message
    } finally {
        await client.close();
    }
}
getTask().catch(console.error);
async function getDatas(client) {

    let queryobj = ([
        {
            $lookup:
            {
                from: 'Account',
                let: { "searchId": { $toObjectId: "$AccountId" } },
                pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Accountdetails'
            }
        },
        {
            $lookup:
            {
                from: 'Lead',
                let: { "searchId": { $toObjectId: "$LeadId" } },
                pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Leaddetails'
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
    const cursor = await client.db("CRM").collection("Task").aggregate(queryobj)
    const results = await cursor.toArray();
    if (results.length > 0) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = {getTask}