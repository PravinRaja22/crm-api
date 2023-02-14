const { MongoClient } = require('mongodb');
async function getOpportunityLead(leadId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Lead Id for Opportunity  "+leadId);
        await client.connect();
        let data = await getOpportunityDatas(client,leadId)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getOpportunityLead().catch(console.error);
async function getOpportunityDatas(client,leadId) {
    console.log("inside functionality Lead id "+leadId);
    const cursor = await client.db("CRM").collection("Opportunity").find({LeadId :new RegExp('^' + leadId)})
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
    getOpportunityLead
}

