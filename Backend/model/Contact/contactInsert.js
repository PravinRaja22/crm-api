
const {MongoClient } = require('mongodb')
async function Contactdata(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const body = request.body;
    //    const url = process.env.MONGODB_URL;
//    console.log("process data "+ process.env.MONGODB_URL);
   
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createContact(client, {
            accountName:body.accountName,
            salutation:body.salutation,
            firstName:body.firstName,
            lastName:body.lastName,
            dop:body.dop,
            phone:body.phone,
            department:body.department,
            file:request.protocol + '://' + request.get('host') + '/uploads/' + request.file.filename,
            date:body.date,
            leadSource:body.leadSource,
            email:body.email,
            mailingAddress:body.mailingAddress,
            description:body.description,
            createdbyId: body.createdbyId,
            createdDate: body.createdDate,
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
    console.log("create contact "+result);
    console.log(`New contact created with the following id : ${result.insertedId}`);
}
module.exports = {Contactdata}