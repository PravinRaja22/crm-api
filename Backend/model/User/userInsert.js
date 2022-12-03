const {MongoClient } = require('mongodb')
async function Userdata(request) {
const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";

   
   const client = new MongoClient(url);
    try {
        console.log('Inside insert User')
        //Connecting to DB
        await client.connect();
        await createUser(client, {
            firstName:request.firstName,
            lastName: request.lastName,
            username: request.username,
            phone: request.phone,
            company: request.company,
            email: request.email,
            role: request.role,
            access: request.access
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Userdata().catch(console.error);

async function createUser(client,newUser){
    const result = await client.db("CRM").collection("User").insertOne(newUser);
    console.log(`New User created with the following id : ${result.insertedId}`);
}
module.exports = {Userdata}