
const {MongoClient } = require('mongodb')
async function opportunitydata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createOpportunity(client, {
            accountName:request.accountName,
            opportunityName:request.opportunityName,
            type:request.type,
            leadSource:request.leadSource,
            amount:request.amount,
            closeDate:request.closeDate,
            stage:request.stage,
            description:request.description,
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
opportunitydata().catch(console.error);

async function createOpportunity(client,newOpportunity){
    const result = await client.db("CRM").collection("Opportunity").insertOne(newOpportunity);
    console.log(`New opportunity  created with the following id : ${result.insertedId}`);
}
module.exports = {opportunitydata}