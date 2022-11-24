
const {MongoClient } = require('mongodb')
async function Leaddata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createLead(client, {
            salutation: request.salutation,
    firstName: request.firstName,
    lastName:request.lastName,
    company: request.company,
    phone: request.phone,
    leadSource: request.leadSource,
    industry: request.industry,
    leadStatus: request.leadStatus,
    email: request.email,
    fax:request.fax,
    description:request.description,
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Leaddata().catch(console.error);

async function createLead(client,newLead){
    const result = await client.db("CRM").collection("Lead").insertOne(newLead);
    console.log(`New Lead  created with the following id : ${result.insertedId}`);
}
module.exports = {Leaddata}