
const { MongoClient } = require('mongodb')
async function Leaddata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    //    const url = process.env.MONGODB_URL;
    //    console.log("process data "+ process.env.MONGODB_URL);
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
       let data =  await createLead(client, {
            salutation: request.salutation,
            firstName: request.firstName,
            lastName: request.lastName,
            company: request.company,
            phone: request.phone,
            leadSource: request.leadSource,
            industry: request.industry,
            leadStatus: request.leadStatus,
            email: request.email,
            fax: request.fax,
            description: request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
        })
        return data

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Leaddata().catch(console.error);

async function createLead(client, newLead) {
    const result = await client.db("CRM").collection("Lead").insertOne(newLead);
    console.log(`New Lead  created with the following id : ${result.insertedId}`);
    return result.insertedId;
}
module.exports = { Leaddata }