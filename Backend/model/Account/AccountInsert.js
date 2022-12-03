const {MongoClient } = require('mongodb')
async function Accountdata(request) {
const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";

   
   const client = new MongoClient(url);
    try {
        console.log('Inside insert Account')
        //Connecting to DB
        await client.connect();
        let data = await createAccount(client, {
            accountName:request.accountName,
            accountNumber: request.accountNumber,
            annualRevenue:request.annualRevenue,
            rating: request.rating,
            type: request.type,
            phone: request.phone,
            industry:request.industry,
            billingAddress:request.billingAddress,
            billingCountry:request.billingCountry,
            billingCity:request.billingCity,
            billingCities:request.billingCities,
            shippingAddress:request.shippingAddress,
            description:request.description,
            createdbyId:request.createdbyId,
            createdDate:request.createdDate,
        })
        return data
    } catch (e) {
        console.error(e);
        return e 
    } finally {
        await client.close();
    }
}
Accountdata().catch(console.error);

async function createAccount(client,newAccount){
    const result = await client.db("CRM").collection("Account").insertOne(newAccount);
    console.log(`New Account created with the following id : ${result.insertedId}`);
    return result.insertedId
}
module.exports = {Accountdata}