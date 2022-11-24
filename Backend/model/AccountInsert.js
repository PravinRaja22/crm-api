const {MongoClient } = require('mongodb')
async function Accountdata(request) {
const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
//    const url = process.env.MONGODB_URL;
//    console.log("process data "+ process.env.MONGODB_URL);
   
   const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createAccount(client, {
            accountName:request.accountName,
            accountNumber: request.accountNumber,
            annualRevenue:request.annualRevenue,
            rating: request.rating,
            type: request.type,
            phone: request.phone,
            industry:request.industry,
            noofEmployees: request.noofEmployees,
            fax:request.fax,
            billingAddress:request.billingAddress,
            billingCountry:request.billingCountry,
            billingCity:request.billingCity,
            billingCities:request.billingCities,
            shippingAddress:request.shippingAddress,
            website:request.website,
            description:request.description,
            accountOwnerId:request.accountOwnerId,
            createdbyId:request.createdbyId,
            createdDate:request.createdDate,
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
Accountdata().catch(console.error);

async function createAccount(client,newAccount){
    const result = await client.db("CRM").collection("Account").insertOne(newAccount);
    console.log(`New Account created with the following id : ${result.insertedId}`);
}
module.exports = {Accountdata}