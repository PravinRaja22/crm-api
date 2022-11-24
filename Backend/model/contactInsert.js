
const {MongoClient } = require('mongodb')
async function Contactdata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    
    //    const url = process.env.MONGODB_URL;
//    console.log("process data "+ process.env.MONGODB_URL);
   
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createContact(client, {
                        accountName:request.accountName,
                        salutation:request.salutation,
                        firstName:request.firstName,
                        lastName:request.lastName,
                        dop:request.dop,
                        phone:request.phone,
                        department:request.department,
                        leadSource:request.leadSource,
                        email:request.email,
                        mailingAddress:request.mailingAddress,
                        description:request.description,
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Contactdata().catch(console.error);

async function createContact(client,newContact){
    const result = await client.db("CRM").collection("Contact").insertOne(newContact);
    console.log(`New contact created with the following id : ${result.insertedId}`);
}
module.exports = {Contactdata}