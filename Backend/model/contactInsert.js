
const {MongoClient } = require('mongodb')
async function Contactdata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createContact(client, {
                        accountName:'',
                        salutation:'',
                        firstName:'',
                        lastName:'',
                        dop:'',
                        phone:'',
                        department:'',
                        leadSource:'',
                        email:'',
                        mailingAddress:'',
                        description:'',
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