const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function getAccountscontact(accid) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Account Id for contact  " + accid);
        await client.connect();
        let data = await getOpportunityDatas(client, accid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {

        await client.close();
    }
}
getAccountscontact().catch(console.error);
async function getOpportunityDatas(client, accid) {
    console.log("inside functionality Account id " + accid);
    const cursor = await client.db("CRM").collection("Contact").find({ AccountId: new RegExp('^' + accid) })
    const results = await cursor.toArray();
    console.log(results);
    if (results.length > 0) {
        console.log("inside result of opp inventory");
        console.log('Contacts are ' + JSON.stringify(results));
        return JSON.stringify(results);

    }
}
module.exports = {
    getAccountscontact
}

